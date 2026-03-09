// const fs = require('fs');

export function RandomBetween(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function GenHash(length = 10) {
    const chars = 'qwertyuioop1234567890asdfghjklzxcnbvm';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars[RandomBetween(0, chars.length - 1)]
    }

    return result;
}

export function CreateSlug(...params) {
  return params
    .filter(Boolean) // remove null, undefined, vazio
    .join(' ')
    .toString()
    .normalize('NFD') // remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove caracteres especiais
    .replace(/\s+/g, '-')        // espaços viram hífen
    .replace(/-+/g, '-');        // evita hífen duplo
}

export function ValidateWebp(file) {
  if (!file) {
    throw new Error('Arquivo não enviado');
  }

  // 1️⃣ Tamanho (1MB)
  const MAX_SIZE = 1 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Imagem maior que 1MB');
  }

  // 2️⃣ MIME type
  if (file.type !== 'image/webp') {
    throw new Error('Formato inválido. Apenas WEBP permitido');
  }

  return true;
}

// export function FileToBase64(file) {
//   const buffer = fs.readFileSync(file.path);
//   return `data:${file.type};base64,${buffer.toString('base64')}`;
// }

export function Parsed(dataValues) {
  return JSON.parse(JSON.stringify(dataValues));
}

// module.exports = {
//     RandomBetween,
//     GenHash,
//     CreateSlug,
//     ValidateWebp,
//     FileToBase64,
//     Parsed
// }