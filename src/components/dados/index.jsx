


const Dados = () => {
    return (
        <div className="bg-secondary py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 text-center text-primary">
                        <i className="far fa-envelope" style={{ fontSize: 30 }} />
                        <p>fabricioalmeidamundim@gmail.com</p>
                    </div>
                    <div className="col-md-4 text-center text-primary">
                        <i className="fas fa-map-marker-alt" style={{ fontSize: 30 }} />
                        <p>
                            {" "}
                            Av. Historiador Rubens de Mendonça, 1756 - SALA 1010 - Alvorada,
                            Cuiabá - MT, 78048-340
                        </p>
                    </div>
                    <div className="col-md-4 text-center text-primary">
                        <i className="fab fa-whatsapp" style={{ fontSize: 30 }} />
                        <p>(65) 99940-1708</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dados;