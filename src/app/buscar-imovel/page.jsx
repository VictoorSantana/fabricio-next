"use client"

import { useCallback, useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import IntersectionAnimation from "@/components/anim";
import BotaoZap from "@/components/botao-zap";
import Destaques from "@/components/destaques";
import Footer from "@/components/footer";
import FormContato from "@/components/formcontato";
import Header from "@/components/header";
import Local from "@/components/local";
import Redes from "@/components/redes";
import { DeParaTipo } from "@/models/imovel.model";
import CardImovel from "@/components/cardimovel";

const Selector = ({ active, setActive }) => {
    return (
        <div className="d-flex gap-1 ccount">
            <button type="button" onClick={() => setActive(1)} className={active === 1 ? "btn btn-primary" : "btn btn-outline-primary"}>+1</button>
            <button type="button" onClick={() => setActive(2)} className={active === 2 ? "btn btn-primary" : "btn btn-outline-primary"}>+2</button>
            <button type="button" onClick={() => setActive(3)} className={active === 3 ? "btn btn-primary" : "btn btn-outline-primary"}>+3</button>
            <button type="button" onClick={() => setActive(4)} className={active === 4 ? "btn btn-primary" : "btn btn-outline-primary"}>+4</button>
        </div>
    );
}

export default function BuscarImovel() {

    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        entre: [],
        qtdBanheiros: 1,
        qtdDomitorios: 1,
        qtdGaragem: 1,
        valorMax: 5000000,
        modo: 'vender',
        ordem: 'menor'
    });
    const [imoveis, setImoveis] = useState([]);
    const [filtroModal, setFiltroModal] = useState(false);

    const handleAddTipo = (tipo) => {
        if (form.entre.includes(tipo)) {
            setForm({
                ...form,
                entre: form.entre.filter(t => t !== tipo)
            });
            return;
        }

        setForm({
            ...form,
            entre: [...form.entre, tipo]
        });
    };

    const buscar = useCallback(async (useCache = false) => {
        setFiltroModal(false);
        setLoading(true);
        
        const request = JSON.stringify({ ...form, useCache });
        const sub = CryptoJS.AES.encrypt(request, process.env.NEXT_PUBLIC_CLIENT_SECRET).toString();

        try {
            const response = await fetch('/api/busca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sub }),
            });

            if (response.ok) {
                const data = await response.json();
                const decrypted = CryptoJS.AES.decrypt(data.sub, process.env.NEXT_PUBLIC_CLIENT_SECRET);
                const parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
                setImoveis(parsed);
            } else {
                setImoveis([]);
            }
        } catch (error) {
            console.error('Falha na requisição:', error.message);
        } finally {
            setLoading(false);
        }
    }, [form]);

    useEffect(() => {
        buscar(true); //so a primeira vez usa cache
    }, []);

    return (
        <>
            <Header />
            <main>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={"shadow-sm bg-white rounded py-3 px-4 w-100" + (mobile ? " filtros-mobile" : "")} style={{ display: mobile && !filtroModal ? "none" : "block" }}>
                                <ul className="nav nav-tabs mb-4">
                                    <li className="nav-item">
                                        <span
                                            className={`nav-link cursor-pointer ${form.modo === "vender" ? "active" : ""}`}
                                            onClick={() => setForm({ ...form, modo: "vender" })}
                                        >
                                            Comprar
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <span className={`nav-link cursor-pointer ${form.modo === "alugar" ? "active" : ""}`} onClick={() => setForm({ ...form, modo: "alugar" })}>
                                            Alugar
                                        </span>
                                    </li>
                                </ul>

                                <div className="mb-4">
                                    <p className="mb-1 text-info">Tipo de Imóvel:</p>
                                    {
                                        Object.keys(DeParaTipo)
                                            .map((tipo) => (
                                                <div className="form-check" key={tipo}>
                                                    <input className="form-check-input" type="checkbox" id={`check-${tipo}`} name={tipo} checked={form.entre.includes(tipo)} onChange={() => handleAddTipo(tipo)}></input>
                                                    <label className="form-check-label" htmlFor={`check-${tipo}`}>
                                                        {DeParaTipo[tipo]}
                                                    </label>
                                                </div>
                                            ))
                                    }
                                </div>

                                <hr />

                                <div className="mb-4">
                                    <p className="mb-1 text-info">Qtd. Quartos:</p>
                                    <Selector active={form.qtdDomitorios} setActive={(value) => setForm({ ...form, qtdDomitorios: value })} />
                                </div>

                                <div className="mb-4">
                                    <p className="mb-1 text-info">Qtd. Banheiros:</p>
                                    <Selector active={form.qtdBanheiros} setActive={(value) => setForm({ ...form, qtdBanheiros: value })} />
                                </div>

                                <div className="mb-4">
                                    <p className="mb-1 text-info">Qtd. Vagas garagem:</p>
                                    <Selector active={form.qtdGaragem} setActive={(value) => setForm({ ...form, qtdGaragem: value })} />
                                </div>

                                <hr />

                                <div className="mb-4">
                                    <p className="mb-1 text-info">Até o valor:</p>
                                    <div className="d-flex justify-content-between">
                                        <small className="text-info d-inline-block">R$ 500 mil</small>
                                        <small className="text-info d-inline-block">R$ 5 milhões</small>
                                    </div>
                                    <input type="range" className="form-range" min="500000" max="5000000" step="50000" name="valorMax" onChange={(e) => setForm({ ...form, valorMax: Number(e.target.value) })} />
                                    <small className="text-dark d-block text-center">Até {form.valorMax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</small>
                                </div>

                                <div className="d-none d-sm-block">
                                    <button type="button" onClick={() => buscar()} className="btn btn-primary w-100">Filtrar</button>
                                </div>

                                <div className="d-flex d-sm-none gap-2">
                                    <button type="button" onClick={() => setFiltroModal(false)} className="btn btn-outline-primary w-50">Fechar</button>
                                    <button type="button" onClick={() => buscar()} className="btn btn-primary w-50">Filtrar</button>
                                </div>

                                <hr></hr>

                                <a
                                    href="https://wa.me/556599401708?text=Olá, gostaria de saber sobre os imoveis."
                                    className="bg-success mb-5 mb-sm-3 text-white rounded-pill no-linkable d-flex gap-3 py-3 align-items-center justify-content-center"
                                >
                                    <img
                                        src="/images/wpp.png"
                                        alt="ícone de WhatsApp"
                                        className="d-inline-block"
                                        style={{ width: 30 }}
                                    />
                                    <div className="text-white">
                                        <h6 className="mb-0">Quer mais informações?</h6>
                                        <p className="mb-0 small">Clique e fale por WhatsApp</p>
                                    </div>
                                </a>
                                <div style={{ height: 150 }} className="d-inline-block d-sm-none w-100" />
                            </form>
                        </div>
                        <div className="col-md-8">
                            <div className="row align-items-end mb-4">
                                <div className="col-6 col-md-3">
                                    <label className="small text-info">Ordernar por</label>
                                    <select
                                        onChange={(e) => {
                                            setForm((prev) => ({ ...prev, ordem: e.target.value }));
                                            buscar();
                                        }}
                                        value={form.ordem}
                                        className="form-select bg-white"
                                    >
                                        <option value="maior">Maior preço</option>
                                        <option value="menor">
                                            Menor preço
                                        </option>
                                    </select>
                                </div>
                                <div className="col-md-4 d-none d-sm-block">
                                    <p className="mb-2">Encontrado mais de {imoveis.length} imóveis</p>
                                </div>
                                <div className="col-1 col-md-3" />
                                <div className="col-5 col-md-2 text-end">
                                    <button
                                        onClick={() => setFiltroModal(true)}
                                        type="button"
                                        className="btn btn-primary d-inline-block d-sm-none">
                                        <i className="fas fa-search" />
                                        &nbsp; Filtrar
                                    </button>
                                </div>
                            </div>
                            {/* CARDS IMOVEIS */}
                            {loading ? (
                                <div>
                                    <span className="spinner-grow spinner-grow-sm"></span>
                                    <span role="status">Carregando...</span>
                                </div>
                            ) : (
                                <div className="row align-items-end">
                                    {imoveis.map((imovel) => (
                                        <CardImovel key={imovel.id} imovel={imovel} />
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>


                <div className="container-fluid py-5">
                    <FormContato />
                </div>


                <Local />
                <Destaques />
                <Redes />
                <BotaoZap />
            </main >

            <Footer />
            <IntersectionAnimation />
        </>
    )
}