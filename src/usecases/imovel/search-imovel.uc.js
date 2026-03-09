import { Op } from "sequelize";
import { DiscoRepo, ImovelAnexoRepo, ImovelRepo } from "../../repo";
import { Pagination } from "../../shared/services/page.service";

export class SearchImovelUseCase {
    constructor() { }

    static async execute(input) {
        const { offset, limit } = Pagination(input.page, input.limit);


        let where = {};

        if(input.search) {
            where = {
                [Op.or]: [
                    {
                        titulo: {
                            [Op.like]: `%${input.search}%`
                        }
                    },
                    {
                        localizacao: {
                            [Op.like]: `%${input.search}%`
                        }
                    }
                ]
            };
        }

        const imovelDb = await ImovelRepo.findAndCountAll({
            attributes: [
                'id',
                'titulo',
                'localizacao',
                'situacao',
                'detalhes',
                'visualizacoes'
            ],
            include: [
                {
                    as: 'imovelAnexos',
                    model: ImovelAnexoRepo,
                    attributes: ['imovelId', 'discoId'],
                    include: [
                        {
                            as: 'discos',
                            model: DiscoRepo,
                            attributes: ['urlThumb']
                        }
                    ]
                }
            ],
            where,
            order: [['id', 'ASC']],
            offset,
            limit,
        });

        return imovelDb;
    }
}

