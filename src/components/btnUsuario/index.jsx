"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const BtnUsuario = () => {
    const router = useRouter();  
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [open, setOpen] = useState(false);

    const handleSair = () => {
        localStorage.clear();
        sessionStorage.clear();
        router.push('/admin/login');
    };

    return (
        <>
            <button onClick={() => setOpen((old) => !old)} className={`btn btn-outline-primary ${mobile && 'btn-lg'} border-0 position-relative`}>
                <i style={{ fontSize: '22px' }} className="far fa-user"></i> {!mobile && 'Usuário'}                
            </button>
            {open && (
                <>
                <div className="backdrop" style={{ zIndex: 29 }} onClick={() => setOpen(false)}></div>
                <div className="position-fixed w-100 bg-white shadow-sm py-3" style={{ right: '10px', top: '58px', maxWidth: '250px', zIndex: 30 }}>
                    <div className="container">
                        <button className="btn btn-outline-primary border-0 w-100">Meus Dados</button>
                        <hr />
                        <button className="btn btn-outline-primary text-danger border-0 w-100" onClick={handleSair}>Sair</button>
                    </div>
                </div>
                </>
            )}
        </>

    );
}

export default BtnUsuario;