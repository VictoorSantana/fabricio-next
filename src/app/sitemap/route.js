export const dynamic = 'force-dynamic'

import { ImovelService } from "@/shared/services/imovel.service";

export async function GET() {
    const baseUrl = 'https://fabriciomundim.com.br';

    const urls = [
        { loc: "/", priority: "1.0" },
        { loc: "/buscar-imovel", priority: "0.8" },
        { loc: "/sobre", priority: "0.7" },
        { loc: "/contato", priority: "0.5" },
        { loc: "/anuncie", priority: "0.4" },
    ];

    const maps = await ImovelService.getMapSlugs();

    let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    for (const item of urls) {
        xml += `<url><loc>${baseUrl}${item.loc}</loc><priority>${item.priority}</priority></url>`;
    }

    for (const item of maps) {
        xml += `<url><loc>${baseUrl}/detalhes/${item.slug}/${item.id}</loc><priority>0.9</priority></url>`;
    }

    xml += '</urlset>';

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}