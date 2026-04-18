// import { startScheduledJobs } from "@/lib/instagramJob";

import "./theme.css";
import "./anim.css";
import "./custom.css";

// Inicia os cron jobs quando o servidor inicializa
// if (typeof window === 'undefined') { // Garante que só roda no servidor
//   console.log('🚀 Iniciando cron jobs do servidor...');
//   startScheduledJobs();
// }

export const metadata = {
  title: "Fabrício Mundim - Agente imobiliário",
  description: "Agente imobiliário especializado em imóveis de alto padrão em Cuiabá, oferecendo consultoria personalizada para compra, venda e locação. Comprometido em transformar cada negociação em uma experiência segura, sofisticada e de alto valor.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css?v=2" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
              
        <meta name="keywords" content="imóveis, imóveis à venda, imóveis para alugar, comprar imóvel, alugar imóvel, venda de imóveis, aluguel de imóveis, apartamentos à venda, casas à venda, apartamentos para alugar, casas para alugar, imobiliária, corretor de imóveis, corretor imobiliário, consultoria imobiliária, imóveis residenciais, imóveis comerciais, terrenos à venda, lançamentos imobiliários, imóveis financiados, imóveis com escritura, imóveis prontos para morar, imóveis de alto padrão, aluguel residencial, aluguel comercial" />
        <meta name="description" content="Agente imobiliário especializado em imóveis de alto padrão em Cuiabá, oferecendo consultoria personalizada para compra, venda e locação. Comprometido em transformar cada negociação em uma experiência segura, sofisticada e de alto valor." />

        <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/images/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        <title>Fabrício Mundim - Agente imobiliário</title>
      </head>
      <body style={{overflowX : 'hidden'}}>
        {children}
      </body>
    </html>
  );
}
