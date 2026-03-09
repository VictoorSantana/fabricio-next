const { HttpError } = require("../../config/domain");
const { ImovelRepo, ImovelAnexoRepo, DiscoRepo } = require("../../repo");

class FindOneImovelUseCase {
    constructor() { }

    static async execute(input) {
        const imovelDb = await ImovelRepo.findOne({
            where: {
                id: input.id
            },
            include: [
                {
                    as: 'imovelAnexos',
                    model: ImovelAnexoRepo,
                    attributes: ['id', 'imovelId', 'discoId', 'ordem'],
                    include: [
                        {
                            as: 'discos',
                            model: DiscoRepo,
                            attributes: ['id', 'urlThumb', 'nome']
                        }
                    ]
                }
            ]
        });

        if (!imovelDb) {
            throw new HttpError(404, 'Imovel não encontrado!');
        }

        return imovelDb;
    };
}

module.exports = FindOneImovelUseCase;

