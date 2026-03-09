const { HttpError } = require("../../config/domain");
const { ImovelRepo, ImovelAnexoRepo } = require("../../repo");

class DeleteImovelUseCase {
    constructor() { }

    static async execute(input) {
        const imovelDb = await ImovelRepo.findOne({
            attributes: ['id'],
            raw: true,
            where: {
                id: input.id
            }
        });

        if (!imovelDb) {
            throw new HttpError(404, 'Imovel não encontrado!');
        }

        await ImovelRepo.destroy({
            where: {
                id: input.id
            }
        });

        await ImovelAnexoRepo.destroy({
            where: {
                imovelId: input.id
            }
        });

        return {};
    };
}

module.exports = DeleteImovelUseCase;

