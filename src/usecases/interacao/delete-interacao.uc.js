const { HttpError } = require("../../config/domain");
const { InteracaoRepo } = require("../../repo");

class DeleteInteracaoUseCase {
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

        await InteracaoRepo.destroy({
            where: {
                id: input.id
            }
        });

        return {};
    };
}

module.exports = DeleteInteracaoUseCase;

