"use client";

import ProtectedRoute from "@/components/protected";
import { ImovelTipoEnum } from "@/models/imovel.model";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";




export default function Interacao() {

    const searchParams = useSearchParams();
    const tipo = searchParams.get('tipo');

    const params = useParams();
    const [interacao, setInteracao] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/interacao/${params.id}?tipo=${tipo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(res => res.json())
            .then(data => {
                setInteracao(data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [tipo]);


    let ultimo = '';
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <ProtectedRoute>
            <div className="bg-white w-100 pb-5" style={{ minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
                <div className="position-sticky w-100 d-inline-block bg-white" style={{ top: '0px', left: '0px', zIndex: 50 }}>
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

                {interacao && <div className="container">

                    <h4 className="mb-4 text-center">
                        <b>
                            {
                                tipo === 'anuncio' ? 'Anunciaram um novo imóvel' : 'Enviaram uma mensagem'
                            }
                        </b>
                    </h4>

                    <hr />

                    {
                        Object.keys(interacao).filter((key) => interacao[key]).map((key, index) => (
                            <div key={index} className="mb-3">
                                <h6 className="text-capitalize mb-0">
                                    <b>
                                        {
                                            key.replace("createdAt", "Enviado em")
                                        }
                                        :
                                    </b>
                                </h6>
                                <p>
                                    {key === 'createdAt' ? new Date(interacao[key]).toLocaleString('pt-BR') : interacao[key]}
                                </p>
                            </div>
                        ))
                    }
                </div>}
            </div>
        </ProtectedRoute>
    )
}