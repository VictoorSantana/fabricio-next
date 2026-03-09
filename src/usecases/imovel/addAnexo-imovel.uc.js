const { HttpError } = require("../../config/domain");
const { ImovelRepo, ImovelAnexoRepo, DiscoRepo } = require("../../repo");

class AddAnexoImovelUseCase {
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

        if (input.discoId && input.discoId.length) {
            for (const discoId of input.discoId) {
                await ImovelAnexoRepo.create({
                    imovelId: imovelDb.id,
                    discoId: discoId
                })
            }
        }

        return await ImovelAnexoRepo.findAll({
            where: {
                imovelId: input.id
            },
            attributes: ['id', 'imovelId', 'discoId'],
            include: [
                {
                    as: 'discos',
                    model: DiscoRepo,
                    attributes: ['id', 'urlThumb', 'nome']
                }
            ]
        });
    };
}

module.exports = AddAnexoImovelUseCase;

