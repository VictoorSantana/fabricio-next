const { HttpError } = require("../../config/domain");
const { DiscoRepo } = require("../../repo");
const { BucketService } = require("../../shared/services/bucket.service");
const { ValidateWebp, FileToBase64 } = require("../../shared/services/util.service");

class CreateDiscoUseCase {
    constructor() { }

    static async execute(input) {
        let thumbUploaded = {};
        let uploaded = {};

        if(input.arquivo) {
            if(!input.thumb) {
                throw new HttpError(400, 'Imagem precisa ter thumb');
            }
            
            ValidateWebp(input.arquivo);
            ValidateWebp(input.thumb);

            thumbUploaded = await BucketService.upload(FileToBase64(input.thumb));
            uploaded = await BucketService.upload(FileToBase64(input.arquivo));

            uploaded.contentType = 'image/webp';
            uploaded.extension = 'webp';
        }

        const discoDb = await DiscoRepo.create({
            nome: input.nome,
            discoId: input.discoId,
            tipo: input.tipo,

            url: uploaded.url,
            urlThumb: thumbUploaded.url,

            publicId: uploaded.publicId,
            publicIdThumb: thumbUploaded.publicId,

            contentType: uploaded.contentType,
            extension: uploaded.extension,
        });
        return discoDb;
    }
}

module.exports = CreateDiscoUseCase;

