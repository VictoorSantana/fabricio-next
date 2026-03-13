"use client";


const EtapaDestaque = ({
    destaque,
    onChange,
}) => {
    return (
        <div className="row">


            <div className="col-md-6 mb-4">
                <h6>
                    <b>É destaque?</b>
                </h6>

                <div className="form-control">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="destaque" checked={destaque} onChange={(e) => onChange(e.target.checked)} />
                        <label className="form-check-label" htmlFor="destaque">Destacar imóvel</label>
                    </div>
                </div>

                <small>Marque se este imóvel deve ser destacado como prioridade a ser apresentado</small>
            </div>

        </div>
    )
}

export default EtapaDestaque