
import z from 'zod';
import { NeedAuth, Validate } from '@/shared/middlewares';
import { NextResponse } from 'next/server';
import FindOneInteracaoUseCase from '@/usecases/interacao/findOne-interacao.uc';
import FindOneAnuncioUseCase from '@/usecases/anuncio/findOne-anuncio.uc';



export async function GET(req, { params }) {
  const { errorAuth } = await NeedAuth(req);
  if (errorAuth) {
    return NextResponse.json({ error: errorAuth }, { status: 401 });
  }


  
  const { id } = await params;
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams.entries())
  const input = { ...query, id };

  console.log(searchParams, id);

  const validationError = Validate(input, z.object({
    id: z.string(),
    tipo: z.enum(['interacao', 'anuncio']),
  }))

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    if (input.tipo === 'interacao') {
      const res = await FindOneInteracaoUseCase.execute({ id });
      return NextResponse.json(res);
    }

    const res = await FindOneAnuncioUseCase.execute({ id });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}