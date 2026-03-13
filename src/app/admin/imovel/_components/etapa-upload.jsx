"use client";

import { useState, useRef, useEffect } from "react";

const EtapaUpload = ({ onChange }) => {
    const [arquivos, setArquivos] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setArquivos(prev => [...prev, ...files.map((file, index) => ({
            file,
            ordem: prev.length + index + 1
        }))]);
    };

    const handleAreaClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        onChange(
            arquivos.filter((arquivo) => arquivo.ordem > 0)
            .sort((a, b) => a.ordem - b.ordem)
            .map((arquivo) => arquivo.file)
        );
    }, [arquivos]);

    const handleImageClick = (index) => {
        const alguemNaFila = arquivos.some((arquivo) => arquivo.ordem > 0);
        const deselecionado = !arquivos[index].ordem;
        const ultimoFila = Math.max(...arquivos.map((arquivo) => arquivo.ordem));
        const indiceAtual = arquivos[index].ordem

        if (!alguemNaFila) {
            setArquivos((prev) => prev.map((arquivo, i) => {
                if (i === index) {
                    return {
                        ...arquivo,
                        ordem: 1
                    }
                }
                return arquivo
            }));
            return;
        }

        if (deselecionado) {
            setArquivos((prev) => prev.map((arquivo, i) => {
                if (i === index) {
                    return {
                        ...arquivo,
                        ordem: ultimoFila + 1
                    }
                }
                return arquivo
            }));
        } else {
            // TODO: Remover da fila
            setArquivos((prev) => prev.map((arquivo, i) => {
                if (i === index) {
                    return {
                        ...arquivo,
                        ordem: 0
                    }
                }
                return {
                    ...arquivo,
                    ordem: arquivo.ordem > indiceAtual ? arquivo.ordem - 1 : arquivo.ordem
                }
            }));
        }
    };

    return (
        <div>
            {/* Área de upload */}
            <div
                className="border-2 border-dashed border-secondary rounded-3 p-4 text-center cursor-pointer hover-bg-light"
                style={{ backgroundColor: '#f8f9fa' }}
                onClick={handleAreaClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
                <div className="text-muted">
                    <i className="fas fa-cloud-upload-alt fa-3x mb-3"></i>
                    <h5>Adicionar arquivos</h5>
                    <p className="mb-0">Clique para selecionar os arquivos</p>
                </div>
            </div>

            {/* Mosaico de arquivos */}
            {arquivos.length > 0 && (
                <div className="mt-4">
                    <h6 className="mb-3">Arquivos selecionados ({arquivos.length})</h6>
                    <div
                        className="d-grid gap-2"
                        style={{
                            gridTemplateColumns: 'repeat(auto-fill, minmax(25%, 1fr))',
                            gap: '2px'
                        }}
                    >
                        {arquivos.map((arquivo, index) => (
                            <div key={index} className="position-relative">
                                <img
                                    src={URL.createObjectURL(arquivo.file)}
                                    alt={arquivo.file.name}
                                    className="w-100 h-100 object-cover rounded cursor-pointer"
                                    style={{ aspectRatio: '1/1' }}
                                    onClick={() => handleImageClick(index)}
                                />

                                {/* Badge com número de ordem */}
                                <div className="position-absolute top-0 start-0 m-1">
                                    {arquivo.ordem > 0 ? <div
                                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {arquivo.ordem}
                                    </div> : (
                                        <div
                                            className="border border-primary text-primary rounded-circle d-inline-block"
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                fontSize: '12px',
                                                fontWeight: 'bold'
                                            }}
                                        ></div>
                                    )}
                                </div>

                                {/* Nome do arquivo */}
                                <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-1 rounded-bottom">
                                    <small className="text-truncate d-block">
                                        {arquivo.file.name}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default EtapaUpload