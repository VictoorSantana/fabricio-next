"use client"

import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import CryptoJS from 'crypto-js';
import { DeParaTipo } from "@/models/imovel.model";


const FormAnuncie = () => {

    const recaptchaRef = useRef(null);
    const [form, setForm] = useState({
        recaptcha: null,
        modo: "vender",
        tipo: "condominio",
        cep: "",
        bairro: "",
        cidade: "",
        estado: "",
        logradouro: "",
        numero: "",
        complemento: "",
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [enviado, setEnviado] = useState(false);


    const handleConsultaViaCep = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                handleMsg("CEP não encontrado", "danger");
                return;
            }
            setForm({
                ...form,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf,
                logradouro: data.logradouro
            });
        } catch (error) {
            console.error('Error:', error);
            handleMsg("Erro ao consultar CEP", "danger");
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

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

        fetch('/api/anuncio', {
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
        <form className="container my-5" id="formAnuncie" onSubmit={handleSubmit}>
            <div className="row mb-5">
                <div className="col-md-12">
                    <h5 className="mb-3">
                        <i className="fas fa-home" />
                        Qual tipo de imóvel?
                    </h5>
                    <div className="bg-white rounded shadow-sm pt-3 pb-3 px-3 px-sm-4">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="">Finalizade do Imóvel</label>
                                <select className="form-select" required={true} name="modo" value={form.modo} onChange={handleChange}>
                                    <option value="alugar" >
                                        {" "}
                                        para alugar{" "}
                                    </option>
                                    <option value="vender"> à venda </option>
                                    <option value="aluga-vende"> alugar ou vender </option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <p className="mb-0">Categoria</p>
                                <select className="form-select" required={true} name="tipo" value={form.tipo} onChange={handleChange}>
                                    {
                                        Object.keys(DeParaTipo).map((key) => (
                                            <option key={key} value={key}>
                                                {DeParaTipo[key]}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-12">
                    <h5 className="mb-3">
                        <i className="fas fa-map-marker-alt" />
                        Onde ele está?
                    </h5>
                    <div className="bg-white rounded shadow-sm pt-4 pb-4 px-3 px-sm-4">
                        <div className="row">
                            <div className="col-md-3 mb-3 col-6">
                                <label htmlFor="">CEP</label>
                                <input onChange={handleChange}
                                    type="text"
                                    value={form.cep}
                                    className="form-control"
                                    required={true}
                                    name="cep"
                                    id="anuncieCep"
                                    maxLength={9}
                                    onBlur={() => handleConsultaViaCep()}
                                />
                            </div>
                            <div className="col-md-3 mb-3 col-6">
                                <label htmlFor="">Bairro*</label>
                                <input onChange={handleChange}
                                    type="text"
                                    value={form.bairro}
                                    className="form-control"
                                    required={true}
                                    name="bairro"
                                    id="anuncieBairro"
                                    maxLength={100}
                                />
                            </div>
                            <div className="col-md-3 mb-3 col-6">
                                <label htmlFor="">Cidade*</label>
                                <input onChange={handleChange}
                                    type="text"
                                    value={form.cidade}
                                    className="form-control"
                                    required={true}
                                    name="cidade"
                                    id="anuncieCidade"
                                    maxLength={100}
                                />
                            </div>
                            <div className="col-md-3 mb-3 col-6">
                                <label htmlFor="">Estado*</label>
                                <input onChange={handleChange}
                                    type="text"
                                    value={form.estado}
                                    className="form-control"
                                    required={true}
                                    name="estado"
                                    id="anuncieEstado"
                                    maxLength={50}
                                />
                            </div>
                            <div className="col-md-6 mb-3 col-6">
                                <label htmlFor="">Logradouro*</label>
                                <input onChange={handleChange}
                                    type="text"
                                    value={form.logradouro}
                                    className="form-control"
                                    required={true}
                                    name="logradouro"
                                    id="anuncieLogradouro"
                                    maxLength={100}
                                />
                            </div>
                            <div className="col-md-3 mb-3 col-6">
                                <label htmlFor="">Número*</label>
                                <input onChange={handleChange}
                                    type="text"
                                    value={form.numero}
                                    className="form-control"
                                    required={true}
                                    name="numero"
                                    id="anuncieNumero"
                                    maxLength={3}
                                />
                            </div>
                            <div className="col-md-3 mb-3 col-6">
                                <label htmlFor="">Complemento</label>
                                <input onChange={handleChange}
                                    type="text"
                                    value={form.complemento}
                                    className="form-control"
                                    name="complemento"
                                    id="anuncieComplemento"
                                    maxLength={100}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-12">
                    <h5 className="mb-3">
                        <i className="fas fa-images" />
                        Fotos
                    </h5>
                    <div className="bg-white rounded shadow-sm pt-4 pb-4 px-3 px-sm-4">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <p>
                                    Precisamos de algumas imagens apenas para ter uma ideia mais
                                    concreta. Não se preocupe com a qualidade, depois nós vamos
                                    planejar as fotografias do anúncio.
                                </p>
                            </div>
                            <div className="col-md-12">
                                <label
                                    htmlFor="uploadFotos"
                                    className="w-100 rounded d-flex align-items-center justify-content-center cursor-pointer"
                                    style={{ height: 100, border: "2px dashed #000" }}
                                >
                                    <input
                                        type="file"
                                        className="d-none"
                                        id="uploadFotos"
                                        multiple={true}
                                        accept="image/*"
                                    />
                                    <p className="mb-0">
                                        <i className="fas fa-cloud-upload-alt" />
                                        Clique para upload
                                    </p>
                                </label>
                            </div>
                            <div className="col-md-12">
                                <div
                                    id="outputUploadFotos"
                                    className="d-flex gap-2"
                                    style={{ flexWrap: "wrap" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-12">
                    <h5 className="mb-3">
                        <i className="fas fa-user" />
                        Dados pessoais
                    </h5>
                    <div className="bg-white rounded shadow-sm pt-4 pb-4 px-3 px-sm-4">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <p>
                                    Precisamos de alguns dados pessoais para que a equipe possa entrar
                                    em contato com você
                                </p>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="">Nome*</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    required={true}
                                    name="nome"
                                    maxLength={80}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="">Telefone*</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    required={true}
                                    name="telefone"
                                    id="anuncieTelefone"
                                    placeholder="(00) 00000-0000"
                                    maxLength={16}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="">E-mail*</label>
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    className="form-control"
                                    required={true}
                                    name="email"
                                    maxLength={50}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                        {enviado ? "Anuncio enviado!" : "Enviar anuncio"}
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

    )

};

export default FormAnuncie;