export default function Oportunidade({ imovel }) {


    return (
        <div className="py-5">
            <div className="container">
                <div className="col-md-12 mb-5 text-center text-sm-start">
                    <span className="hbar"></span>
                    <h2 className="mb-0 h1">Oportunidade de hoje</h2>
                    <p>Imóveis em destaque</p>
                </div>
                <div className="col-md-12">
                    <a className="row no-linkable text-dark bg-white gap-0 rounded shadow custom-anim" 
                    aria-label={`Link para abrir site imóvel ${imovel.titulo}`}
                    data-anim="slide-in-right"
                    style={{ overflow: 'hidden' }} href={imovel.link}>

                        <div className="col-md-6 px-0" style={{ overflow: 'hidden' }}>
                            {imovel.imgSrc && imovel.imgSrc.length ? (
                                <picture>
                                    <source
                                        srcSet={imovel.imgThumbSrc[0]}
                                        media="(max-width: 699px)"
                                    />
                                    <img
                                        src={imovel.imgSrc[0]}
                                        alt={`Imagem do imóvel ${imovel.titulo}`}
                                        className="w-100 d-inline-block"
                                        loading="lazy"
                                        style={{ aspectRatio: '500/350' }}
                                    />
                                </picture>
                            ) : (
                                <img src="https://placehold.co/306x230?text=Sem+Imagem" className="w-100 d-inline-block" style={{ aspectRatio: '500/350' }} alt="Sem imagem" />
                            )}
                        </div>

                        <div className="col-md-6 px-0">
                            <div className="px-5 py-3">
                                <div className="mb-3">
                                    <h3 className="d-inline-block text-dark mb-2">{imovel.tipo} {imovel.modoDesc}</h3>
                                    <h4 className="h5"><b>{imovel.titulo}</b></h4>
                                </div>

                                <p className="text-primary">
                                    {imovel.modo === 'alugar' && (
                                        <>
                                            Aluguel
                                            <b>{Number(imovel.valorAluguel).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>
                                        </>
                                    )}

                                    {(imovel.modo === 'vender' || imovel.modo === 'aluga-vende') && (
                                        <b>{Number(imovel.valorVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>
                                    )}
                                </p>
                                <p className="w-100 mb-5" dangerouslySetInnerHTML={{
                                    __html: imovel.detalhes.slice(0, 180).replace(/\r?\n/g, '<br>') + '...'
                                }} />
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex gap-4">
                                        <div className="text-center ctooltip" title="Metros quadrados construido">
                                            <img src="/images/area.png" className="d-inline-block" style={{ width: '30px' }} alt="ícone de cama" />
                                            <p>{imovel.m2Contruidos} m²</p>
                                        </div>
                                        {imovel.m2Terreno && (
                                            <div className="text-center ctooltip" title="Metros quadrados do terreno">
                                                <img src="/images/size.png" className="d-inline-block" style={{ width: '30px' }} alt="ícone de cama" />
                                                <p>{imovel.m2Terreno} m²</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="d-flex gap-4">
                                        <div className="text-center ctooltip" title="Qtde de quartos">
                                            <img src="/images/bed.png" className="d-inline-block" style={{ width: '30px' }} alt="ícone de cama" />
                                            <p>{imovel.qtdDomitorios.toString().padStart(2, '0')}</p>
                                        </div>
                                        <div className="text-center ctooltip" title="Qtde de banheiros">
                                            <img src="/images/shower.png" className="d-inline-block" style={{ width: '26px' }} alt="ícone de chuveiro" />
                                            <p>{imovel.qtdBanheiros.toString().padStart(2, '0')}</p>
                                        </div>
                                        <div className="text-center ctooltip" title="Vagas de garagem">
                                            <img src="/images/car.png" className="d-inline-block" style={{ width: '26px' }} alt="ícone de carro" />
                                            <p>{imovel.qtdGaragem.toString().padStart(2, '0')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}