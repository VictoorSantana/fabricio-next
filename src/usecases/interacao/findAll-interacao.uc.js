import { AnuncioRepo, InteracaoRepo } from "../../repo";

export class FindAllInteracaoUseCase {
    constructor() { }

    static async execute() {
        const interacaoDb = await InteracaoRepo.findAll({
            attributes: [
                'id',
                'email',
                'mensagem',
                'tipo',
                'visto',
                'createdAt'
            ],
            raw: true,
            limit: 20,
            order: [['id', 'DESC'], ['visto', 'DESC']]
        });

        const anuncioDb = await AnuncioRepo.findAll({
            attributes: [
                'id',
                'email',
                [AnuncioRepo.sequelize.fn('CONCAT', AnuncioRepo.sequelize.col('cidade'), ' ', AnuncioRepo.sequelize.col('estado')), 'mensagem'],
                'tipo',
                'visto',
                'createdAt'
            ],
            raw: true,
            limit: 20,
            order: [['id', 'DESC'], ['visto', 'DESC']]
        });

        return [...interacaoDb, ...anuncioDb];
    }
}
