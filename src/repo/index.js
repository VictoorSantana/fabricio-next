const { oneToOne } = require('../config/db');
const { AnaliticoRepo } = require('./analitico.repo');
const { AnuncioRepo } = require('./anuncio.repo');
const { DiscoRepo } = require('./disco.repo');
const { ImovelAnexoRepo } = require('./imovel-anexo.repo');
const { ImovelRepo } = require('./imovel.repo');
const { InteracaoRepo } = require('./interacao.repo');
const { UsuarioRepo } = require('./usuario.repo');

oneToOne(ImovelAnexoRepo, ImovelRepo, "imovel_id", "imovelAnexos");
oneToOne(ImovelAnexoRepo, DiscoRepo, "disco_id", "discos");

module.exports = {
    ImovelAnexoRepo,
    ImovelRepo,
    DiscoRepo,
    InteracaoRepo,
    UsuarioRepo,
    AnuncioRepo,
    AnaliticoRepo
};