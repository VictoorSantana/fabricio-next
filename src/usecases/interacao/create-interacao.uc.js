import { HttpError } from "../../config/domain";
import { InteracaoRepo } from "../../repo";
import { RecaptchaService } from "../../shared/services/recaptcha.service";

export class CreateInteracaoUseCase {
    constructor() { }

    static async execute(input) {
        if(input.tipo === 'contato') {
            if(!input['recaptcha']) {
                throw new HttpError(400, 'Recaptcha não submetido');
            }

            const flag = await RecaptchaService.test(input['recaptcha']);

            if(!flag.success) {
                throw new HttpError(400, 'Recaptcha inválido');
            }

            input.hostname = flag.hostname;

            if(
                !input?.nome?.length ||
                !input?.email?.length ||
                !input?.mensagem?.length ||
                !input?.tipo?.length
            ) {
                throw new HttpError(400, 'Preencha todos os campos');
            }    
        }

        await InteracaoRepo.create({
            nome: input.nome,
            email: input.email,
            mensagem: input.mensagem,
            tipo: input.tipo,
            telefone: input.telefone,
            hostname: input.hostname,
            visto: false,
        });

        return true;
    }
}

