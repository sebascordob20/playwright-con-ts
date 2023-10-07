import { Page, Locator } from '@playwright/test';

export default class ListProductsPage {
    private readonly pagina: Page
    private listaProductos: Locator[]
    private nameProducto: Locator
    private precioProducto: Locator
    private productoAleatorio: Locator
    private nameProductoExpect: string
    private precioProductoExpect: string

    constructor(paginaContexto: Page) {
        this.pagina = paginaContexto
    }

    async definirContextoProductos() {
        this.listaProductos = await this.pagina.locator('.inventory_item').all()
        this.productoAleatorio = this.listaProductos[Math.floor(Math.random() * this.listaProductos.length)]
        this.nameProducto =  this.productoAleatorio.locator('.inventory_item_name')
        this.precioProducto = await this.productoAleatorio.locator('.inventory_item_price')
        this.nameProductoExpect = await this.nameProducto.innerText()
        this.precioProductoExpect = await this.precioProducto.innerText()
    }

    async elegirUnProducto() {
        await this.definirContextoProductos()
        await this.nameProducto.click()
        console.log(this.nameProductoExpect, "\n", this.precioProductoExpect)
    }

geNnameProductoExpect(){
return this.nameProductoExpect;
}

getPrecioProductoExpect(){
return this.precioProductoExpect
}

}