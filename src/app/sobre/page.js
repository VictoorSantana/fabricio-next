import IntersectionAnimation from "@/components/anim";
import BotaoZap from "@/components/botao-zap";
import Destaques from "@/components/destaques";
import Footer from "@/components/footer";
import Sobreme from "@/components/sobreme";
import Postagens from "@/components/postagens";
import Redes from "@/components/redes";
import FormContato from "@/components/formcontato";
import Local from "@/components/local";



export default function Sobre() {

    return (
        <>
            <header className="py-4 heading-bg-sobre heading-section">
                <div className="container">
                    <div className="row align-items-center margin-heading">
                        <div className="col-md-4 text-center text-sm-start mb-4 mb-sm-0">
                            <a href="/" className="d-inline-block">
                                <img
                                    src="/images/logoescrita.png"
                                    className="d-inline-block"
                                    style={{ width: 185 }}
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="col-md-4 mb-4 mb-sm-0">
                            <div className="d-flex justify-content-center gap-5">
                                <a
                                    className="text-white text-shadow d-none d-sm-inline-block font-montserrat navheader"
                                    href="/"
                                >
                                    Início
                                </a>
                                <a
                                    className="text-white text-shadow d-inline-block font-montserrat navheader"
                                    href="/contato"
                                >
                                    Contato
                                </a>
                                <a
                                    className="text-white text-shadow d-inline-block font-montserrat navheader"
                                    href="/anuncie"
                                >
                                    Anuncie
                                </a>
                                <a
                                    className="text-white text-shadow d-inline-block font-montserrat navheader"
                                    href="/buscar-imovel"
                                >
                                    Imóveis
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4 text-center text-sm-end"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="glass p-4 slide-in-left">
                                <h1 className="text-white h1 text-shadow-sm mb-4 font-cantata">
                                    Encontrar seu novo lar <br /> é muito simples
                                </h1>
                                <h3 className="text-white h4 text-shadow-sm mb-5">
                                    Aqui é ter a certeza de fazer um ótimo negócio. Seja um investimento
                                    ou um novo lar para sua família.
                                </h3>
                                <div className="text-center">
                                    <a
                                        className="btn btn-success mb-0 text-white shadow"
                                        href="https://wa.me/556599401708?text=Olá, gostaria de saber sobre os imoveis."
                                    >
                                        <i className="fab fa-whatsapp" /> | (65) 99940-1708
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
            </header>


            <main>
                <div className="py-5">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-12 text-center">
                                <span className="hbar"></span>
                                <h1 className="mb-0">+20 anos experiência no mercado</h1>
                                <p>
                                    Buscamos construir relações duradouras e de confiança com nossos clientes e colaboradores, entregando soluções imobiliárias dentro dos mais altos padrões de qualidade e profissionalismo.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 text-center mb-4">
                                <p className="text-info display-4 mb-0">80</p>
                                <p className="h4">Imoveis para vender e alugar</p>
                            </div>
                            <div className="col-md-3 text-center mb-4">
                                <p className="text-info display-4 mb-0">+42</p>
                                <p className="h4">Imoveis vendidos e alugados</p>
                            </div>
                            <div className="col-md-3 text-center mb-4">
                                <p className="text-info display-4 mb-0">15</p>
                                <p className="h4">Parceiros e colaboradores</p>
                            </div>
                            <div className="col-md-3 text-center mb-4">
                                <p className="text-info display-4 mb-0">+63</p>
                                <p className="h4">Clientes satisfeitos</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Destaques />


                <Postagens />

                <Sobreme />

                <div className="py-5">
                    <FormContato />
                </div>

                <Local />

                <Redes />
                <BotaoZap />
            </main>

            <Footer />
            <IntersectionAnimation />
        </>
    )
}