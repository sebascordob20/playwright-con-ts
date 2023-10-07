import { test, expect, chromium } from '@playwright/test';
import LoginPage from '../pom/swab-labs/loginPage';
import ListProductsPage from '../pom/swab-labs/listsProductsPage';
import SelectProductPage from '../pom/swab-labs/selectProductPage';
import ShoppintCartPage from '../pom/swab-labs/shoppinCartPage';
import FormYourInformationPage from '../pom/swab-labs/formYourInformationPage';
import OverViemPage from '../pom/swab-labs/OverviewPage';

let page;
let browser;
let contextoNavegador;
let loginSaucePagina;
let listaProductosPagina;
let productoSeleccionadoPagina;
let carritoComprasPagina;
let formularioInformacionPersonal;
let overViewPagina;

test.beforeAll(async () => {
  // Iniciar el navegador una vez antes de todas las pruebas
  browser = await chromium.launch();
  contextoNavegador = await browser.newContext();
  page = await contextoNavegador.newPage();
  test.setTimeout(6000)

  //pages
  loginSaucePagina = new LoginPage(page)
  listaProductosPagina = new ListProductsPage(page)
  productoSeleccionadoPagina = new SelectProductPage(page)
  carritoComprasPagina = new ShoppintCartPage(page)
  formularioInformacionPersonal = new FormYourInformationPage(page)
  overViewPagina = new OverViemPage(page)
});


test.describe('Comprar producto de la tienda de amazon', async () => {

  test('Agregar producto al carrito de compras de amazon', async () => {
    
    await test.step('dado que avego hacia la pagina de amazon', async () => {
      await page.goto("https://www.amazon.com/")
      const navarIdiomas = await page.locator("//a[@id='icp-nav-flyout']")
      await navarIdiomas.hover()
      await page.getByRole('link', { name: 'español - ES' }).click();
      await page.waitForTimeout(1500);

    })

    await test.step('cuando busco el producto Alexa', async () => {
      const campoAlexa = await page.$('#twotabsearchtextbox')
      await campoAlexa.fill('Alexa');
      await campoAlexa.press('Enter');
    })

    await test.step('and me dirigo a la segunda pagina de resultados', async () => {
      /*let segundaPagina = await page.locator('//a[.=\'2\']')
      wait segundaPagina.click(); */
      await page.getByLabel('Ir a la página 2').click()
    })
    await test.step('y eligo el tercer producto disponible en el catalogo', async () => {
    

      await page.waitForSelector('.s-line-clamp-2', { state: 'attached' });
      let resultados = await page.locator('.s-line-clamp-2').all()
      let tercerResultado = await resultados[2].locator('.a-link-normal')
      await tercerResultado.click();
      await page.waitForTimeout(3000)
    })


    await test.step('y escogo una cantidad disponible y la agrego al carrito', async () => {
      
      try {
      //page.waitForSelector('#quantity', {State: 'attached'})
      let dropdownCantidad = await page.locator('#quantity')
      await dropdownCantidad.selectOption({value:'4'})
      const btnAgregarCarrito = await page.locator("#add-to-cart-button")
      await btnAgregarCarrito.isVisible()
      await btnAgregarCarrito.click();
      } catch (error) {
      console.log(error, 'El producto no esta disponible para comprar o la cantidad deseada no esta presente en el stock')
      }   
    })



  })

  test('Carrito de compras swag labs', async () => {
    await test.step('dado que me logueo correctamente con mis credenciales al sitio web', async () => {
      await page.goto('https://www.saucedemo.com/')
      await loginSaucePagina.loguearse('standard_user', 'secret_sauce')
    })

    await test.step('cuando eligo un producto de la lista de productos', async () => {
      await listaProductosPagina.elegirUnProducto();
    }

    )
    await test.step('y lo añado al carrito de compras', async () => {
      await productoSeleccionadoPagina.aniadirAlCarrito()
      await carritoComprasPagina.continuarCheckout()
      await formularioInformacionPersonal.enviarInformacionForm('kylian','mbappe','mbappe el mejor de francia')
      await overViewPagina.finalizarOrden()
      await page.waitForTimeout(2000)
    }
    )

  })
}
)

test.afterAll(async () => {
  try {
    await page.close();
    await contextoNavegador.close();
    await browser.close();
  } catch (error) {
    console.log('Hubo un problema al cerrar las paginas y el navegador', error);
  }

})


