const { HttpError } = require("../../config/domain");
const { AnuncioRepo } = require("../../repo");
const { RecaptchaService } = require("../../shared/services/recaptcha.service");

class CreateAnuncioUseCase {
    constructor() { }

    static async execute(input) {
        const flag = await RecaptchaService.test(input['recaptcha']);

        if (!flag.success) {
            throw new HttpError(400, 'Recaptcha inválido');
        }

        await AnuncioRepo.create({
            nome: input.nome,
            email: input.email,
            telefone: input.telefone,
            cep: input.cep,
            bairro: input.bairro,
            cidade: input.cidade,
            estado: input.estado,
            logradouro: input.logradouro,
            numero: input.numero,
            complemento: input.complemento,
            visto: false,
            tipo: input.tipo,
            modo: input.modo,
        });

        return true;
    }
}

module.exports = CreateAnuncioUseCase;

