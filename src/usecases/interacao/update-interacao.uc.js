const { HttpError } = require("../../config/domain");
const { InteracaoRepo } = require("../../repo");

class UpdateInteracaoUseCase {
    constructor() { }

    static async execute(input) {
        const interacaoDb = await InteracaoRepo.findOne({
            attributes: ['id'],
            raw: true,
            where: {
                id: input.id
            }
        });

        if (!interacaoDb) {
            throw new HttpError(404, 'Interacao não encontrado!');
        }

        await InteracaoRepo.update({
            nome: input.nome,
            email: input.email,
            mensagem: input.mensagem,
            tipo: input.tipo,
        }, {
            where: {
                id: input.id
            }
        });

        return {};
    };
}

module.exports = UpdateInteracaoUseCase;

