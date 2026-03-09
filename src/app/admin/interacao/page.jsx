"use client";

import ProtectedRoute from "@/components/protected";
import { ImovelTipoEnum } from "@/models/imovel.model";
import Link from "next/link";
import { useEffect, useState } from "react";




export default function Interacao() {

    const [interacao, setInteracao] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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

    }, []);


    let ultimo = '';
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <ProtectedRoute>
            <div className="bg-white w-100 pb-5" style={{ minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
                <div className="position-sticky w-100 d-inline-block bg-white" style={{top: '0px', left: '0px', zIndex: 50}}>
                    <div className="d-flex justify-content-between align-items-center px-1 py-3">
                        <button className="btn btn-outline-primary btn-lg border-0"
                            onClick={() => window.history.back()}>
                            <i style={{ fontSize: '22px' }} className="far fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Voltar
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
                                <>
                                    {!igualAoUltimo && <h6>{dataFormatada}</h6>}
                                    <Link href={`/admin/interacao/${interacao.id}?tipo=${ImovelTipoEnum.includes(interacao.tipo) ? 'anuncio' : 'interacao'}`} className="d-flex gap-3 align-items-center mb-4 no-linkable w-100" key={index}>
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
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </ProtectedRoute>
    )
}