"use client";

import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import CryptoJS from 'crypto-js';

const FormDetalhe = ({ imovel }) => {

    const recaptchaRef = useRef(null);
    const [modo, setModo] = useState(imovel.modo === 'aluga-vende' ? 'vender' : imovel.modo);
    const [form, setForm] = useState({
        tipo: 'contato',
        nome: '',
        telefone: '',
        email: '',
        mensagem: '',
        recaptcha: null
    })
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [enviado, setEnviado] = useState(false);

    useEffect(() => {
        setForm({
            ...form,
            mensagem: `Estou interessado no imóvel ${imovel.titulo}, ${imovel.m2Contruidos}m² - ${imovel.localizacao}. para ${modo === 'aluga' ? 'alugar' : 'comprar'} ${modo === 'aluga' ? `R$ ${imovel.valorAluguel?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : `R$ ${imovel.valorVenda?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}.\n`
        })
    }, [modo])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleMsg = (msg, variant) => {
        setMsg({ msg, variant });
        setTimeout(() => {
            setMsg(null);
        }, 3500);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.recaptcha) {
            handleMsg("Por favor, complete o captcha", "danger");
            return;
        }

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
                    handleMsg("Mensagem enviada com sucesso!", "success");
                    setEnviado(true);
                } else {
                    handleMsg("Erro ao enviar mensagem", "danger");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                handleMsg("Erro ao enviar mensagem", "danger");
            })
            .finally(() => {
                recaptchaRef.current.reset(); // Reset the captcha
                setLoading(false);
            });
    }

    return (
        <div className="shadow-sm bg-white rounded py-3 px-4 w-100">
            <ul className="nav nav-tabs mb-4">
                {Boolean(imovel.modo === 'vender' || imovel.modo === 'aluga-vende') && <li className="nav-item">
                    <span onClick={() => setModo('vender')} className={modo === 'vender' ? "nav-link active" : "nav-link cursor-pointer"}>
                        Comprar
                    </span>
                </li>}
                {Boolean(imovel.modo === 'alugar' || imovel.modo === 'aluga-vende') && <li className="nav-item">
                    <span onClick={() => setModo('alugar')} className={modo === 'alugar' ? "nav-link active" : "nav-link cursor-pointer"}>
                        Alugar
                    </span>
                </li>}
            </ul>
            <div className="d-flex justify-content-between">
                <p className="mb-0">
                    {modo === 'vender' ? 'Valor da venda' : 'Valor do aluguel'}
                </p>
                <p className="mb-0 fw-bolder cLocalValor">
                    {
                        modo === 'aluga' ? (
                            <>
                                {Number(imovel.valorAluguel).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </>
                        ) : (
                            <>
                                {Number(imovel.valorVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </>
                        )
                    }
                </p>
            </div>
            <hr />
            <a
                href={`https://wa.me/556599401708?text=Olá, gostaria de saber sobre ${imovel.titulo}.`}
                className="bg-success mb-3 text-white rounded-pill no-linkable d-flex gap-3 py-3 align-items-center justify-content-center"
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
            <form onSubmit={handleSubmit}>
                <textarea
                    className="form-control mb-4 bg-white"
                    rows={3}
                    name="mensagem"
                    required={true}
                    value={form.mensagem}
                    onChange={handleChange}
                />
                <input type="hidden" name="tipo" defaultValue="contato" />
                <input
                    type="text"
                    name="nome"
                    required={true}
                    placeholder="Nome"
                    className="form-control mb-4 bg-white"
                    value={form.nome}
                    onChange={handleChange}
                    maxLength={80}
                />
                <input
                    type="email"
                    required={true}
                    placeholder="E-mail"
                    className="form-control mb-4 bg-white"
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    maxLength={50}
                />
                <input
                    type="text"
                    name="telefone"
                    required={true}
                    placeholder="(00) 00000-0000"
                    className="form-control mb-4 bg-white"
                    value={form.telefone}
                    onChange={handleChange}
                    maxLength={16}
                />
                <div className="d-flex justify-content-center w-100 mb-3">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="normal" // Or "normal" for checkbox
                        onChange={(re) => setForm({ ...form, recaptcha: re })}
                        sitekey={process.env.NEXT_PUBLIC_CLIENT_RECAPTCHA_WEB} // Use your public key
                    />
                </div>
                {
                    loading ? (
                        <>
                            <span className="spinner-grow spinner-grow-sm"></span>
                            <span role="status">Carregando...</span>
                        </>
                    ) : (
                        <button type="submit" className="btn btn-primary w-100" disabled={enviado}>
                            {enviado ? "Enviado!" : "Enviar"}
                        </button>
                    )
                }
                <div className="container">
                    {msg && <div
                        className={`alert alert-${msg.variant} mt-3`}
                        role="alert"
                    >
                        {msg.msg}
                    </div>}
                </div>
            </form>
        </div>
    );
};

export default FormDetalhe;