import { NextResponse } from 'next/server';
import { NeedAuth, Validate } from '@/shared/middlewares';

import z from 'zod';
import {CreateDiscoUseCase} from '@/usecases/disco/create-disco.uc';

export async function POST(req) {
  const { errorAuth } = await NeedAuth(req);
  if (errorAuth) {
    return NextResponse.json({ error: errorAuth }, { status: 401 });
  }
  
  const formData = await req.formData();

  const body = {
    nome: formData.get('nome'),
    discoId: formData.get('discoId'),
    tipo: formData.get('tipo'),
    arquivo: formData.get('arquivo'),
    thumb: formData.get('thumb')
  }
  
  const validationError = Validate(body, z.object({
    nome: z.string({ message: "É string obrigatório" }),

    arquivo: z.object().nullable(),
    thumb: z.object().nullable(),

    discoId: z.string({ message: "É string obrigatório" }),
    tipo: z.enum(['pasta', 'imagem', 'video'])
  }))

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const res = await CreateDiscoUseCase.execute(body);
  return NextResponse.json(res);
} 