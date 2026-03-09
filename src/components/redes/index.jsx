

const Redes = () => {
    return (
        <div
            className="container mb-5 custom-anim"
            data-anim="slide-in-bottom"
        >
            <div
                className="d-flex gap-5 justify-content-center rounded w-100"
                style={{ flexWrap: "wrap" }}
            >
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/fabr%C3%ADcio-mundim-83789a254/"
                    aria-label="Link para abrir site rede-social LinkedIn"
                    className="d-inline-block no-linkable zoom"
                    style={{ width: 260 }}
                >
                    <div
                        style={{ backgroundColor: "#0a66c2", borderRadius: 4 }}
                        className="text-white px-4 py-2"
                    >
                        <i className="fab fa-linkedin" />
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; LinkedIn
                    </div>
                    <img
                        src="/images/linkedin.jpg"
                        className="d-inline-block w-100"
                        alt="LinkedIn link"
                    />
                </a>
                <a
                    target="_blank"
                    href="https://www.youtube.com/@fabricioamundim"
                    aria-label="Link para abrir site rede-social Youtube"
                    className="d-inline-block no-linkable zoom"
                    style={{ width: 260 }}
                >
                    <div
                        style={{ backgroundColor: "#ff0033", borderRadius: 4 }}
                        className="text-white px-4 py-2"
                    >
                        <i className="fab fa-youtube" />
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Youtube
                    </div>
                    <img
                        src="/images/youtube.jpg"
                        className="d-inline-block w-100"
                        alt="Youtube link"
                    />
                </a>
                <a
                    target="_blank"
                    href="https://www.instagram.com/fabricioamundim/"
                    aria-label="Link para abrir site rede-social Instagram"
                    className="d-inline-block no-linkable zoom"
                    style={{ width: 260 }}
                >
                    <div
                        style={{
                            backgroundImage: "linear-gradient(to right, #D302C5, #FFC700)",
                            borderRadius: 4
                        }}
                        className="text-white px-4 py-2"
                    >
                        <i className="fab fa-instagram" />
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Instagram
                    </div>
                    <img
                        src="/images/instagram.jpg"
                        className="d-inline-block w-100"
                        alt="Instagram link"
                    />
                </a>
                <a
                    target="_blank"
                    href="https://www.facebook.com/people/Fabr%C3%ADcio-Mundim-Neg%C3%B3cios-Imobili%C3%A1rios/100070368399574"
                    aria-label="Link para abrir site rede-social Facebook"
                    className="d-inline-block no-linkable zoom"
                    style={{ width: 260 }}
                >
                    <div
                        style={{ backgroundColor: "#0861f2", borderRadius: 4 }}
                        className="text-white px-4 py-2"
                    >
                        <i className="fab fa-facebook" />
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Facebook
                    </div>
                    <img
                        src="/images/facebook.jpg"
                        className="d-inline-block w-100"
                        alt="Facebook link"
                    />
                </a>
            </div>
        </div>


    )

}

export default Redes;