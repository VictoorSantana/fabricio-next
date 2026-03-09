"use client"

import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import CryptoJS from 'crypto-js';

const FormContato = () => {
    const recaptchaRef = useRef(null);
    const [form, setForm] = useState({
        tipo: "contato",
        recaptcha: null
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [enviado, setEnviado] = useState(false);

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

        if(!form.recaptcha){
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
        <form
            className="bg-white rounded shadow py-5 w-100 mx-auto px-3 px-sm-5"
            style={{ maxWidth: 800 }}
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center">
                        <h2>Fale com a gente!</h2>
                        <p>O seu sonho está muito próximo!</p>
                    </div>
                </div>
                <input type="hidden" name="tipo" defaultValue={form.tipo} />
                <div className="col-md-6 mb-3">
                    <label htmlFor="" className="text-info">
                        Nome
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="nome"
                        required={true}
                        maxLength={80}
                        placeholder="informe seu nome"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="" className="text-info">
                        E-mail
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        required={true}
                        maxLength={50}
                        placeholder="informe seu e-mail preferido"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12 mb-5">
                    <label htmlFor="" className="text-info">
                        Mensagem
                    </label>
                    <textarea
                        className="form-control"
                        rows={5}
                        name="mensagem"
                        required={true}
                        maxLength={250}
                        placeholder="informe sua mensagem"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12">
                    <div className="d-flex justify-content-center w-100 mb-3">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="normal" // Or "normal" for checkbox
                            onChange={(re) => setForm({ ...form, recaptcha: re })}
                            sitekey={process.env.NEXT_PUBLIC_CLIENT_RECAPTCHA_WEB} // Use your public key
                        />
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    {
                        loading ? (
                            <>
                                <span className="spinner-grow spinner-grow-sm"></span>
                                <span role="status">Carregando...</span>
                            </>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    className="btn btn-primary shadow"
                                    disabled={enviado}
                                >
                                    {enviado ? "Mensagem enviada!" : "Enviar mensagem"}
                                </button>
                                {msg && <div
                                    className={`alert alert-${msg.variant} mt-3`}
                                    role="alert"
                                >
                                    {msg.msg}
                                </div>}
                            </>
                        )
                    }
                </div>
            </div >
        </form >
    );
}

export default FormContato;