import {Locator, Page} from '@playwright/test'


export default class SegundaPaginaResultados{
private readonly pagina: Page
private resultados: Locator[]
private tercerResultado: Locator



constructor(page: Page){
this.pagina = page

}

public async elegirTercerProducto(){
await this.pagina.waitForSelector('.s-line-clamp-2', { state: 'attached' });    
this.resultados = await this.pagina.locator('.s-line-clamp-2').all()
this.tercerResultado = await this.resultados[0].locator('.a-link-normal')
await this.tercerResultado.click();
}
    
}