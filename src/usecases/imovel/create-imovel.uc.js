const { ImovelRepo, ImovelAnexoRepo } = require("../../repo");
const { ImovelService } = require("../../shared/services/imovel.service");
const { CreateSlug } = require("../../shared/services/util.service");

class CreateImovelUseCase {
    constructor() { }

    static async execute(input) {
        const caracteristicas = input.caracteristicas ? input.caracteristicas.join(';') : "";

        const imovelDb = await ImovelRepo.create({
            ...input,
            valorAluguel: input.valorAluguel || 0,
            valorVenda: input.valorVenda || 0,
            caracteristicas,
            slug: CreateSlug(input.titulo, input.localizacao, input.tipo, input.modo)
        });

        if (input.anexosId && input.anexosId.length) {
            for (const anexoId of input.anexosId) {
                await ImovelAnexoRepo.create({
                    imovelId: imovelDb.id,
                    discoId: anexoId
                })
            }
        }

        ImovelService.clearCache();

        return imovelDb;
    }
}

module.exports = CreateImovelUseCase;

