


const BotaoZap = () => {
    return (
        <a
            id="botao-whatsapp"
            href="https://wa.me/556599401708?text=Olá, gostaria de saber sobre os imoveis."
            title="Abrir conversa no WhatsApp"
            target="_blank"
            className="botao-whatsapp position-fixed shadow rounded-circle justify-content-center align-items-center"
            style={{ display: "flex" }}
        >
            <img
                src="/images/wpp.png"
                alt="ícone de WhatsApp"
                className="d-inline-block"
                style={{ width: 30 }}
            />
        </a>
    )
}

export default BotaoZap;