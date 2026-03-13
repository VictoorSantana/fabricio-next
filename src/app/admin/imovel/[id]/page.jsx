"use client";

import ProtectedRoute from "@/components/protected";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EtapaUpload from "../_components/etapa-upload";
import EtapaDescricao from "../_components/etapa-descricao";
import EtapaEscala from "../_components/etapa-escala";
import EtapaDestaque from "../_components/etapa-destaque";
import { getFetch, postFetch, putFetch } from "../../fetch";
import { convertToWebp } from "@/shared/services/webp.service";
import EtapaFiles from "../_components/etapa-files";


export default function Imovel() {

    const { id } = useParams();
    const [progress, setProgress] = useState(0);
    const [form, setForm] = useState({
        titulo: '',
        localizacao: '',
        detalhes: '',
        valorVenda: '',
        valorAluguel: '',
        tipo: 'condominio',
        qtdDomitorios: 0,
        qtdBanheiros: 0,
        qtdGaragem: 0,
        m2Terreno: 0,
        m2Contruidos: 0,
        destaque: false
    });

    const etapas = 4;
    const [etapa, setEtapa] = useState(0);
    
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [images, setImages] = useState([]);

    const handleMsg = (msg, variant) => {
        setMsg({ msg, variant });
        setTimeout(() => {
            setMsg(null);
        }, 3500);
    }

    useEffect(() => {
        if (id !== 'novo') {
            setLoading(true);
            getFetch(`/api/imovel/${id}`)
                .then(data => {
                    setForm({
                        titulo: data.titulo,
                        localizacao: data.localizacao,
                        detalhes: data.detalhes,
                        valorVenda: data.valorVenda,
                        valorAluguel: data.valorAluguel,
                        tipo: data.tipo,
                        qtdDomitorios: data.qtdDomitorios,
                        qtdBanheiros: data.qtdBanheiros,
                        qtdGaragem: data.qtdGaragem,
                        m2Terreno: data.m2Terreno,
                        m2Contruidos: data.m2Contruidos,
                        destaque: data.destaque,
                    });

                    setImages(data.imovelAnexos.map((anexo) => anexo.discos));
                })
                .catch(() => {
                    handleMsg('Erro ao carregar imóvel', 'danger');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const criarPastaFotos = async () => {
        const formdata = new FormData();
        formdata.append("nome", form.titulo);
        formdata.append("discoId", "0");
        formdata.append("tipo", "pasta");

        const response = await fetch('/api/disco', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: formdata
        });

        if (!response.ok) {
            const message = await response.text();
            handleMsg(message || response.statusText, 'danger');
            throw new Error(message || response.statusText);
        }

        setProgress(10);

        const responseData = await response.json();
        return responseData.id;
    }

    const subirFotos = async (pastaId) => {
        const progressPorImagem = 70 / images.length;
        const anexoId = []

        for (const image of images) {
            const webpImage = await convertToWebp(image, true);
            const webpImageThumb = await convertToWebp(image, false);

            const formdata = new FormData();
            formdata.append("nome", form.titulo);
            formdata.append("discoId", pastaId);
            formdata.append("tipo", "imagem");
            formdata.append("arquivo", webpImage);
            formdata.append("thumb", webpImageThumb);

            const response = await fetch('/api/disco', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: formdata
            });

            if (!response.ok) {
                const message = await response.text();
                handleMsg(message || response.statusText, 'danger');
            }

            setProgress((old) => old + progressPorImagem);

            const responseData = await response.json();
            anexoId.push(responseData.id);
        }

        return anexoId;
    }

    const criarImovel = async () => {
        setLoading(true);

        let anexosId = [];

        // Criar pasta de fotos
        if (images.length > 0) {
            const pastaId = await criarPastaFotos();
            anexosId = await subirFotos(pastaId);
        }

        let modo = 'vender';

        if (form.valorAluguel && !form.valorVenda) {
            modo = 'alugar';
        } else if (form.valorVenda && !form.valorAluguel) {
            modo = 'vender';
        } else {
            modo = 'aluga-vende';
        }

        await postFetch('/api/imovel', {
            ...form,
            modo,
            situacao: 'online',
            valorVenda: Number(form.valorVenda) || 0,
            valorAluguel: Number(form.valorAluguel) || 0,
            m2Terreno: Number(form.m2Terreno) || 0,
            m2Contruidos: Number(form.m2Contruidos) || 0,
            anexosId: anexosId,
        });

        handleMsg('Imóvel criado com sucesso!', 'success');
    }

    const editarImovel = async () => {
        setLoading(true);

        let modo = 'vender';

        if (form.valorAluguel && !form.valorVenda) {
            modo = 'alugar';
        } else if (form.valorVenda && !form.valorAluguel) {
            modo = 'vender';
        } else {
            modo = 'aluga-vende';
        }

        await putFetch(`/api/imovel/${id}`, {
            ...form,
            modo,
            valorVenda: Number(form.valorVenda) || 0,
            valorAluguel: Number(form.valorAluguel) || 0,
            m2Terreno: Number(form.m2Terreno) || 0,
            m2Contruidos: Number(form.m2Contruidos) || 0,
        });
        setLoading(false);
        handleMsg('Imóvel editado com sucesso!', 'success');
    }

    const handleSubmit = async () => {
        if (id === 'novo') {
            await criarImovel();
        } else {
            await editarImovel();
        }

        window.location.href = '/admin/home';
    };

    return (
        <ProtectedRoute>
            <div className="bg-white w-100" style={{ paddingBottom: '80px', height: '100vh', overflow: 'auto' }}>

                <div className="px-1 py-3">
                    <button className="btn btn-outline-primary border-0"
                        onClick={() => window.history.back()}>
                        <i style={{ fontSize: '22px' }} className="far fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Voltar
                    </button>
                </div>

                <div className="container">
                    <h5 className="mb-0"><b>{id === 'novo' ? 'Adicionar' : 'Editar'} Imóvel</b></h5>
                    <p className="small">Etapa {etapa + 1} de {etapas}</p>

                    {msg && <div className="position-fixed" style={{ zIndex: 30, top: '10px', left: '0px', right: '0px' }}>
                        <div
                            className={`alert alert-${msg.variant}`}
                            role="alert"
                        >
                            {msg.msg}
                        </div>
                    </div>}

                    {loading && (
                        <>
                            {progress > 0 && <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>}
                            <div className="text-center">
                                <span className="spinner-border spinner-border-sm"></span>
                                <span role="status">Carregando...</span>
                            </div>
                        </>

                    )}
                </div>

                {!loading && <form className="container" onSubmit={(e) => {
                    e.preventDefault();
                    if (etapa + 1 < etapas) {
                        setEtapa(etapa + 1);
                    } else {
                        handleSubmit();
                    }
                }}>
                    {etapa === 0 && <>
                    
                    {
                        id === 'novo' ? <EtapaUpload onChange={setImages} /> : <EtapaFiles arquivos={images || []} />
                    }
                    
                    </>}
                    {etapa === 1 && <EtapaDescricao
                        titulo={form.titulo}
                        localizacao={form.localizacao}
                        detalhes={form.detalhes}
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
                        m2Terreno={form.m2Terreno}
                        m2Contruidos={form.m2Contruidos}
                    />}
                    {etapa === 3 && <EtapaDestaque
                        destaque={form.destaque}
                        onChange={(destaque) => setForm({ ...form, destaque })}
                    />}


                    {/* Botões fixos no rodapé */}
                    <div className="position-fixed bottom-0 start-0 w-100 bg-white border-top shadow-lg py-2" style={{ zIndex: 1000 }}>
                        <div className="container">
                            <div className="d-flex gap-2 justify-content-between align-items-center">
                                {etapa > 0 ? <button
                                    className="btn btn-outline-primary text-start"
                                    onClick={() => setEtapa(etapa - 1)}
                                    type="button"
                                >
                                    <i className="far fa-arrow-left me-2"></i>
                                    Voltar
                                </button> : <div></div>}

                                <button
                                    className="btn btn-primary text-end"
                                    type="submit"
                                >
                                    Avançar
                                    <i className="far fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>}
            </div>
        </ProtectedRoute>
    )
}