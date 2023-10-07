import { Page, Locator } from '@playwright/test';

export default class LoginPage {
  private readonly userName: Locator
  private readonly password: Locator
  private readonly btnLogin: Locator
  private pagina: Page


  constructor(page: Page) {
    this.pagina = page
    this.userName = this.pagina.locator('#user-name')
    this.password = this.pagina.getByRole('textbox', { name: 'Password', exact: true })
    this.btnLogin = this.pagina.locator('//input[@data-test=\'login-button\']')
  }

  async loguearse(user: string, password: string): Promise<void> {
    await this.userName.fill(user)
    await this.password.fill(password)
    await this.btnLogin.click()
  }


}
