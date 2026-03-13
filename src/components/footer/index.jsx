"use client"

import { useState } from "react";
import CryptoJS from 'crypto-js';

const Footer = () => {
    const [form, setForm] = useState({
        tipo: "newsletter",
        email: ""
    });
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    const handleMsg = (msg, variant) => {
        setMsg({ msg, variant });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const request = JSON.stringify(form);
        const sub = CryptoJS.AES.encrypt(request, process.env.NEXT_PUBLIC_CLIENT_SECRET).toString();

        fetch('/api/interacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sub }),
        })
            .then(response => {
                if (response.ok) {
                    handleMsg("Cadastrado com sucesso!", "success");
                    setEnviado(true);
                } else {
                    handleMsg("Erro ao cadastrar", "danger");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                handleMsg("Erro ao cadastrar", "danger");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <footer className="bg-seamless py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 text-center text-sm-start">
                        <a href="/" className="d-inline-block mb-4">
                            <img
                                src="/images/logomarca.png"
                                alt="Logomarca da empresa Fábricio Imóveis"
                            />
                        </a>
                        <p className="text-dark">
                            Buscamos construir relações duradouras e de confiança com nossos
                            clientes e colaboradores, entregando soluções imobiliárias dentro dos
                            mais altos padrões de qualidade e profissionalismo.
                        </p>
                    </div>
                    <div className="col-md-2 col-12 text-center text-sm-start">
                        <h2 className="text-info mb-2 h5">Links rápidos</h2>
                        <span className="hbar mb-4" />
                        <a href="/" className="d-block text-dark no-linkable mb-3">
                            {" "}
                            • Início
                        </a>
                        <a href="/contato" className="d-block text-dark no-linkable mb-3">
                            {" "}
                            • Contato
                        </a>
                        <a href="/anuncie" className="d-block text-dark no-linkable mb-3">
                            {" "}
                            • Anuncie
                        </a>
                        <a href="/imoveis" className="d-block text-dark no-linkable mb-3">
                            {" "}
                            • Imóveis
                        </a>
                        <a href="/sobre" className="d-block text-dark no-linkable mb-3">
                            {" "}
                            • Sobre
                        </a>
                    </div>
                    <div className="col-md-4 col-12 text-center text-sm-start">
                        <h3 className="text-info mb-2 mt-3 mt-sm-0 h5">Contatos</h3>
                        <span className="hbar mb-4" />
                        <p className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2 text-dark no-linkable mb-3">
                            <i className="fas fa-phone text-dark" style={{ opacity: "0.5" }} />
                            (65) 99940-1708
                        </p>
                        <p className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2 text-dark no-linkable mb-3">
                            <i className="far fa-envelope text-dark" style={{ opacity: "0.5" }} />
                            fabricioalmeidamundim@gmail.com
                        </p>
                        <p className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2 text-dark no-linkable mb-3">
                            <i
                                className="fab fa-instagram text-dark"
                                style={{ opacity: "0.5" }}
                            />
                            @fabricioamundim
                        </p>
                    </div>
                    <div className="col-md-3 mt-5 mt-sm-0">
                        <h3 className="text-info mb-2 h5">Newsletter</h3>
                        <span className="hbar mb-4" />
                        <p className="d-block text-dark no-linkable mb-3">
                            Uma newsletter é um boletim informativo digital, geralmente enviado
                            por e-mail de forma periódica, que contém conteúdo relevante,
                            novidades, promoções ou artigos para um público específico de
                            assinantes.
                        </p>
                        {!enviado && <form className="input-group mb-3" onSubmit={handleSubmit}>
                            {
                                loading ? (
                                    <>
                                        <span className="spinner-grow spinner-grow-sm"></span>
                                        <span role="status">Carregando...</span>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            required={true}
                                            placeholder="Informe seu e-mail"
                                            aria-label="Informe seu e-mail"
                                            aria-describedby="newsletterCampo"
                                            value={form.email}
                                            onChange={(e) => setForm((old) => ({ ...old, email: e.target.value }))}
                                        />
                                        <button
                                            type="submit"
                                            className="input-group-text bg-primary text-white cursor-pointer"
                                            id="newsletterCampo"
                                            aria-label="Botão para enviar o e-mail para ser atualizado com novidades"
                                        >
                                            <i className="fas fa-paper-plane" />
                                        </button>
                                    </>
                                )
                            }
                        </form>}

                        {msg && <div
                            className={`alert alert-${msg.variant} mt-3`}
                            role="alert"
                        >
                            {msg.msg}
                        </div>}
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;