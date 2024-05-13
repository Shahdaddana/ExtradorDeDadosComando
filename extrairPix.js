import { launch } from 'puppeteer'
const url = 'https://energisa.chat.blip.ai/?appKey=ZW5lcmdpc2FzZXJnaXBlZXNlcHJkOmM4MTQxYmQyLWQ0YzMtNGFiNi1hNjBkLTdiZWUyODAyMmZkNQ==';


function esperar(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    })
}

export async function extrairCodigoPix(matricula) {
    const browser = await launch({
        //headless: false,
        //devtools: false
    })
    const page = await browser.newPage();
    const timeout = 5000;
    //page.setDefaultTimeout(timeout);

    await page.setViewport({
        width: 1153,
        height: 955
    });

    await page.goto(url);

    await page.waitForSelector('button.blip-chat-start');
    await page.click('button.blip-chat-start');
    await esperar(8000);

    await page.click('#msg-textarea');
    await page.keyboard.type('1');
    await page.keyboard.press('Enter');
    await esperar(timeout);

    await page.keyboard.type('simplificada');
    await page.keyboard.press('Enter');
    await esperar(timeout);

    await page.keyboard.type('19916388504');
    await page.keyboard.press('Enter');
    await esperar(timeout);

    await page.keyboard.type('unidade consumidora');
    await page.keyboard.press('Enter');
    await esperar(timeout);

    await page.keyboard.type(matricula);
    await page.keyboard.press('Enter');
    await esperar(timeout);

    await page.keyboard.type('sim');
    await page.keyboard.press('Enter');
    await esperar(10000);

    // Extrair o QR code
    const conteudo = await page.content();
    const conteudoCortado = conteudo.substring(conteudo.length - 17000);
    const posicaoPix = conteudoCortado.indexOf("pix");
    const posicaoMaiorAntes = conteudoCortado.lastIndexOf(">", posicaoPix);
    const posicaoMenorDepois = conteudoCortado.indexOf("<", posicaoPix);
    const qrCode = conteudoCortado.substring(posicaoMaiorAntes + 1, posicaoMenorDepois);
    await browser.close();

    if (!qrCode.includes("pix")) {
        return "Erro ao extrair código";
    }
    return qrCode;
}
