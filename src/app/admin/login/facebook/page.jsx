
"use client"

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Facebook() {

    const router = useRouter();

    useEffect(() => {
        handleLogin();
    }, [router]);

    const handleLogin = useCallback(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            const res = await fetch('/api/oauth-facebook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                router.push('/admin/home');
            } else {
                router.push('/admin/login?errorMsg=Email não está vinculado como adminstrador');
            }
        }
    }, [router])

    return (
        <div className="text-center py-5">
            <span className="spinner-border spinner-border-sm"></span>
            <span role="status">Carregando...</span>
        </div>
    )
}