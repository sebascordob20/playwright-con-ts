import {Locator, Page} from '@playwright/test'

export default class AmazonPrincipalPage {
readonly pagina: Page
readonly campoBuscadorProducto: Locator;
readonly nabvarIdiomas: Locator;
readonly opcionIdiomaEspaniol: Locator;

constructor(page:Page){
this.pagina = page       
this.nabvarIdiomas = this.pagina.locator("//a[@id='icp-nav-flyout']")
this.opcionIdiomaEspaniol = this.pagina.getByRole('link', {name: 'español - ES'})
this.campoBuscadorProducto = this.pagina.locator('#twotabsearchtextbox')
}
/*
public async elegirIdiomaEspaniol(){
await this.nabvarIdiomas.hover()
await this.pagina.waitForTimeout(1700)
await this.opcionIdiomaEspaniol.click() 
}
*/


public async buscarProducto(nombreProducto:string){
//await this.elegirIdiomaEspaniol()
await this.campoBuscadorProducto.fill(nombreProducto)
await this.campoBuscadorProducto.press('Enter')
}

}