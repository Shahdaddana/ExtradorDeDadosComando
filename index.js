import { launch } from 'puppeteer';
import { extrairCodigoPix } from './extrairPix.js';
const website = 'https://energisa.chat.blip.ai/?appKey=ZW5lcmdpc2FzZXJnaXBlZXNlcHJkOmM4MTQxYmQyLWQ0YzMtNGFiNi1hNjBkLTdiZWUyODAyMmZkNQ==';



async function esperar(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time);
    });
}

async function receberCodigoPix(matricula) {
    const browser = await launch({
        headless: false,
        // defaultViewport: false,
        devtools: false
    })
    const page = await browser.newPage()
    await page.goto(website)
    
    await page.waitForSelector('button.blip-chat-start');
    await page.click('button.blip-chat-start');

    await esperar(8000);
    await page.keyboard.type('1');
    await page.keyboard.press('Enter');

    await esperar(8000);
    await page.keyboard.type('simplificada');
    await page.keyboard.press('Enter');

    await esperar(5000);
    await page.keyboard.type('89751123062');
    await page.keyboard.press('Enter');

    await esperar(5000);
    await page.keyboard.type('unidade consumidora');
    await page.keyboard.press('Enter');

    await esperar(5000);
    await page.keyboard.type(matricula);
    await page.keyboard.press('Enter');

    await esperar(5000);
    await page.keyboard.type('sim');
    await page.keyboard.press('Enter');

    await esperar(10000);
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

async function receberCodigoPixLimite(matricula) {
    const tempoLimite = 120000; // 2 minutos
    try {
        const resultado = await Promise.race([
            receberCodigoPix(matricula),
            new Promise<string>((resolve, reject) => {
                setTimeout(() => {
                    reject("Tempo limite excedido!");
                }, tempoLimite);
            })
        ]);
        return resultado;
    } catch (error) {
        return "Erro";
    }
}

async function main() {
    if (process.argv[2]) {
        const matricula = process.argv[2];

        try {
            console.log('Caso queira encerrar, aperte Control + C, digite sim e aperte Enter');
            console.log('Processando...');
            const qrCode = await extrairCodigoPix(matricula);
            console.log('Código Pix:', qrCode);
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    } else {
        console.log('Erro: Número de matrícula não fornecido');
    }
}

main();