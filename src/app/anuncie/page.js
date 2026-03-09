import IntersectionAnimation from "@/components/anim";
import BotaoZap from "@/components/botao-zap";
import Destaques from "@/components/destaques";
import Footer from "@/components/footer";
import FormAnuncie from "@/components/formanuncie";
import Header from "@/components/header";
import Local from "@/components/local";
import Redes from "@/components/redes";



export default function Contato() {

    return (
        <>
            <Header />
            <main>

                <div className="py-5">
                    <FormAnuncie />
                </div>

                
                <Local />
                <Destaques />
                <Redes />
                <BotaoZap />
            </main>

            <Footer />
            <IntersectionAnimation />
        </>
    )
}