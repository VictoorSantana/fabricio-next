const { AnuncioRepo } = require("../../repo");
const { Pagination } = require("../../shared/services/page.service");

class SearchAnuncioUseCase {
    constructor() { }

    static async execute(input) {
        const { offset, limit } = Pagination(input.page, input.limit);

        const imovelDb = await AnuncioRepo.findAndCountAll({
            attributes: [
                'id',
                'email',
                'nome',
                'bairro',
                'modo',
                'visto'
            ],
            order: [['visto', 'ASC']],
            offset,
            limit
        });

        return imovelDb;
    }
}

module.exports = SearchAnuncioUseCase;

