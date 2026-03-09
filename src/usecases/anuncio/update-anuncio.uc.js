const { HttpError } = require("../../config/domain");
const { AnuncioRepo } = require("../../repo");

class UpdateAnuncioUseCase {
    constructor() { }

    static async execute(input) {
        const anuncioDb = await AnuncioRepo.findOne({
            attributes: ['id'],
            raw: true,
            where: {
                id: input.id
            }
        });

        if (!anuncioDb) {
            throw new HttpError(404, 'Anuncio não encontrado!');
        }        

        await AnuncioRepo.update({
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

module.exports = UpdateAnuncioUseCase;

