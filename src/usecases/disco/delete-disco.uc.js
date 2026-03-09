const { HttpError } = require("../../config/domain");
const { DiscoRepo } = require("../../repo");
const { BucketService } = require("../../shared/services/bucket.service");

class DeleteDiscoUseCase {
    constructor() { }

    static async execute(input) {
        const discoDb = await DiscoRepo.findOne({
            attributes: ['id', 'publicId', 'tipo', 'publicIdThumb'],
            raw: true,
            where: {
                id: input.id
            }
        });

        if (!discoDb) {
            throw new HttpError(404, 'Disco não encontrado!');
        }

        if (discoDb.tipo === 'imagem') {
            await BucketService.remove(discoDb.publicId);
            await BucketService.remove(discoDb.publicIdThumb);
        } else {
            const childs = await DiscoRepo.findAll({
                attributes: ['id'],
                raw: true,
                where: {
                    discoId: input.id
                }
            });

            if (childs.length) {
                throw new HttpError(400, `Não é possivel excluir quando tem conteúdo na pasta. Contém ${childs.length} arquivos.`);
            }
        }

        await DiscoRepo.destroy({
            where: {
                id: input.id
            }
        });

        return {};
    };
}

module.exports = DeleteDiscoUseCase;

