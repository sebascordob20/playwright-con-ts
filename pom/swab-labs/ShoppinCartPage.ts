import { Page, Locator } from '@playwright/test';

export default class ShoppintCartPage{
private readonly pagina: Page
private readonly btnCheckOut: Locator
private readonly btnContinueShopping: Locator

constructor(public page: Page) {
this.pagina = page
this.btnCheckOut = this.pagina.getByRole('button', { name: 'Checkout', exact: true })
this.btnContinueShopping = this.pagina.getByRole('button', { name: 'Go back Continue Shopping', exact: true})
}

async continuarCheckout(){
 await this.btnCheckOut.click()  
}

async continuarAniadiendoProductos(){
await this.btnContinueShopping.click()
}

}