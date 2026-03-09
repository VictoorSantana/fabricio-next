


const Local = () => {

    return (
        <div className="py-5">
                    <div className="container">
                        <div className="row position-relative">
                            <div className="col-md-4 mb-5 mb-sm-0">
                                <div className="d-flex justify-content-center mb-4">
                                    <span
                                        className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle"
                                        style={{ width: 80, height: 80 }}
                                    >
                                        <i style={{ fontSize: 30 }} className="far fa-envelope" />
                                    </span>
                                </div>
                                <h5 className="text-center">E-mail</h5>
                                <p className="text-center mb-0">fabricioalmeidamundim@gmail.com</p>
                            </div>
                            <div className="col-md-4 mb-5 mb-sm-0">
                                <div className="d-flex justify-content-center mb-4">
                                    <span
                                        className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle"
                                        style={{ width: 80, height: 80 }}
                                    >
                                        <i style={{ fontSize: 30 }} className="fas fa-phone" />
                                    </span>
                                </div>
                                <h5 className="text-center">Telefone</h5>
                                <p className="text-center mb-0">(65) 99940-1708</p>
                            </div>
                            <div className="col-md-4 mb-5 mb-sm-0">
                                <div className="d-flex justify-content-center mb-4">
                                    <span
                                        className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle"
                                        style={{ width: 80, height: 80 }}
                                    >
                                        <i style={{ fontSize: 30 }} className="fas fa-map-marker-alt" />
                                    </span>
                                </div>
                                <h5 className="text-center">Endereço</h5>
                                <p className="text-center mb-0">Edifício Comercial SB Tower</p>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Local;