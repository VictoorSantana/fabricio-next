const { DiscoRepo } = require("../../repo");
const { Pagination } = require("../../shared/services/page.service");
class SearchDiscoUseCase {
    constructor() { }

    static async execute(input) {
        const { offset, limit } = Pagination(input.page, input.limit);

        const imovelDb = await DiscoRepo.findAndCountAll({
            attributes: [
                'nome',
                'urlThumb',
                'extension',
                'tipo',
            ],
            offset,
            limit,
        });

        return imovelDb;
    }
}

module.exports = SearchDiscoUseCase;

