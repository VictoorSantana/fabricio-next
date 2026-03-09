const { HttpError } = require("../../config/domain");
const { DiscoRepo } = require("../../repo");

class FindOneDiscoUseCase {
    constructor() { }

    static async execute(input) {
        const imovelDb = await DiscoRepo.findOne({
            where: {
                id: input.id
            },
            raw: true
        });

        if (!imovelDb) {
            throw new HttpError(404, 'Disco não encontrado!');
        }
        
        return imovelDb;
    };
}

module.exports = FindOneDiscoUseCase;

