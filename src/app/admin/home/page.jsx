"use client"

import ProtectedRoute from "@/components/protected"
import Link from "next/link";
import { useCallback, useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { getFetch, putFetch } from "../fetch";
import BtnInteracao from "@/components/btnInteracao";
import BtnUsuario from "@/components/btnUsuario";

const cutText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}


let timeout = null;

export default function Home() {


    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imoveis, setImoveis] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [leiaMaisIndex, setLeiaMaisIndex] = useState(-1);
    const [temMais, setTemMais] = useState(false);

    const handleMsg = (msg, variant) => {
        setMsg({ msg, variant });
        setTimeout(() => {
            setMsg(null);
        }, 3500);
    }

    const limit = mobile ? 4 : 8;

    const buscar = useCallback((pageToFetch = page) => {
        if (loading) return;
        setLoading(true);

        getFetch('/api/imovel', {
            page: pageToFetch.toString(),
            limit: limit.toString(),
            search: search
        })
            .then(data => {
                setImoveis((old) => [...old, ...data.rows]);
                setTemMais(data.rows.length === limit);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [page, search, loading]);


    useEffect(() => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            setImoveis([]);
            setPage(0);
            buscar();
        }, 2500);
    }, [search]);


    const handleMudarSituacao = (index, situacao) => {
        setLoading(true);
        putFetch('/api/imovel', {
            id: imoveis[index].id,
            situacao: situacao
        })
            .then((_data) => {
                setImoveis((old) => old.map((imovel, i) => {
                    if (i === index) {
                        return {
                            ...imovel,
                            situacao
                        };
                    }
                    return imovel;
                }));
                handleMsg("Atualizado com sucesso!", "success");
            })
            .catch(err => {
                handleMsg(err.message, "danger");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <ProtectedRoute>
            <div className="bg-white w-100 pb-5" style={{ minHeight: '100vh', margin: '0 auto' }}>
                <div className="d-flex justify-content-between align-items-center px-1 py-3">
                    <Link href="/admin/imovel/novo" className={`btn btn-outline-primary ${mobile && 'btn-lg'} border-0`}>
                        <i style={{ fontSize: '22px' }} className="far fa-plus"></i> {!mobile && 'Adicionar'}
                    </Link>
                    <h4>Imóveis</h4>
                    <div>
                        <BtnInteracao />
                        <BtnUsuario />
                    </div>
                </div>

                <div className="container mb-5">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-search"></i>
                        </span>
                        <input type="text" className="form-control bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar" aria-label="Buscar" aria-describedby="basic-addon1" />
                    </div>
                </div>

                {loading && (
                    <div className="text-center">
                        <span className="spinner-grow spinner-grow-sm"></span>
                        <span role="status">Carregando...</span>
                    </div>
                )}

                {msg && <div className="position-fixed" style={{ zIndex: 30, top: '10px', left: '0px', right: '0px' }}>
                    <div
                        className={`alert alert-${msg.variant}`}
                        role="alert"
                    >
                        {msg.msg}
                    </div>
                </div>}




                <div className="container mb-5">
                    <div className="row">
                        {
                            imoveis.map((imovel, index) => (
                                <div className="col-md-4 mb-3" key={index} >
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex gap-2 align-items-center">
                                            <span className="text-primary border rounded-circle bg-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                <i className="fas fa-home"></i>
                                            </span>
                                            <div>
                                                <p className="mb-0" style={{ lineHeight: '15px' }}>{cutText(imovel.titulo, 25)}</p>
                                                <small className="mb-0 text-light d-inline-block">{cutText(imovel.localizacao, 30)}</small>
                                            </div>
                                        </div>

                                        <div className="position-relative">
                                            <button className="btn btn-outline-primary border-0 btnmenu">
                                                <i className="fas fa-ellipsis-v"></i>
                                            </button>
                                            <div className="position-absolute shadow border bg-white divmenu" style={{ width: "180px", zIndex: 10, top: '20px', left: '-155px' }}>
                                                <Link href={`/admin/imovel/${imovel.id}`} className="btn btn-outline-primary d-block w-100 border-0 mb-2">
                                                    <i className="fas fa-edit"></i> Editar
                                                </Link>
                                                <button className="btn btn-outline-primary d-block w-100 border-0"
                                                    onClick={() => handleMudarSituacao(index, imovel.situacao === 'online' ? 'offline' : 'online')}
                                                >
                                                    <i className="fas fa-wifi"></i> {imovel.situacao === 'online' ? 'Remover do site' : 'Deixar disponível'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        imovel.imovelAnexos.length > 0 ? (
                                            <Carousel
                                                showThumbs={false}
                                                showStatus={false}
                                                infiniteLoop={true}
                                                swipeable={false}
                                            >
                                                {
                                                    imovel.imovelAnexos.map((anexo, j) => (
                                                        <div key={j}>
                                                            <img src={anexo.discos.urlThumb}
                                                                loading="lazy"
                                                                className="w-100 d-inline-block" style={{ aspectRatio: '1/1' }} alt="" />
                                                        </div>
                                                    ))
                                                }
                                            </Carousel>
                                        ) : (
                                            <div>
                                                <img src="https://placehold.co/400x400?text=Sem Imagem" className="w-100 d-inline-block" alt="" />
                                            </div>
                                        )
                                    }

                                    <div className="d-flex gap-5">
                                        <button className="btn btn-outline-primary border-0 gap-2 px-0 d-flex align-items-center">
                                            <i className="far fa-eye"></i> {imovel.visualizacoes}
                                        </button>
                                        <button className="btn btn-outline-primary border-0 gap-2 px-0 d-flex align-items-center">
                                            <i className="far fa-comment"></i> 0
                                        </button>
                                        <button className="btn btn-outline-primary border-0 gap-2 px-0 d-flex align-items-center">
                                            <i className="fas fa-wifi"></i> {imovel.situacao === 'online' ? 'Online' : 'Offline'}
                                        </button>
                                    </div>
                                    {
                                        imovel.detalhes && (
                                            <>
                                                {
                                                    index === leiaMaisIndex && (
                                                        <div onClick={() => setLeiaMaisIndex(null)}>
                                                            <p dangerouslySetInnerHTML={{ __html: imovel.detalhes.replace(/\r?\n/g, '<br>') }}></p>
                                                            <span className="text-light cursor-pointer">menos</span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    index !== leiaMaisIndex && (
                                                        <div onClick={() => setLeiaMaisIndex(index)}>
                                                            <p>{cutText(imovel.detalhes.replace(/\r?\n/g, ''), 100)} <span className="text-light cursor-pointer">mais</span></p>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }


                                </div>
                            ))
                        }
                    </div>
                </div>



                {(temMais && !loading) && <div className="text-center">
                    <button type="button" className="btn btn-secondary" onClick={() => {
                        setPage(prev => {
                            const next = prev + 1;
                            buscar(next);
                            return next;
                        });
                    }}>Carregar mais</button>
                </div>}

            </div>
        </ProtectedRoute>
    )
}