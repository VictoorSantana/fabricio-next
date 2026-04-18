
import z from 'zod';
import { Validate } from '@/shared/middlewares';
import { NextResponse } from 'next/server';
import { UsuarioRepo } from '@/repo';
import { LoginFacebookUseCase } from '@/usecases/auth/login-facebook.uc';


export async function POST(req) {
  const body = await req.json();

  const errorValidation = Validate(body, z.object({
    code: z.string()
  }));

  if (errorValidation) {
    return NextResponse.json(errorValidation, { status: 400 });
  }

  try {
    const result = await LoginFacebookUseCase.execute(body);
    return NextResponse.json(result);
  } catch (ex) {
    return NextResponse.json(ex.message, { status: ex.status || 500 });
  }
} 
