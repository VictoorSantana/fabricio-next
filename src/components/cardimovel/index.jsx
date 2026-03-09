import Link from "next/link"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const CardImovel = ({ imovel }) => {
    return (
        <div className="col-md-4 mb-4">
            <span className="shadow zoom w-100 d-inline-block rounded shadow bg-white pb-4" style={{ overflow: 'hidden' }}>
                <div className="position-relative mb-4">
                    {imovel.imgSrc.length > 0 ? <Carousel
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop={true}
                    >
                        {imovel.imgSrc.map((img, index) => (
                            <div key={index}>
                                <img
                                    src={img}
                                    loading="lazy"
                                    className="w-100 d-inline-block"
                                    style={{
                                        aspectRatio: '306/230'
                                    }}
                                    alt={`Imagem do imóvel ${imovel.titulo} ${index + 1}`}
                                />
                            </div>
                        ))}
                    </Carousel> 
                    :
                        imovel.imgSrc.length === 0 && (
                            <div>
                                <img
                                    src="https://placehold.co/306x230?text=Sem+Imagem"
                                    loading="lazy"
                                    className="w-100"
                                    style={{
                                        aspectRatio: '306/230'
                                    }}
                                    alt="Sem imagem"
                                />
                            </div>
                        )
                    }
                </div>
                <Link href={imovel.link} className="no-linkable">
                    <div className="px-4 mb-5">
                        <p className="text-info mb-0 small">{imovel.tipo}</p>
                        <p className="text-dark mb-0" style={{ height: '48px' }}>{imovel.localizacao}</p>
                    </div>
                    <div className="d-flex gap-4 justify-content-evenly w-100 text-dark">
                        <div className="text-center">
                            <img src="/images/bed.png" className="d-inline-block" style={{ width: '30px' }} alt="ícone de cama" />
                            <p className="small">{imovel.qtdDomitorios}</p>
                        </div>
                        <div className="text-center">
                            <img src="/images/shower.png" className="d-inline-block" style={{ width: '26px' }} alt="ícone de chuveiro" />
                            <p className="small">{imovel.qtdBanheiros}</p>
                        </div>
                        <div className="text-center">
                            <img src="/images/car.png" className="d-inline-block" style={{ width: '28px' }} alt="ícone de carro" />
                            <p className="small">{imovel.qtdGaragem}</p>
                        </div>
                        <div className="text-center">
                            <img src="/images/size.png" className="d-inline-block" style={{ width: '30px' }} alt="ícone de área construida" />
                            <p className="small">{imovel.m2Contruidos}m²</p>
                        </div>
                    </div>
                    <div className="px-4 text-dark text-center">
                        <h4 className="mb-0" style={{ height: '99px' }}>{imovel.titulo}</h4>
                        <h6 className="text-primary">{Number(imovel.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h6>
                    </div>
                </Link>
            </span>
        </div>
    )
}

export default CardImovel