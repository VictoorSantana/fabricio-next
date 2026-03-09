import { ImovelService } from '@/shared/services/imovel.service';
import { NextResponse } from 'next/server';
import { EncryptionService } from '@/shared/services/encryption.service';

export async function GET() {
  const res = await ImovelService.getDestaques();
  return NextResponse.json({
    sub: EncryptionService.encrypt(JSON.stringify(res), process.env.NEXT_PUBLIC_CLIENT_SECRET)
  });
} 