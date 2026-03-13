"use client";

import { NumericFormat } from "react-number-format";

const EtapaDescricao = ({
    titulo,
    localizacao,
    detalhes,
    valorVenda,
    valorAluguel,
    onChange    
}) => {
    return (
        <div className="row">

            <div className="col-md-3 mb-4">
                <label htmlFor="titulo">Título <span className="text-danger">*</span> </label>
                <input className="form-control" required={true} name="titulo" value={titulo} onChange={(e) => onChange({ titulo: e.target.value })} />
            </div>

            <div className="col-md-3 mb-4">
                <label htmlFor="localizacao">Localização <span className="text-danger">*</span></label>
                <input className="form-control" required={true} name="localizacao" value={localizacao} onChange={(e) => onChange({ localizacao: e.target.value })} />
            </div>

            <div className="col-md-3 mb-4">
                <label htmlFor="valorVenda">Valor venda</label>
                <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={'R$ '}
                    decimalScale={2}
                    fixedDecimalScale
                    className="form-control"
                    value={valorVenda}
                    onValueChange={(values) => {
                        const { value } = values;
                        // value: 1000.00 (para salvar no banco)
                        onChange({ valorVenda: value });
                    }}
                />
            </div>

            <div className="col-md-3 mb-4">
                <label htmlFor="valorAluguel">Valor aluguel</label>
                <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={'R$ '}
                    decimalScale={2}
                    fixedDecimalScale
                    className="form-control"
                    value={valorAluguel}
                    onValueChange={(values) => {
                        const { value } = values;
                        onChange({ valorAluguel: value });
                    }}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="detalhes">Descrição <span className="text-danger">*</span></label>
                <textarea className="form-control" required={true} name="detalhes" value={detalhes} onChange={(e) => onChange({ detalhes: e.target.value })} rows={5}></textarea>
            </div>

        </div>
    )
}

export default EtapaDescricao