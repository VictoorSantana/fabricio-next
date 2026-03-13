import { HttpError } from "../../config/domain";
import { DiscoRepo } from "../../repo";
import { BucketService } from "../../shared/services/bucket.service";
import { ValidateWebp, FileToBase64 } from "../../shared/services/util.service";


export class CreateDiscoUseCase {
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

            thumbUploaded = await BucketService.upload(input.thumb);
            uploaded = await BucketService.upload(input.arquivo);

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
