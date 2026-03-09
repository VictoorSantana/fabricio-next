
import z from 'zod';
import { Validate } from '@/shared/middlewares';
import { NextResponse } from 'next/server';
import { LoginUsuarioUseCase } from '@/usecases/auth/login-usuario.uc';


export async function POST(req) {
  const body = await req.json();

  const errorValidation = Validate(body, z.object({
    sub: z.string("É obrigatório").min(10),
    login: z.string().optional(),
    senha: z.string().optional(),
  }));

  if (errorValidation) {
    return NextResponse.json(errorValidation, { status: 400 });
  }

  try {
    const result = await LoginUsuarioUseCase.execute(body);
    return NextResponse.json(result);
  } catch (ex) {
    return NextResponse.json(ex.message, { status: ex.status || 500 });
  }
} 