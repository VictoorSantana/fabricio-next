import { HttpError } from "../../config/domain";
import { ImovelRepo } from "../../repo";
import { ImovelService } from "../../shared/services/imovel.service";

export class UpdateImovelUseCase {
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

        const caracteristicas = input.caracteristicas ? input.caracteristicas.join(';') : "";

        await ImovelRepo.update({
            titulo: input.titulo,
            localizacao: input.localizacao,
            m2Contruidos: input.m2Contruidos,
            m2Terreno: input.m2Terreno,
            valorAluguel: input.valorAluguel,
            valorVenda: input.valorVenda,
            qtdDomitorios: input.qtdDomitorios,
            qtdBanheiros: input.qtdBanheiros,
            qtdGaragem: input.qtdGaragem,
            caracteristicas: caracteristicas,
            detalhes: input.detalhes,
            destaque: input.destaque,
            tipo: input.tipo,
            modo: input.modo,
            situacao: input.situacao,
        }, {
            where: {
                id: input.id
            }
        });

        ImovelService.clearCache();

        return {};
    };
}

