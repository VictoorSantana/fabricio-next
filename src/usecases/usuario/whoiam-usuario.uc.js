const { UsuarioRepo } = require("../../repo");
const { HttpError } = require("../../config/domain");

class WhoIAmUsuarioUseCase {
    constructor() { }

    static async execute(input) {
        const usuarioDb = await UsuarioRepo.findOne({
            attributes: ['id', 'nome', 'login'],
            raw: true,
            where: {
                id: input.id
            }
        });

        if (!usuarioDb) {
            throw new HttpError(404, 'Usuário não encontrado!');
        }

        return {
            ...usuarioDb,
            senha: 'notchangeme'
        };
    }
}

module.exports = WhoIAmUsuarioUseCase;

