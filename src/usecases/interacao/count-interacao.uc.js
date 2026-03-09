import { AnuncioRepo, InteracaoRepo } from "../../repo";

export class CountInteracaoUseCase {
    constructor() { }

    static async execute() {
        const naoVistoInteracoes = await InteracaoRepo.count({ where: { visto: false } });
        const naoVistoAnuncios = await AnuncioRepo.count({ where: { visto: false } });

        return {
            count: naoVistoInteracoes + naoVistoAnuncios
        };
    }
}

