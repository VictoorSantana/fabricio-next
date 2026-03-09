import jwt from 'jsonwebtoken';
import { UsuarioRepo } from "../../repo";
import { HttpError } from "../../config/domain";
import { EncryptionService } from "../../shared/services/encryption.service";

export class LoginUsuarioUseCase {
    constructor() { }

    static async execute(input) {
        let login = '';
        let senha = '';

        if (input.login && input.senha && process.env.SERVER_AMBIENT === 'development') {

            login = input.login;
            senha = input.senha;

        } else {
            const subCrypt = EncryptionService.decrypt(input.sub, process.env.NEXT_PUBLIC_ADMIN_SECRET);

            if (!subCrypt) {
                console.log("-> TENTATIVA DE LOGIN (FALHA SUB) ->", input.sub);
                throw new HttpError(400, 'Falha ao conectar usuário a plataforma!');
            }

            const parsed = JSON.parse(subCrypt);

            if(!parsed.login || !parsed.senha) {
                console.log("-> TENTATIVA DE LOGIN (FALHA PARSED) ->", parsed);
                throw new HttpError(400, 'Esquema de login/senha inválido');
            }
            login = parsed.login;
            senha = parsed.senha;
        }

        const usuarioDb = await UsuarioRepo.findOne({
            raw: true,
            attributes: ['id', 'nome', 'login'],
            where: {
                login,
                senha,
                situacao: 'ativo'
            }
        });

        if (!usuarioDb) {
            console.log("-> TENTATIVA DE LOGIN (FALHA 404) ->", { login, senha });
            throw new HttpError(400, 'Usuário não encontrado, tente novamente.');
        }

        const token = jwt.sign(usuarioDb, process.env.SERVER_KEY, { expiresIn: process.env.SERVER_EXPIRES });

        return {
            token,
            usuario: usuarioDb
        }
    }
}

module.exports = LoginUsuarioUseCase;

