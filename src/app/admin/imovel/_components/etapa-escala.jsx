"use client";

import { DeParaTipo } from "@/models/imovel.model";




const Controle = ({ value = 0, onChange }) => {
    return (
        <div className="d-flex justify-content-evenly">
            <button className="btn btn-primary" type="button" onClick={() => onChange(Math.max(0, value - 1))}>-</button>
            <p className="mb-0"><b>{value.toString().padStart(2, '0')}</b></p>
            <button className="btn btn-primary" type="button" onClick={() => onChange(value + 1)}>+</button>
        </div>
    )
}




const EtapaEscala = ({
    qtdDomitorios,
    qtdBanheiros,
    qtdGaragem,
    m2Terreno,
    m2Construidos,
    tipo,
    onChange
}) => {
    return (
        <div className="container">

            <div className="mb-4">
                <label htmlFor="">Tipo de Imóvel</label>
                <select className="form-select" required={true} name="tipo" value={tipo} onChange={(e) => onChange({ tipo: e.target.value })}>
                    {
                        Object.keys(DeParaTipo).map((key) => (
                            <option key={key} value={key}>
                                {DeParaTipo[key]}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="d-flex gap-3">
                <div className="mb-4">
                    <label htmlFor="">M² Contruidos</label>
                    <input type="number" className="form-control" value={m2Construidos} onChange={(e) => onChange({ m2Construidos: e.target.value })} />
                </div>

                <div className="mb-4">
                    <label htmlFor="">M² Total</label>
                    <input type="number" className="form-control" value={m2Terreno} onChange={(e) => onChange({ m2Terreno: e.target.value })} />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="">Qtde Quartos</label>
                <Controle value={qtdDomitorios} onChange={(value) => onChange({ qtdDomitorios: value })} />
            </div>

            <div className="mb-4">
                <label htmlFor="">Qtde Banheiros</label>
                <Controle value={qtdBanheiros} onChange={(value) => onChange({ qtdBanheiros: value })} />
            </div>

            <div className="mb-4">
                <label htmlFor="">Qtde Garagens</label>
                <Controle value={qtdGaragem} onChange={(value) => onChange({ qtdGaragem: value })} />
            </div>

            


        </div>
    )
}

export default EtapaEscala