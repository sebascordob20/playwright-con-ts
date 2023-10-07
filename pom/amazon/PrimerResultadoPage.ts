import { Locator, Page } from '@playwright/test'


export default class PrimerResultadoPage {
    readonly pagina: Page
    private readonly segundaPaginaOpcion: Locator

    constructor(page: Page) {
        this.pagina = page
        this.segundaPaginaOpcion = page.locator('//a[.=\'2\']')
        //this.pagina.getByLabel('Ir a la página 2')
    }

    public async irHaciaSegundaPagina() {
    await this.segundaPaginaOpcion.click()
    }
}