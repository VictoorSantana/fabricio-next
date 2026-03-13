"use client";

const EtapaFiles = ({ arquivos }) => {
    return (
        <div>
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
                                    src={arquivo.urlThumb}
                                    alt={arquivo.nome}
                                    className="w-100 h-100 object-cover rounded"
                                    style={{ aspectRatio: '1/1' }}
                                />                                
                                {/* Nome do arquivo */}
                                <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-1 rounded-bottom">
                                    <small className="text-truncate d-block">
                                        {arquivo.nome}
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

export default EtapaFiles