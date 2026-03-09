const { HttpError } = require("../../config/domain");
const { AnuncioRepo } = require("../../repo");

class FindOneAnuncioUseCase {
    constructor() { }

    static async execute(input) {
        const anuncioDb = await AnuncioRepo.findOne({
            attributes: [
                'nome',
                'email',
                'telefone',
                'cep',
                'bairro',
                'cidade',
                'estado',
                'logradouro',
                'numero',
                'complemento',
                'modo'
            ],
            where: {
                id: input.id
            },
            raw: true
        });

        if (!anuncioDb) {
            throw new HttpError(404, 'Anuncio não encontrado!');
        }

        if (!anuncioDb.visto) {
            await AnuncioRepo.update({
                visto: true,                
            }, {
                where: {
                    id: input.id
                }
            });
        }
        
        return anuncioDb;
    };
}

module.exports = FindOneAnuncioUseCase;

