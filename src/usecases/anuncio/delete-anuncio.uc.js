const { HttpError } = require("../../config/domain");
const { AnuncioRepo } = require("../../repo");

class DeleteAnuncioUseCase {
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

        await AnuncioRepo.destroy({
            where: {
                id: input.id
            }
        });

        return {};
    };
}

module.exports = DeleteAnuncioUseCase;

