
import z from 'zod';
import { Validate } from '@/shared/middlewares';
import { NextResponse } from 'next/server';
import { EncryptionService } from '@/shared/services/encryption.service';
import { ImovelModoEnum, ImovelTipoEnum } from '@/models/imovel.model';
import CreateAnuncioUseCase from '@/usecases/anuncio/create-anuncio.uc';


export async function POST(req) {
  const body = await req.json();
  const decrypted = EncryptionService.decrypt(body.sub, process.env.NEXT_PUBLIC_CLIENT_SECRET);

  if (!decrypted) {
    return NextResponse.json("Token inválido", { status: 400 });
  }

  const parsed = JSON.parse(decrypted);
  const errorValidation = Validate(parsed, z.object({
    nome: z.string().max(80),
    email: z.string().max(50),
    telefone: z.string().max(16),

    cep: z.string().max(9),
    bairro: z.string().max(100),
    cidade: z.string().max(100),
    estado: z.string().max(50),
    logradouro: z.string().max(100),
    numero: z.string().max(3),
    complemento: z.string().max(100).optional(),

    tipo: z.enum(ImovelTipoEnum),
    modo: z.enum(ImovelModoEnum),

    recaptcha: z.string()
  }));

  if (errorValidation) {
    return NextResponse.json(errorValidation, { status: 400 });
  }

  try {
    const result = await CreateAnuncioUseCase.execute(parsed);
    return NextResponse.json(result);
  } catch (ex) {
    return NextResponse.json(ex.message, { status: ex.status || 500 });
  }
} 