"use client"

import { useState } from "react";

const Postagens = () => {
    const [onPlay, setOnPlay] = useState(-1);
    const videos = [
        "/videos/apogeo.mp4",
        "/videos/florais.mp4",
        "/videos/florais2.mp4"
    ];

    const handlePlay = (i) => {
        if(onPlay >= 0) {
            document.getElementById("video" + onPlay)?.pause();
        }

        if(i !== onPlay) {
            setOnPlay(i);
            document.getElementById("video" + i)?.play();
        } else {
            setOnPlay(-1);
        }
    }

    return (
        <div className="py-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-12 text-center">
                        <span className="hbar" />
                        <h1 className="mb-0">Últimas postagens</h1>
                        <p>Demonstrativos de nossos imoveis de luxo</p>
                    </div>
                </div>
                <div className="row">
                    {
                        videos.map((v, i) => (
                            <div className="col-md-4 text-center mb-4" key={i}>
                                <div className="video-area">
                                    <span className={"video-play" + (i === onPlay ? " video-play-dispose" : "")} onClick={() => handlePlay(i)}>
                                        {i === onPlay ? <i className="far fa-pause-circle" /> : <i className="far fa-play-circle" />}
                                    </span>
                                    <video
                                        className="w-100 d-inline-block"
                                        controls={false}
                                        id={"video" + i}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <source src={v} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Postagens;