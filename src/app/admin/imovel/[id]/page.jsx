"use client";

import ProtectedRoute from "@/components/protected";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import EtapaUpload from "../_components/etapa-upload";
import EtapaDescricao from "../_components/etapa-descricao";
import EtapaEscala from "../_components/etapa-escala";




export default function Imovel() {

    const searchParams = useSearchParams();
    const tipo = searchParams.get('tipo');

    const [form, setForm] = useState({
        titulo: '',
        localizacao: '',
        descricao: '',
        valorVenda: '',
        valorAluguel: '',
        tipo: '',
        qtdDomitorios: 0,
        qtdBanheiros: 0,
        qtdGaragem: 0,
        m2Terreno: 0,
        m2Construidos: 0
    });

    const [etapa, setEtapa] = useState(0);
    const params = useParams();
    const [imovel, setImovel] = useState({});
    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState([]);


    return (
        <ProtectedRoute>
            <div className="bg-white w-100" style={{ minHeight: '100vh', maxWidth: '800px', margin: '0 auto', paddingBottom: '80px' }}>
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

                <form onSubmit={(e) => {
                    e.preventDefault();
                    setEtapa(etapa + 1);
                }}>
                    {etapa === 0 && <EtapaUpload onChange={setImages} />}
                    {etapa === 1 && <EtapaDescricao
                        titulo={form.titulo}
                        localizacao={form.localizacao}
                        descricao={form.descricao}
                        valorVenda={form.valorVenda}
                        valorAluguel={form.valorAluguel}
                        onChange={(data) => setForm({ ...form, ...data })}
                    />}
                    {etapa === 2 && <EtapaEscala
                        tipo={form.tipo}
                        qtdDomitorios={form.qtdDomitorios}
                        qtdBanheiros={form.qtdBanheiros}
                        qtdGaragem={form.qtdGaragem}
                        onChange={(data) => setForm({ ...form, ...data })}
                    />}


                    {/* Botões fixos no rodapé */}
                    <div className="position-fixed bottom-0 start-0 w-100 p-2 bg-white border-top shadow-lg" style={{ zIndex: 1000 }}>
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                            {etapa > 0 ? <button
                                className="btn btn-outline-primary text-start"
                                onClick={() => setEtapa(etapa - 1)}
                                type="button"
                            >
                                <i className="far fa-arrow-left me-2"></i>
                                Voltar
                            </button> : null}
                            <h6 className="mb-0">{etapa + 1}/4</h6>
                            <button
                                className="btn btn-primary text-end"
                                type="submit"
                            >
                                Avançar
                                <i className="far fa-arrow-right ms-2"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    )
}