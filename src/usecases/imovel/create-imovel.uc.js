import { ImovelRepo, ImovelAnexoRepo } from "../../repo";
import { ImovelService } from "../../shared/services/imovel.service";
import { CreateSlug } from "../../shared/services/util.service";

export class CreateImovelUseCase {
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

