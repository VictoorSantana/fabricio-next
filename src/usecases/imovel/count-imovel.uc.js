const { Op } = require("sequelize");
const { AnaliticoRepo } = require("../../repo");
const { AnaliticoService } = require("../../shared/services/analitico.service");


const props = {
    VIEW_HOME: 'viewHome',
    VIEW_BUSCAR: 'viewBuscar',
    VIEW_DETALHES: 'viewDetalhes',
}

class CountImovelUseCase {
    constructor() { }

    static async execute(input) {
        const hojeDt = new Date()
        const ontemDt = new Date(hojeDt);
        ontemDt.setDate(hojeDt.getDate() - 1);

        const hoje = hojeDt.toISOString().slice(0, 10);
        const ontem = ontemDt.toISOString().slice(0, 10);

        const analiticoDb = await AnaliticoRepo.findAll({
            where: {
                tag: {
                    [Op.in]: Object.keys(props)
                },
                dataRef: {
                    [Op.in]: [
                        hoje,
                        ontem
                    ]
                }
            },
            raw: true
        });

        let data = {};

        for (const anal of analiticoDb) {
            const keyName = props[anal.tag];

            if (!data[keyName]) data[keyName] = { ontem: 0, hoje: 0 };

            if (anal.dataRef === hoje) {
                data[keyName].hoje = anal.valor;
            } else {
                data[keyName].ontem = anal.valor;
            }
        }

        return {
            online: AnaliticoService.countConnected(),
            ...data,
        };
    }
}

module.exports = CountImovelUseCase;

