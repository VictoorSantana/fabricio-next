"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

const Destaques = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("/api/destaques")
            .then((res) => res.json())
            .then((data) => {
                const decrypted = CryptoJS.AES.decrypt(data.sub, process.env.NEXT_PUBLIC_CLIENT_SECRET);
                const parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
                setItems(parsed);
            });
    }, []);

    return (
        <div className="py-5">
            <div className="container">
                <div className="row mb-5 custom-anim slide-in-bottom">
                    <div className="col-md-12 text-center">
                        <span className="hbar" />
                        <h1 className="mb-0">Em destaque</h1>
                        <p>
                            Imóveis de luxo para quem busca viver ou investir com exclusividade.
                        </p>
                    </div>
                </div>
                <div className="row justify-content-evenly custom-anim" data-anim="slide-in-bottom">

                    {
                        Boolean(items && items.length) && items.map((item, index) => (
                            <div className="col-md-3" key={index}>
                                <Link
                                    className="shadow zoom no-linkable w-100 d-inline-block rounded shadow bg-white pb-4"
                                    href={item.link}
                                    style={{ overflow: "hidden" }}
                                >
                                    {Boolean(item.imgSrc && item.imgSrc.length > 0) ? <img
                                        src={item.imgSrc[0]}
                                        className="w-100 d-inline-block mb-4"
                                        style={{ aspectRatio: "306/230" }}
                                        alt={`Imagem do imóvel ${item.titulo}`}
                                    /> : (
                                        <img src="https://placehold.co/306x230?text=Sem+Imagem" className="w-100 d-inline-block mb-4" style={{ aspectRatio: "306/230" }} alt={`Sem imagem do imóvel ${item.titulo}`} />
                                    )}

                                    <div className="px-4 mb-5">
                                        <p className="text-info mb-0 small">{item.tipo}</p>
                                        <p className="text-dark mb-0" style={{ height: 48 }}>
                                            {item.localizacao}
                                        </p>
                                    </div>

                                    <div className="d-flex gap-4 justify-content-evenly w-100 text-dark">
                                        <div
                                            className="text-center"
                                            aria-label="Qtde quartos"
                                            title="Qtde quartos"
                                        >
                                            <img
                                                src="/images/bed.png"
                                                className="d-inline-block"
                                                style={{ width: 30 }}
                                                alt="ícone de cama"
                                            />
                                            <p className="small">{item.qtdDomitorios.toString().padStart(2, '0')}</p>
                                        </div>
                                        <div
                                            className="text-center"
                                            aria-label="Qtde banheiros"
                                            title="Qtde banheiros"
                                        >
                                            <img
                                                src="/images/shower.png"
                                                className="d-inline-block"
                                                style={{ width: 26 }}
                                                alt="ícone de chuveiro"
                                            />
                                            <p className="small">{item.qtdBanheiros.toString().padStart(2, '0')}</p>
                                        </div>
                                        <div className="text-center" aria-label="Vagas de garagem">
                                            <img
                                                src="/images/car.png"
                                                className="d-inline-block"
                                                style={{ width: 28 }}
                                                alt="ícone de carro"
                                            />
                                            <p className="small">{item.qtdGaragem.toString().padStart(2, '0')}</p>
                                        </div>
                                        <div
                                            className="text-center"
                                            aria-label="Metros quadrados construido"
                                        >
                                            <img
                                                src="/images/size.png"
                                                className="d-inline-block"
                                                style={{ width: 30 }}
                                                alt="ícone de área construida"
                                            />
                                            <p className="small">{item.m2Contruidos}m²</p>
                                        </div>
                                    </div>
                                    <div className="px-4 text-dark text-center">
                                        <h4 className="mb-0" style={{ height: 90 }}>{item.titulo}</h4>
                                        {
                                            item.modo === "alugar" ? (
                                                <h6 className="text-primary">R$ {Number(item.valorAluguel).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</h6>
                                            ) : (
                                                <h6 className="text-primary">R$ {Number(item.valorVenda).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</h6>
                                            )
                                        }

                                    </div>
                                </Link>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Destaques;