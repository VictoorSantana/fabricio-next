"use client";

import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const sobreme = () => {


    const images = [
        "/images/fab-1.jpeg",
        "/images/fab-2.jpeg",
        "/images/fab-3.jpeg",
        "/images/fab-4.jpeg",
        "/images/fab-5.jpeg",
        "/images/fab-6.jpeg",
    ];

    return (
        <div className="bg-seamless py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div
                        className="col-md-4 custom-anim"
                        data-anim="slide-in-bottom"
                    >
                        <h1 className="text-primary text-center text-sm-start">
                            Fabrício Mundim
                        </h1>
                        <p className="text-dark text-center text-sm-start">
                            Agente imobiliário especializado em imóveis de luxo em Cuiabá.
                        </p>
                        <p className="text-dark">
                            ⚖️&nbsp; Direito <br />
                            💼&nbsp; Perito Avaliador Imobiliário Judicial <br />
                            💎&nbsp; Corretor de Imóveis de Alto Padrão <br />
                            🏠&nbsp; Casas nos melhores Condomínios <br />
                            🏢&nbsp; Apartamentos e Studios <br />
                        </p>
                    </div>
                    <div className="col-md-4 text-center">
                        {/* Link para site oficial */}
                        <div
                            className="d-inline-block w-100"
                            style={{ overflow: "hidden" }}
                        >
                            <Carousel
                                showThumbs={false}
                                showStatus={false}
                                infiniteLoop={true}
                            >
                                {images.map((a, i) => (
                                    <div key={i}>
                                        <img
                                            src={a}
                                            loading="lazy"
                                            className="w-100 d-inline-block"
                                            style={{ aspectRatio: "330/500" }}
                                            alt="foto de auto retrato"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary py-3 py-sm-0 text-center text-sm-start">
                            Entre em contato agora mesmo.
                        </h3>
                        <p className="text-dark">
                            Formado em Direito, Corretor de Imóveis e Perito Avaliador Judicial.
                        </p>
                        <p className="text-dark">
                            Agente imobiliário especializado em imóveis de alto padrão em Cuiabá,
                            oferecendo consultoria personalizada para compra, venda e locação.
                            Comprometido em transformar cada negociação em uma experiência segura,
                            sofisticada e de alto valor.
                        </p>
                        <Link href="/sobre" className="btn btn-primary">
                            {" "}
                            <i className="fas fa-info-circle" />
                            &nbsp;&nbsp; Saiba mais{" "}
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default sobreme;