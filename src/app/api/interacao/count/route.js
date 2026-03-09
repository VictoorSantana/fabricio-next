import { NextResponse } from 'next/server';
import { NeedAuth } from '@/shared/middlewares';
import { CountInteracaoUseCase } from '@/usecases/interacao/count-interacao.uc';


export async function GET(req) {
  const { errorAuth } = await NeedAuth(req);
  if (errorAuth) {
    return NextResponse.json({ error: errorAuth }, { status: 401 });
  }

  const res = await CountInteracaoUseCase.execute();
  return NextResponse.json(res);
}