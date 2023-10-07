import { Page, Locator } from '@playwright/test';


export default class SelectProductPage {
    pagina: Page
    private readonly btnAddToCart: Locator
    private readonly iconoShoppingCart: Locator

    constructor(page: Page) {
        this.pagina = page
        this.btnAddToCart = this.pagina.getByRole('button', { name: 'Add to cart' })
        this.iconoShoppingCart = page.locator('.shopping_cart_link')
    }
    async aniadirAlCarrito() {
        await this.btnAddToCart.click()
        await this.iconoShoppingCart.click()
    }


}