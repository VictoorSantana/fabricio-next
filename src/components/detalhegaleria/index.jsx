"use client"

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const DetalheGaleria = ({ imovel }) => {

    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (mobile) {
        return (
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
            >
                {imovel.imgThumbSrc.map((img, idx) => (
                    <div key={idx} className="d-flex" style={{ gap: '2px' }}>

                        <img
                            key={idx}
                            src={img}
                            className="d-inline-block w-100"
                            style={{ aspectRatio: "500/400" }}
                            loading="lazy"
                            alt={`Foto do imóvel ${idx + 1} - ${imovel.titulo}`}
                        />

                    </div>
                ))}
            </Carousel>
        );
    }

    const grupos = [];
    for (let i = 0; i < imovel.imgSrc.length; i += 3) {
        grupos.push(imovel.imgSrc.slice(i, i + 3));
    }

    return (
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
        >
            {
                grupos.map((grupo, index) => (
                    <div key={index}>
                        <div className="d-flex w-100" style={{ gap: '2px' }}>
                            {grupo.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    className="d-inline-block"
                                    style={{ aspectRatio: "440/342.4", width: '33.333%' }}
                                    loading="lazy"
                                    alt={`Foto do imóvel ${index + 1} - ${imovel.titulo}`}
                                />
                            ))}
                        </div>
                    </div>
                ))
            }
        </Carousel>
    );
};

export default DetalheGaleria;