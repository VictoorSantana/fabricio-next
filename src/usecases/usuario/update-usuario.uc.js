const { UsuarioRepo } = require("../../repo");
const { HttpError } = require("../../config/domain");

class UpdateUsuarioUseCase {
    constructor() { }

    static async execute(input) {
        const usuarioDb = await UsuarioRepo.findOne({
            attributes: ['id'],
            raw: true,
            where: {
                id: input.id
            }
        });

        if (!usuarioDb) {
            throw new HttpError(404, 'Usuário não encontrado!');
        }

        await UsuarioRepo.update({
            nome: input.nome,
            senha: input.senha === 'notchangeme' ? undefined : input.senha
        }, {
            where: {
                id: input.id
            }
        });

        return {};
    }
}

module.exports = UpdateUsuarioUseCase;

