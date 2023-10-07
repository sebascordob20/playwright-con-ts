import {Page, Locator} from '@playwright/test'

export default class TercerProductoElegido{
private readonly pagina: Page;
private readonly dropdownCantidad: Locator
private readonly btnAgregarCarrito: Locator

constructor(page:Page){
this.pagina = page

this.dropdownCantidad = this.pagina.locator('#quantity')
this.btnAgregarCarrito =  this.pagina.locator("#add-to-cart-button")
}

public async agregarAlCarritoDeCompras(){
  await this.dropdownCantidad.selectOption({index: 2})
  await this.btnAgregarCarrito.click()
}

}