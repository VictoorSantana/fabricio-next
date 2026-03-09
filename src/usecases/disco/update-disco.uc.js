const { HttpError } = require("../../config/domain");
const { DiscoRepo, DiscoAnexoRepo } = require("../../repo");

class UpdateDiscoUseCase {
    constructor() { }

    static async execute(input) {
        const discoDb = await DiscoRepo.findOne({
            attributes: ['id'],
            raw: true,
            where: {
                id: input.id
            }
        });

        if (!discoDb) {
            throw new HttpError(404, 'Disco não encontrado!');
        }

        if (input.discoId) {
            const discoTargetDb = await DiscoRepo.findOne({
                attributes: ['id'],
                raw: true,
                where: {
                    id: input.discoId
                }
            });

            if (!discoTargetDb) {
                throw new HttpError(404, 'Pasta destino está indisponível!');
            }
        }

        await DiscoRepo.update({
            nome: input.nome,
            discoId: input.discoId,
        }, {
            where: {
                id: input.id
            }
        });

        return {};
    };
}

module.exports = UpdateDiscoUseCase;

