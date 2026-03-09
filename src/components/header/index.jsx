


const Header = () => {
    return (
        <header className="py-4 bg-white shadow-sm">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4 text-center text-sm-start mb-4 mb-sm-0">
                        <a href="/" className="d-inline-block">
                            <img
                                src="/images/logoescrita-primary.png"
                                className="d-inline-block"
                                style={{ width: 185 }}
                                alt="logomarca"
                            />
                        </a>
                    </div>
                    <div className="col-md-4 mb-4 mb-sm-0">
                        <div className="d-flex justify-content-center gap-5">
                            <a
                                className="text-dark d-none d-sm-inline-block font-montserrat navheader"
                                href="/"
                            >
                                Início
                            </a>
                            <a
                                className="text-dark d-inline-block font-montserrat navheader"
                                href="/contato"
                            >
                                Contato
                            </a>
                            <a
                                className="text-dark d-inline-block font-montserrat navheader"
                                href="/anuncie"
                            >
                                Anuncie
                            </a>
                            <a
                                className="text-dark d-inline-block font-montserrat navheader"
                                href="/buscar-imovel"
                            >
                                Imóveis
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4 text-center text-sm-end">
                        <a
                            className="btn btn-success mb-0 text-white"
                            href="https://wa.me/556599401708?text=Olá, gostaria de saber sobre os imoveis."
                        >
                            <i className="fab fa-whatsapp" /> | (65) 99940-1708
                        </a>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header;