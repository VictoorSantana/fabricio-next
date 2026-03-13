"use client";

import { getFetch } from "@/app/admin/fetch";
import { ImovelTipoEnum } from "@/models/imovel.model";
import Link from "next/link";
import { useEffect, useState } from "react";


const BtnInteracao = () => {
    const [notificacaoNaoLidas, setNotificacaoNaoLidas] = useState(0);
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getFetch('/api/interacao/count')
            .then(data => {
                setNotificacaoNaoLidas(data.count);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const [interacao, setInteracao] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        setLoading(true);

        fetch('/api/interacao', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(res => res.json())
            .then(data => {
                setInteracao(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [open]);

    let ultimo = '';
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <>
            <button onClick={() => setOpen((old) => !old)} className={`btn btn-outline-primary ${mobile && 'btn-lg'} border-0 position-relative`}>
                <i style={{ fontSize: '22px' }} className="far fa-heart"></i> {!mobile && 'Interações'}
                {notificacaoNaoLidas > 0 && <span className="small d-inline-block position-absolute badge rounded-pill bg-danger" style={{ left: '-10px' }}>{notificacaoNaoLidas}</span>}
            </button>


            {open && (
                <>
                <div className="backdrop" style={{ zIndex: 29 }} onClick={() => setOpen(false)}></div>
                <div className="position-fixed w-100 bg-white shadow-sm" style={{ right: mobile ? '0px' : '100px', top: mobile ? '0px' : '58px', maxWidth: '400px', height: mobile ? '100vh' : 'calc(100vh - 175px)', overflowY: 'auto', zIndex: 30 }}>
                    <div className="position-sticky w-100 d-inline-block bg-white" style={{ top: '0px', left: '0px', zIndex: 50 }}>
                        <div className="d-flex justify-content-between align-items-center px-1 py-3">
                            <button className="btn btn-outline-primary border-0"
                                onClick={() => setOpen(false)}>
                                <i style={{ fontSize: '22px' }} className="far fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;{mobile ? 'Voltar' : 'Fechar'}
                            </button>
                        </div>
                    </div>


                    {loading && (
                        <div className="text-center">
                            <span className="spinner-border spinner-border-sm"></span>
                            <span role="status">Carregando...</span>
                        </div>
                    )}

                    <div className="container">
                        {
                            interacao.map((interacao, index) => {

                                const data = new Date(interacao.createdAt);
                                data.setHours(0, 0, 0, 0);
                                const diffMs = hoje.getTime() - data.getTime(); // diferença em milissegundos
                                const diffDias = diffMs / (1000 * 60 * 60 * 24);
                                const dataFormatada = diffDias === 0 ? 'Hoje' : diffDias === 1 ? 'Ontem' : `${diffDias} dias atrás`;

                                const igualAoUltimo = dataFormatada === ultimo;
                                ultimo = dataFormatada;

                                //TODO: fazer diferença de dias, para ficar exemplo: "a 2 dias atras" ou "hoje"

                                return (
                                    <div key={index}>
                                        {!igualAoUltimo && <h6>{dataFormatada}</h6>}
                                        <Link href={`/admin/interacao/${interacao.id}?tipo=${ImovelTipoEnum.includes(interacao.tipo) ? 'anuncio' : 'interacao'}`} className="d-flex gap-3 align-items-center mb-4 no-linkable w-100">
                                            <span className="text-primary border rounded-circle bg-white d-flex align-items-center justify-content-center position-relative" style={{ minWidth: '40px', minHeight: '40px' }}>
                                                {ImovelTipoEnum.includes(interacao.tipo) && <i className="fas fa-home"></i>}
                                                {interacao.tipo === 'newsletter' && <i className="fas fa-rss"></i>}
                                                {interacao.tipo === 'contato' && <i className="far fa-envelope"></i>}

                                                {!interacao.visto && <span className="small d-inline-block position-absolute badge rounded-pill bg-danger" style={{ top: '20px', right: '0px' }}>i</span>}
                                            </span>
                                            <div>
                                                <p className="mb-0" style={{ lineHeight: '20px' }}><b>{interacao.email}</b></p>
                                                {(interacao.mensagem && interacao.mensagem.length > 0) && <small className="mb-0 text-dark d-inline-block" style={{ lineHeight: '15px' }}>{interacao.mensagem}</small>}
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                </>
            )}

        </>

    );
}

export default BtnInteracao;