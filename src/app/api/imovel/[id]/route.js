import { NextResponse } from 'next/server';
import { NeedAuth, Validate } from '@/shared/middlewares';
import { ImovelModoEnum, ImovelSituacaoEnum, ImovelTipoEnum } from '@/models/imovel.model';
import { FindOneImovelUseCase } from '@/usecases/imovel/findOne-imovel.uc';
import { UpdateImovelUseCase } from '@/usecases/imovel/update-imovel.uc';

import z from 'zod';

export async function GET(req, { params }) {
  const { errorAuth } = await NeedAuth(req);
  if (errorAuth) {
    return NextResponse.json({ error: errorAuth }, { status: 401 });
  }

  const { id } = await params;

  const res = await FindOneImovelUseCase.execute({ id });
  return NextResponse.json(res);
}

export async function PUT(req, { params }) {
  const { errorAuth } = await NeedAuth(req);
  if (errorAuth) {
    return NextResponse.json({ error: errorAuth }, { status: 401 });
  }

  const body = await req.json();
  const { id } = await params;
  const input = { ...body, id };

  const validationError = Validate(input, z.object({
    id: z.string(),
    titulo: z.string().optional(),
    localizacao: z.string().optional(),
    m2Contruidos: z.int32().optional(),
    m2Terreno: z.int32().optional(),
    valorAluguel: z.float32().optional(),
    valorVenda: z.float32().optional(),
    qtdDomitorios: z.int32().optional(),
    qtdBanheiros: z.int32().optional(),
    qtdGaragem: z.int32().optional(),
    caracteristicas: z.array(z.string()).optional(),
    detalhes: z.string().max(1200).optional(),
    destaque: z.boolean().optional(),
    tipo: z.enum(ImovelTipoEnum).optional(),
    modo: z.enum(ImovelModoEnum).optional(),
    situacao: z.enum(ImovelSituacaoEnum).optional()
  }))

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const res = await UpdateImovelUseCase.execute(input);
  return NextResponse.json(res);
}

