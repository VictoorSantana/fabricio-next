export const dynamic = "force-dynamic"

import Ajuda from "@/components/ajuda";
import IntersectionAnimation from "@/components/anim";
import BotaoZap from "@/components/botao-zap";
import Dados from "@/components/dados";
import Destaques from "@/components/destaques";
import Footer from "@/components/footer";
import Oportunidade from "@/components/oportunidade";
import Redes from "@/components/redes";
import Sobreme from "@/components/sobreme";
import { ImovelService } from "@/shared/services/imovel.service";
import Link from "next/link";

export default async function HomePage() {

  const imovelOportunidade = await ImovelService.getOportunidade();

  return (
    <>
      <header className="py-4 heading-bg heading-section">
        <div className="container">
          <div className="row align-items-center margin-heading">
            <div className="col-md-4 text-center text-sm-start mb-4 mb-sm-0">
              <Link href="/" className="d-inline-block">
                <img
                  src="/images/logoescrita.png"
                  className="d-inline-block"
                  style={{ width: 185 }}
                  alt="Logomarca da empresa Fábricio Imóveis"
                />
              </Link>
            </div>
            <div className="col-md-4 mb-4 mb-sm-0">
              <div className="d-flex justify-content-center gap-5">
                <Link
                  className="slide-in-top text-white text-shadow d-none d-sm-inline-block font-montserrat navheader"
                  href="/"
                >
                  Início
                </Link>
                <Link
                  className="slide-in-top text-white text-shadow d-none d-sm-inline-block font-montserrat navheader"
                  href="/sobre"
                >
                  Sobre
                </Link>
                <Link
                  className="slide-in-top text-white text-shadow d-inline-block font-montserrat navheader"
                  href="/contato"
                >
                  Contato
                </Link>
                <Link
                  className="slide-in-top text-white text-shadow d-inline-block font-montserrat navheader"
                  href="/anuncie"
                >
                  Anuncie
                </Link>
                <Link
                  className="slide-in-top text-white text-shadow d-inline-block font-montserrat navheader"
                  href="/buscar-imovel"
                >
                  Imóveis
                </Link>
              </div>
            </div>
            <div className="col-md-4 text-center text-sm-end">
              <a
                className="btn btn-success mb-0 text-white shadow"
                href="https://wa.me/556599401708?text=Olá, gostaria de saber sobre os imoveis."
              >
                <i className="fab fa-whatsapp" /> | (65) 99940-1708
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="glass p-4 slide-in-left">
                <h1 className="text-white h1 text-shadow-sm mb-4">
                  Encontrar seu novo lar <br /> é muito simples
                </h1>
                <div className="bg-white w-100 rounded-pill py-3 pe-4 ps-4 ps-sm-5">
                  <div className="row align-items-center">
                    <div className="col-md-3 mb-3 mb-sm-0">
                      <label htmlFor="fieldTipoImovel" className="small d-block text-info">
                        Tipo
                      </label>
                      <select className="form-select" id="fieldTipoImovel">
                        <option value="">Tipo</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Comercial">Comercial</option>
                        <option value="KitnetConjugado">Kitnet/Conjugado</option>
                        <option value="Terreno">Terreno</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3 mb-sm-0">
                      <label htmlFor="fieldQuartos" className="small d-block text-info">
                        Quartos
                      </label>
                      <select className="form-select" id="fieldQuartos">
                        <option value="">Qtde.</option>
                        <option value={1}>1+</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-4 mb-sm-0">
                      <label htmlFor="fieldVagasGaragem" className="small d-block text-info">
                        Vagas garagem
                      </label>
                      <select className="form-select" id="fieldVagasGaragem">
                        <option value="">Qtde.</option>
                        <option value={1}>1+</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <Link
                        href="/buscar-imovel"
                        className="btn btn-info text-white button-heading"
                        aria-label="Buscar dentro dos imoveis disponíveis"
                      >
                        <i className="fas fa-search" />
                        Buscar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="d-flex align-items-center justify-content-evenly w-100 bg-secondary py-1 slide-in-left"
                style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
              >
                <a
                  href="/buscar-imovel"
                  className="text-primary fw-bolder text-decoration-none d-inline-block"
                  aria-label="Buscar imoveis para comprar"
                >
                  Comprar
                </a>
                <a
                  href="/buscar-imovel"
                  className="text-primary fw-bolder text-decoration-none d-inline-block"
                  aria-label="Buscar imoveis para alugar"
                >
                  Alugar
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>


      <main>
        <Dados />

        <Destaques></Destaques>

        <div className="bg-seamless py-5">
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-2 col-6 mb-5 mb-sm-0">
                <a
                  href="https://www.gincourbanismo.com.br"
                  aria-label="Imagem link para abrir site Ginco"
                  target="_blank"
                  className="d-inline-block w-100 no-linkable position-relative zoom px-5 mb-5 mb-sm-0"
                >
                  <img
                    src="/images/ginco.avif"
                    className="d-inline-block cratio w-100"
                    style={{ aspectRatio: '375/70' }}
                    alt="Imagem da logo da empresa Ginco"
                  />
                </a>
              </div>
              <div className="col-md-2 col-6 mb-5 mb-sm-0">
                <a
                  href="https://www.corpalincorporadora.com.br"
                  aria-label="Imagem link para abrir site Corpal"
                  target="_blank"
                  className="d-inline-block w-100 no-linkable position-relative zoom px-5 mb-5 mb-sm-0"
                >
                  <img
                    src="/images/corpal.avif"
                    className="d-inline-block cratio w-100"
                    style={{ aspectRatio: '375/86' }}
                    alt="Imagem da logo da empresa Corpal"
                  />
                </a>
              </div>
              <div className="col-md-2 col-6 mb-5 mb-sm-0">
                <a
                  href="https://www.abitte.com.br"
                  aria-label="Imagem link para abrir site Abitte"
                  target="_blank"
                  className="d-inline-block w-100 no-linkable position-relative zoom px-5 mb-5 mb-sm-0"
                >
                  <img
                    src="/images/abitte.avif"
                    className="d-inline-block cratio w-100"
                    style={{ aspectRatio: '375/155' }}
                    alt="Imagem da logo da empresa Abitte"
                  />
                </a>
              </div>
              <div className="col-md-2 col-6 mb-5 mb-sm-0">
                <a
                  href="https://www.plaenge.com.br"
                  aria-label="Imagem link para abrir site Plaenge"
                  target="_blank"
                  className="d-inline-block w-100 no-linkable position-relative zoom px-5 mb-5 mb-sm-0"
                >
                  <img
                    src="/images/plaenge.avif"
                    className="d-inline-block cratio w-100"
                    style={{ aspectRatio: '375/75' }}
                    alt="Imagem da logo da empresa Plaenge"
                  />
                </a>
              </div>
              <div className="col-md-2 col-6">
                <a
                  href="https://saobenedito.com.br"
                  aria-label="Imagem link para abrir site Benedito"
                  target="_blank"
                  className="d-inline-block w-100 no-linkable position-relative zoom px-5"
                >
                  <img
                    src="/images/saobenedito.avif"
                    className="d-inline-block cratio w-100"
                    style={{ aspectRatio: '286/183' }}
                    alt="Imagem da logo da empresa São Benedito"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {imovelOportunidade && <Oportunidade imovel={imovelOportunidade} />}
        <Sobreme />
        <Ajuda />
        <Redes />

        <BotaoZap />
      </main>

      <Footer />

      <IntersectionAnimation />
    </>
  );
}
