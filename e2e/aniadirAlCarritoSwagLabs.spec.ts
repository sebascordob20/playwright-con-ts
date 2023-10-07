  import {chromium, test}  from '@playwright/test'
  import LoginPage from '../pom/swab-labs/LoginPage';
import ListsProductsPage   from '../pom/swab-labs/ListsProductsPage';
import SelectProductPage   from '../pom/swab-labs/SelectProductPage';
import ShoppingCartPage from '../pom/swab-labs/ShoppinCartPage';
import FormYourInformationPage from '../pom/swab-labs/FormYourInformationPage';
import OverviewPage from '../pom/swab-labs/OverviewPage';


let browser;
let contextoNavegador;
let pagina;

let paginaLogin;
let paginaListaProductos;
let paginaSeleccionarProducto;
let paginaContinuarAniadiendoProducto;
let paginaInformacionPersonal;
let paginaOverView;




test.beforeAll(async () => {
browser = await chromium.launch()
contextoNavegador = await browser.newContext()
pagina = await contextoNavegador.newPage()
await test.setTimeout(6000)

 paginaLogin = new LoginPage(pagina);
 paginaListaProductos = new ListsProductsPage(pagina);
 paginaSeleccionarProducto= new SelectProductPage(pagina);
 paginaContinuarAniadiendoProducto = new ShoppingCartPage(pagina);
 paginaInformacionPersonal = new FormYourInformationPage(pagina);
 paginaOverView = new OverviewPage(pagina);


})

test.describe('agregar un producto',async() => {
test('comprar un producto disponible', async () => {

await test.step('given yo me logueo correctamente', async () => {
    await pagina.goto('https://www.saucedemo.com/')
await paginaLogin.loguearse('standard_user','secret_sauce');
})

await test.step('when eligo un producto cualquiera del stock', async () => {
await paginaListaProductos.elegirUnProducto()
});

await test.step('and lo agrego al carrito de compras', async () => {
await paginaSeleccionarProducto.aniadirAlCarrito()
})

await test.step('and lleno mi informacion personal para terminar el pedido ', async () => {
await paginaContinuarAniadiendoProducto.continuarCheckout()
await paginaInformacionPersonal.enviarInformacionForm('kylian','mbappe','mbappe el mejor de francia')
})

await test.step('and termino la orden del pedido', async ()=>{
  await paginaOverView.finalizarOrden()

})

await test.step('then el producto se aniade correctamente', async () => { 
  await paginaOverView.validarFlujoCarrito(paginaListaProductos.getPrecioProductoExpect(), paginaListaProductos.geNnameProductoExpect())
})
}) 
    

})

test.afterAll(async () => {
await pagina.close();
await contextoNavegador.close();
await browser.close();

})


