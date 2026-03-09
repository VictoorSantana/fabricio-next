
import z from 'zod';
import { Validate } from '@/shared/middlewares';
import { ImovelService } from '@/shared/services/imovel.service';
import { NextResponse } from 'next/server';
import { ImovelModoEnum } from '@/models/imovel.model';
import { EncryptionService } from '@/shared/services/encryption.service';


export async function POST(request) {
  const body = await request.json();
  const decrypted = EncryptionService.decrypt(body.sub, process.env.NEXT_PUBLIC_CLIENT_SECRET);

  if(!decrypted) {
    return NextResponse.json("Token inválido", { status: 400 });
  }

  const parsed = JSON.parse(decrypted);
  const errorValidation = Validate(parsed, z.object({
    modo: z.enum(ImovelModoEnum),
    ordem: z.enum(["maior", "menor"]),

    entre: z.array(z.string()), //tipos

    valorMax: z.float32().optional(),

    qtdDomitorios: z.int32().optional(),
    qtdBanheiros: z.int32().optional(),
    qtdGaragem: z.int32().optional(),

    useCache: z.boolean().optional(),
  }));

  if (errorValidation) {
    return NextResponse.json(errorValidation, { status: 400 });
  }

  const res = await ImovelService.getTodos(parsed, 15, parsed.useCache || false);
  return NextResponse.json({
    sub: EncryptionService.encrypt(JSON.stringify(res), process.env.NEXT_PUBLIC_CLIENT_SECRET)
  });
} 