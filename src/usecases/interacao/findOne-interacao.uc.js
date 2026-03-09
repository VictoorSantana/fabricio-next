const { HttpError } = require("../../config/domain");
const { InteracaoRepo } = require("../../repo");

class FindOneInteracaoUseCase {
    constructor() { }

    static async execute(input) {
        const interacaoDb = await InteracaoRepo.findOne({
            attributes: [
                'id',
                'email',
                'nome',
                'telefone',
                'createdAt',
                'mensagem',
                'tipo'
            ],
            where: {
                id: input.id
            },
            raw: true
        });

        if (!interacaoDb) {
            throw new HttpError(404, 'Interacao não encontrado!');
        }

        if (!interacaoDb.visto) {
            await InteracaoRepo.update({
                visto: true,                
            }, {
                where: {
                    id: input.id
                }
            });
        }


        return interacaoDb;
    };
}

module.exports = FindOneInteracaoUseCase;

