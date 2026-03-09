"use client";

import { NumericFormat } from "react-number-format";


const maskMoney = (value) => {
    return value.replace(/\D/g, '').replace(/(\d)(\d{2})$/, '$1,$2').replace(/(?=(\d{3})+(?!\d))(\d{3})/g, '$&,');
}

const EtapaDescricao = ({
    titulo,
    localizacao,
    descricao,
    valorVenda,
    valorAluguel,
    onChange    
}) => {
    return (
        <div className="container">

            <div className="mb-4">
                <label htmlFor="titulo">Título</label>
                <input className="form-control" required={true} name="titulo" value={titulo} onChange={(e) => onChange({ titulo: e.target.value })} />
            </div>

            <div className="mb-4">
                <label htmlFor="localizacao">Localização</label>
                <input className="form-control" required={true} name="localizacao" value={localizacao} onChange={(e) => onChange({ localizacao: e.target.value })} />
            </div>

            <div className="mb-4">
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

            <div className="mb-4">
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
                        // value: 1000.00 (para salvar no banco)
                        onChange({ valorAluguel: value });
                    }}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="descricao">Descrição</label>
                <textarea className="form-control" name="descricao" value={descricao} onChange={(e) => onChange({ descricao: e.target.value })} rows={5}></textarea>
            </div>

        </div>
    )
}

export default EtapaDescricao