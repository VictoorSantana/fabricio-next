"use client"

import { useEffect, useState } from "react"
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/navigation';

export default function Login() {

    const router = useRouter();
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        login: "",
        senha: ""
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/admin/home');
        }
    }, [router])

    const handleMsg = (msg, variant) => {
        setMsg({ msg, variant });
        setTimeout(() => {
            setMsg(null);
        }, 3500);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        const request = JSON.stringify(form);
        const sub = CryptoJS.AES.encrypt(request, process.env.NEXT_PUBLIC_ADMIN_SECRET).toString();      

        fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sub }),
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            handleMsg("Login realizado com sucesso", "success");
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            router.push('/admin/home');
        })
        .catch(() => {
            handleMsg("Erro ao realizar login", "danger");
            setLoading(false);
        });        
    }

    return (
        <div className="full-center">
            <div className="border w-100 bg-white p-5" style={{ maxWidth: '350px' }}>
                <div className="text-center mb-5">
                    <h1>Admin</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input className="form-control bg-white" required name="login" value={form.login} onChange={handleChange} type="text" placeholder="Usuário" />
                    </div>
                    <div className="mb-5">
                        <input className="form-control bg-white" required name="senha" value={form.senha} onChange={handleChange} type="password" placeholder="Senha" />
                    </div>
                    <div className="text-center">
                        {loading ? (
                            <>
                                <span className="spinner-grow spinner-grow-sm"></span>
                                <span role="status">Carregando...</span>
                            </>
                        ) : (
                            <button type="submit" className="btn btn-primary w-100">Entrar</button>
                        )}
                    </div>
                    {msg && <div
                        className={`alert alert-${msg.variant} mt-3`}
                        role="alert"
                    >
                        {msg.msg}
                    </div>}
                </form>
            </div>
        </div>
    )
}

