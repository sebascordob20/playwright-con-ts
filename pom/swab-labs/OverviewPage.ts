import { Page, Locator, expect } from '@playwright/test';

export default class OverViemPage{
private readonly pagina: Page
private precioProductoResultado: string
private nombreProductoResultado: string
private readonly bntFinish: Locator

constructor(page: Page){
this.pagina = page
this.bntFinish = page.locator('#finish')
} 
async finalizarOrden(){
    this.precioProductoResultado = await this.pagina.locator('.inventory_item_price').innerText()
    this.nombreProductoResultado = await this.pagina.locator('.inventory_item_name').innerText()    
    console.log(this.precioProductoResultado, '\n', this.nombreProductoResultado)
    await this.bntFinish.click()
}


async validarFlujoCarrito(precioProductoEsperado: string, nompreProuctoEsperado: string) {
    expect(this.precioProductoResultado).toEqual(precioProductoEsperado)
    expect(this.nombreProductoResultado).toEqual(nompreProuctoEsperado)

    await this.pagina.waitForTimeout(2000)
 
     }


}