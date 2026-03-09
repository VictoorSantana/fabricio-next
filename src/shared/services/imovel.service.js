import { Op, Sequelize } from "sequelize";
import { ImovelRepo, ImovelAnexoRepo, DiscoRepo } from "../../repo";
import { Parsed } from "./util.service";
import { DeParaTipo, DeParaModo } from "../../models/imovel.model";

const cache = {
    destaques: null,
    oportunidade: null,
    todos: null
}

export class ImovelService {
    constructor() { }

    static async clearCache() {
        cache.destaques = null;
        cache.oportunidade = null;
    }

    static async getDestaques(limit = 3) {

        if (cache && cache.destaques) {
            console.log("---> cache DESTAQUES");
            return Promise.resolve(cache.destaques);
        }

        const imovelDb = await ImovelRepo
            .findAll({
                where: {
                    situacao: 'online',
                    destaque: true
                },
                attributes: [
                    'id',
                    'titulo',
                    'tipo',
                    'modo',
                    'localizacao',
                    'qtdBanheiros',
                    'qtdGaragem',
                    'qtdDomitorios',
                    'm2Contruidos',
                    'valorAluguel',
                    'valorVenda',
                    'slug',
                    'modo'
                ],
                limit,
                include: [
                    {
                        as: 'imovelAnexos',
                        model: ImovelAnexoRepo,
                        attributes: ['imovelId', 'discoId'],
                        include: [
                            {
                                as: 'discos',
                                model: DiscoRepo,
                                attributes: ['urlThumb']
                            }
                        ]
                    }
                ]
            });

        const parsed = Parsed(imovelDb);
        const result = parsed.map((a) => ({
            id: a.id,
            titulo: a.titulo,
            tipo: DeParaTipo[a.tipo],
            localizacao: a.localizacao,
            qtdBanheiros: a.qtdBanheiros,
            qtdGaragem: a.qtdGaragem,
            qtdDomitorios: a.qtdDomitorios,
            m2Contruidos: a.m2Contruidos,
            valorAluguel: a.valorAluguel,
            valorVenda: a.valorVenda,
            modo: a.modo,
            link: `/detalhes/${a.slug}/${a.id}`,
            imgSrc: a.imovelAnexos.map((b) => b.discos.urlThumb)
        }));
        cache.destaques = result;
        return result;
    }

    static async getOportunidade() {

        if (cache && cache.oportunidade) {
            console.log("---> cache OPORTUNIDADE");
            return Promise.resolve(cache.oportunidade);
        }

        const imovelDb = await ImovelRepo
            .findOne({
                where: {
                    destaque: {
                        [Op.ne]: true
                    },
                    situacao: 'online'
                },
                attributes: [
                    'id',
                    'titulo',
                    'tipo',
                    'localizacao',
                    'qtdBanheiros',
                    'qtdGaragem',
                    'qtdDomitorios',
                    'm2Contruidos',
                    'valorAluguel',
                    'valorVenda',
                    'detalhes',
                    'slug',
                    'modo'
                ],
                include: [
                    {
                        as: 'imovelAnexos',
                        model: ImovelAnexoRepo,
                        attributes: ['imovelId', 'discoId'],
                        include: [
                            {
                                as: 'discos',
                                model: DiscoRepo,
                                attributes: ['urlThumb', 'url']
                            }
                        ]
                    }
                ]
            });

        if (!imovelDb) return null;

        const parsed = Parsed(imovelDb);
        const result = {
            id: parsed.id,
            titulo: parsed.titulo,
            tipo: DeParaTipo[parsed.tipo],
            modo: parsed.modo,
            modoDesc: DeParaModo[parsed.modo],
            localizacao: parsed.localizacao,
            qtdBanheiros: parsed.qtdBanheiros,
            qtdGaragem: parsed.qtdGaragem,
            qtdDomitorios: parsed.qtdDomitorios,
            m2Contruidos: parsed.m2Contruidos,
            valorAluguel: parsed.valorAluguel,
            valorVenda: parsed.valorVenda,
            detalhes: parsed.detalhes,
            link: `/detalhes/${parsed.slug}/${parsed.id}`,
            imgSrc: parsed.imovelAnexos.map((b) => b.discos.url),
            imgThumbSrc: parsed.imovelAnexos.map((b) => b.discos.urlThumb),
        }
        cache.oportunidade = result;
        return result;
    }

    static async getTodos(condicoes = {}, limit = 15, useCache = false) {

        if (useCache && cache && cache.todos) {
            console.log("---> cache TODOS");
            return Promise.resolve(cache.todos);
        }

        const order = [];
        const where = {
            // situacao: 'online',
            qtdBanheiros: { [Op.gte]: condicoes.qtdBanheiros },
            qtdDomitorios: { [Op.gte]: condicoes.qtdDomitorios },
            qtdGaragem: { [Op.gte]: condicoes.qtdGaragem },

            modo: {
                [Op.in]: [
                    condicoes.modo,
                    'aluga-vende'
                ]
            },
        }

        if (Array.isArray(condicoes.entre) && condicoes.entre.length) {
            where.tipo = {
                [Op.in]: condicoes.entre
            };
        }

        if (condicoes.modo === 'alugar') {
            if (condicoes.valorMax) where.valorAluguel = { [Op.lte]: condicoes.valorMax };
            order.push('valorAluguel');
        } else {
            if (condicoes.valorMax) where.valorVenda = { [Op.lte]: condicoes.valorMax };
            order.push('valorVenda');
        }

        if (condicoes.ordem === 'menor') {
            order.push('ASC');
        } else {
            order.push('DESC');
        }

        const imovelDb = await ImovelRepo
            .findAll({
                where,
                attributes: [
                    'id',
                    'titulo',
                    'tipo',
                    'modo',
                    'localizacao',
                    'qtdBanheiros',
                    'qtdGaragem',
                    'qtdDomitorios',
                    'm2Contruidos',
                    'valorAluguel',
                    'valorVenda',
                    'slug',
                    'modo'
                ],
                limit,
                order: [order],
                include: [
                    {
                        as: 'imovelAnexos',
                        model: ImovelAnexoRepo,
                        attributes: ['imovelId', 'discoId'],
                        include: [
                            {
                                as: 'discos',
                                model: DiscoRepo,
                                attributes: ['urlThumb']
                            }
                        ]
                    }
                ]
            });

        const parsed = Parsed(imovelDb);
        const result = parsed.map((a) => ({
            id: a.id,
            titulo: a.titulo,
            tipo: DeParaTipo[a.tipo],
            localizacao: a.localizacao,
            qtdBanheiros: a.qtdBanheiros,
            qtdGaragem: a.qtdGaragem,
            qtdDomitorios: a.qtdDomitorios,
            m2Contruidos: a.m2Contruidos,
            valorAluguel: a.valorAluguel,
            valorVenda: a.valorVenda,
            valor: condicoes.modo === 'alugar' ? a.valorAluguel : a.valorVenda,
            modo: a.modo,
            link: `/detalhes/${a.slug}/${a.id}`,
            imgSrc: a.imovelAnexos.map((b) => b.discos.urlThumb)
        }));

        if (useCache) {
            cache.todos = result;
        }

        return result;
    }

    static async getById(id) {


        await ImovelRepo.update(
            {
                visualizacoes: Sequelize.literal('visualizacoes + 1')
            },
            {
                where: {
                    id
                }
            }
        );

        const imovelDb = await ImovelRepo
            .findOne({
                where: {
                    id,
                    situacao: 'online'
                },
                attributes: [
                    'id',
                    'titulo',
                    'tipo',
                    'caracteristicas',
                    'detalhes',
                    'localizacao',
                    'qtdBanheiros',
                    'qtdGaragem',
                    'qtdDomitorios',
                    'm2Contruidos',
                    'm2Terreno',
                    'valorAluguel',
                    'valorVenda',
                    'slug',
                    'modo'
                ],
                include: [
                    {
                        as: 'imovelAnexos',
                        model: ImovelAnexoRepo,
                        attributes: ['imovelId', 'discoId'],
                        include: [
                            {
                                as: 'discos',
                                model: DiscoRepo,
                                attributes: ['urlThumb', 'url']
                            }
                        ]
                    }
                ]
            });

        if (!imovelDb) return null;

        const parsed = Parsed(imovelDb);
        return {
            id: parsed.id,
            titulo: parsed.titulo,
            tipo: parsed.tipo,
            tipoDesc: DeParaTipo[parsed.tipo],
            modo: parsed.modo,
            modoDesc: DeParaModo[parsed.modo],
            localizacao: parsed.localizacao,
            caracteristicas: parsed.caracteristicas.split(";"),
            detalhes: parsed.detalhes,
            qtdBanheiros: parsed.qtdBanheiros,
            qtdGaragem: parsed.qtdGaragem,
            qtdDomitorios: parsed.qtdDomitorios,
            m2Contruidos: parsed.m2Contruidos,
            m2Terreno: parsed.m2Terreno,
            valorAluguel: parsed.valorAluguel,
            valorVenda: parsed.valorVenda,
            imgSrc: parsed.imovelAnexos.map((b) => b.discos.url),
            imgThumbSrc: parsed.imovelAnexos.map((b) => b.discos.urlThumb),
        }
    }

    static async getMapSlugs() {
        const imovelDb = await ImovelRepo
            .findAll({
                where: {
                    situacao: 'online'
                },
                attributes: [
                    'id',
                    'slug'
                ],
                raw: true
            });

        return imovelDb;
    }
}