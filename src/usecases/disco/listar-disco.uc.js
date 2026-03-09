const { DiscoRepo } = require("../../repo");

class ListarDiscoUseCase {
    constructor() { }

    static async execute(input) {

        const imovelDb = await DiscoRepo.findAll({
            attributes: [
                'id',
                'discoId',
                'nome',
                'urlThumb',
                'extension',
                'tipo',
            ],
            where: {
                discoId: input.discoId
            }            
        });

        return imovelDb;
    }
}

module.exports = ListarDiscoUseCase;

