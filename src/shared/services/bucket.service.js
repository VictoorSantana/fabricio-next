const { cloudinary } = require("../../config/bucket");
const { HttpError } = require("../../config/domain");
const { GenHash } = require("./util.service");



const cloudinaryAsync = (buffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: "uploads" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            })
            .end(buffer);
    });
}
class BucketService {
    constructor() { }

    static async upload(file) {
        try {
            const publicId = GenHash();
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const result = await cloudinaryAsync(buffer);
            
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