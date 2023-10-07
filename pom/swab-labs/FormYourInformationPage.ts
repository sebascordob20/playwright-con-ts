import { Page, Locator } from '@playwright/test';

export default class FormYourInformationPage{
    private readonly pagina: Page
    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly postalCode: Locator
    private readonly btnContinue: Locator

constructor(page: Page){
this.pagina = page
this.firstName = this.pagina.getByRole('textbox', { name: 'First Name' })
this.lastName = this.pagina.getByRole('textbox', { name: 'Last Name' })
this.postalCode = this.pagina.getByRole('textbox', { name: 'Zip/Postal Code' })
this.btnContinue = this.pagina.locator('#continue')

}

async enviarInformacionForm(firstNameValue: string, lastNameValue: string, codigoPostalValue: string){
await this.firstName.fill(firstNameValue)
await this.lastName.fill(lastNameValue)
await this.postalCode.fill(codigoPostalValue)
await this.btnContinue.click()
}

}