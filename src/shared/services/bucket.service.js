const { cloudinary } = require("../../config/bucket");
const { HttpError } = require("../../config/domain");
const { GenHash } = require("./util.service");

class BucketService {
    constructor() { }

    static async upload(base64) {
        try {
            const publicId = GenHash();
            const result = await cloudinary.uploader.upload(base64, { public_id: publicId });
            return {
                publicId,
                url: result.secure_url
            };
        } catch (error) {
            console.log(error.message);
            throw new HttpError(400, 'Falha ao subir a imagem!');
        }
    }

    static async remove(publicId) {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    }
}

module.exports = {
    BucketService
}