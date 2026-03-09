

const Ajuda = () => {
    return (
        <div className="py-5 d-none d-sm-block">
            <div className="container">
                <div className="row mb-5">
                    <div
                        className="col-md-12 text-center custom-anim"
                        data-anim="slide-in-bottom"
                    >
                        <span className="hbar" />
                        <h1 className="mb-3">Deixe-nos ajudar você</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="shadow p-5 rounded bg-white mb-4 mb-sm-0">
                            <div className="mb-4">
                                <span
                                    className="fas fa-search text-info"
                                    style={{ fontSize: 45 }}
                                />
                            </div>
                            <h4>Oque você procura?</h4>
                            <span className="hbar mb-3" />
                            <p>
                                Não encontrou seu imóvel? Nós encontramos pra você, conte nos um
                                pouco do que você procura.
                            </p>
                            <a
                                className="btn btn-primary text-white"
                                href="https://wa.me/556599401708?text=Olá, gostaria de saber sobre os imoveis."
                            >
                                O que você procura?
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="shadow p-5 rounded bg-white mb-4 mb-sm-0">
                            <div className="mb-4">
                                <span className="fas fa-home text-info" style={{ fontSize: 45 }} />
                            </div>
                            <h4>Anuncie seu imóvel</h4>
                            <span className="hbar mb-3" />
                            <p>
                                Receba uma assessoria completa em todas as etapas da Venda ou
                                Aluguel do seu imóvel.
                            </p>
                            <a className="btn btn-primary text-white" href="/anuncie">
                                Anuncie seu imóvel
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="shadow p-5 rounded bg-white mb-4 mb-sm-0">
                            <div className="mb-4">
                                <span className="fas fa-phone text-info" style={{ fontSize: 45 }} />
                            </div>
                            <h4>Fale conosco</h4>
                            <span className="hbar mb-3" />
                            <p>
                                Agende uma visita, avaliação, ou tire suas dúvidas, envie uma
                                mensagem agora para nossa equipe.
                            </p>
                            <a className="btn btn-primary text-white" href="/contato">
                                Fale conosco
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Ajuda;