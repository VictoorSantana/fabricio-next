import jwt from 'jsonwebtoken';
import { HttpError } from "@/config/domain";
import { UsuarioRepo } from "@/repo";


export class LoginFacebookUseCase {

    constructor() { }

    static async execute(input) {
        const response = await fetch('https://graph.facebook.com/v19.0/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: process.env.FACEBOOK_APPID,
                client_secret: process.env.FACEBOOK_SECRET,
                redirect_uri: `http://${process.env.HOSTNAME}/admin/login/facebook`,
                code: input.code
            })
        })

        const data = await response.json();
        const responseUser = await fetch('https://graph.facebook.com/v19.0/me?fields=id,name,email', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.access_token}`
            }
        })

        const userData = await responseUser.json();
        const usuarioDb = await UsuarioRepo.findOne({
            raw: true,
            attributes: ['id', 'nome', 'login'],
            where: {
                situacao: 'ativo',
                email: userData.email
            }
        })

        if (!usuarioDb) {
            console.log("-> TENTATIVA DE LOGIN (FALHA 404) ->", { email: userData.email });
            throw new HttpError(400, 'Usuário não encontrado, tente novamente.');
        }

        await UsuarioRepo.update({
            facebookToken: data.access_token
        }, {
            where: {
                id: usuarioDb.id
            }
        });

        const token = jwt.sign(usuarioDb, process.env.SERVER_KEY, { expiresIn: process.env.SERVER_EXPIRES });

        return {
            token,
            usuario: usuarioDb
        }
    }
}