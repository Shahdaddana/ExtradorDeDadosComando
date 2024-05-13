/*
async function abrirChat(website: string): Promise<void>{
    const browser = await launch({
        headless:  false,
        //defaultViewport: true,
        devtools: false
    })
    const page = await browser.newPage()
    await page.goto(website)
    
    await page.evaluate(() => {
        console.log('ola')
    })
    
    //1. Altera o estado de origem, assunto e abre o chat
    const caixaUF = await page.$('#uf')
    await caixaUF.click()
    await page.keyboard.type('SE')
    await page.keyboard.press('Enter')
    const caixaAcao = await page.$('#about')
    await caixaAcao.click()
    await page.keyboard.type('Segunda Via')
    await page.keyboard.press('Enter')
    const falarComGisa = await page.$('button.btn')
    await falarComGisa.click()
}
*/