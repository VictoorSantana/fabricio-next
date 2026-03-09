
import z from 'zod';
import { NeedAuth, Validate } from '@/shared/middlewares';
import { NextResponse } from 'next/server';
import { EncryptionService } from '@/shared/services/encryption.service';
import { CreateInteracaoUseCase } from '@/usecases/interacao/create-interacao.uc';
import { FindAllInteracaoUseCase } from '@/usecases/interacao/findAll-interacao.uc';


export async function POST(req) {
  const body = await req.json();
  const decrypted = EncryptionService.decrypt(body.sub, process.env.NEXT_PUBLIC_CLIENT_SECRET);

  if (!decrypted) {
    return NextResponse.json("Token inválido", { status: 400 });
  }

  const parsed = JSON.parse(decrypted);
  const errorValidation = Validate(parsed, z.object({
    tipo: z.enum(['contato', 'newsletter']),
    email: z.string().max(100),

    nome: z.string().max(100).optional(),
    mensagem: z.string().max(250).optional(),

    telefone: z.string().max(16).optional(),

    'recaptcha': z.string().optional()
  }));

  if (errorValidation) {
    return NextResponse.json(errorValidation, { status: 400 });
  }

  try {
    const result = await CreateInteracaoUseCase.execute(parsed);
    return NextResponse.json(result);
  } catch (ex) {
    return NextResponse.json(ex.message, { status: ex.status || 500 });
  }
} 

export async function GET(req) {
  const { errorAuth } = await NeedAuth(req);
  if (errorAuth) {
    return NextResponse.json({ error: errorAuth }, { status: 401 });
  }

  const res = await FindAllInteracaoUseCase.execute();
  return NextResponse.json(res);
}