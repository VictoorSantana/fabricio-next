

// import { useParams } from "next/navigation";
// import { useState } from "react";

import IntersectionAnimation from "@/components/anim";
import BotaoZap from "@/components/botao-zap";
import Destaques from "@/components/destaques";
import DetalheGaleria from "@/components/detalhegaleria";
import Footer from "@/components/footer";
import FormDetalhe from "@/components/formdetalhe";
import Header from "@/components/header";
import Redes from "@/components/redes";
import { ImovelService } from "@/shared/services/imovel.service";




export default async function Detalhes({ params }) {

    const { id } = await params;
    const imovel = await ImovelService.getById(id);

    return (
        <>
            <Header />
            <main>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 text-center text-sm-start">
                            <p className="text-dark">
                                <i className="fas fa-map-marker-alt text-primary" />
                                {imovel.localizacao}
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-sm-end">
                            <h4 className="text-primary">
                                {
                                    imovel.modo === 'aluga' ? (
                                        <>
                                            Aluguel {Number(imovel.valorAluguel).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </>
                                    ) : (
                                        <>
                                            {Number(imovel.valorVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </>
                                    )
                                }
                            </h4>
                        </div>
                    </div>
                </div>

                <hr></hr>

                <div className="container mb-4">
                    <h4 className="text-center">
                        {imovel.titulo} {imovel.area} m² {" "}
                        {
                            imovel.modo === 'aluga' ? (
                                <>
                                    {" "} aluguel {" "}
                                    {Number(imovel.valorAluguel).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </>
                            ) : (
                                <>
                                    {" "} por{ " "} 
                                    {Number(imovel.valorVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </>
                            )
                        }
                       {" "} - {" "}{imovel.localizacao}
                    </h4>
                </div>

                <div
                    className="container mb-4" style={{ overflow: "hidden" }}>
                    <DetalheGaleria imovel={imovel} />
                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row mb-5">
                                <div className="col-6 col-md-4">
                                    <div className="d-flex gap-2 py-3">
                                        <img
                                            src="/images/bed.png"
                                            className="d-inline-block"
                                            style={{ width: 30 }}
                                            alt="ícone de cama"
                                        />
                                        <div>
                                            <h6 className="mb-0">Dormitórios</h6>
                                            <p className="mb-0 small">
                                                <span className="fw-bolder">{imovel.qtdDomitorios}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-4">
                                    <div className="d-flex gap-2 py-3">
                                        <img
                                            src="/images/shower.png"
                                            className="d-inline-block"
                                            style={{ width: 38 }}
                                            alt="ícone de cama"
                                        />
                                        <div>
                                            <h6 className="mb-0">Banheiros</h6>
                                            <p className="mb-0 small">
                                                <span className="fw-bolder">{imovel.qtdBanheiros}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-4">
                                    <div className="d-flex gap-2 py-3">
                                        <img
                                            src="/images/car.png"
                                            className="d-inline-block"
                                            style={{ width: 35 }}
                                            alt="ícone de cama"
                                        />
                                        <div>
                                            <h6 className="mb-0">
                                                Vaga <span className="d-none d-sm-block">de garagem</span>
                                            </h6>
                                            <p className="mb-0 small">
                                                <span className="fw-bolder">{imovel.qtdGaragem}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-4">
                                    <div className="d-flex gap-2 py-3">
                                        <img
                                            src="/images/size.png"
                                            className="d-inline-block"
                                            style={{ width: 35 }}
                                            alt="ícone de cama"
                                        />
                                        <div>
                                            <h6 className="mb-0">Área construida</h6>
                                            <p className="mb-0 small">
                                                <span className="fw-bolder">{imovel.m2Contruidos}m²</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-5 mb-sm-0">
                                <div className="col-md-12 mb-5">
                                    <h5 className="mb-3">
                                        <i className="fas fa-list" />
                                        Sobre o imóvel
                                    </h5>
                                    <p dangerouslySetInnerHTML={{ __html: imovel.detalhes.replace(/\r?\n/g, '<br>') }} />
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mb-3">
                                        <i className="fas fa-check" />
                                        Caracteristicas do Imóvel
                                    </h5>
                                    <div className="bg-white rounded shadow-sm pt-3 px-1 px-sm-4">
                                        <div className="row">
                                            {
                                                imovel.caracteristicas.map((carac, index) => (
                                                    <div key={index} className="col-md-4 col-6 mb-3 text-center text-sm-start">
                                                        <p className="mb-0">{carac}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <FormDetalhe imovel={imovel} />
                        </div>
                    </div>
                </div>




                <Destaques />
                <Redes />
                <BotaoZap />
            </main>

            <Footer />
            <IntersectionAnimation />
        </>
    )
}