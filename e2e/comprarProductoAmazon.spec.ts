import { test, chromium } from '@playwright/test'
import AmazonPrincipalPage from '../pom/amazon/AmazonPrincipalPage';
import PrimerResultadoPage from '../pom/amazon/PrimerResultadoPage';
import SegundaPaginaResultados from '../pom/amazon/SegundaPaginaResultados';
import TercerProductoElegido from '../pom/amazon/TercerProductoElegido';
import xlsx from 'node-xlsx';

let navegador;
let page;
let contextoNavegador;

let amazonPaginaPrincipal;
let amazonPaginaPrimerResultado;
let amazonPaginaSegundaResutados;
let paginaTercerProductoElegido;


test.beforeAll(async () => {
    await test.setTimeout(6000)
    navegador = await chromium.launch()
    contextoNavegador = await navegador.newContext();
    page = await contextoNavegador.newPage();

    amazonPaginaPrincipal = new AmazonPrincipalPage(page);
    amazonPaginaPrimerResultado = new PrimerResultadoPage(page)
    amazonPaginaSegundaResutados = new SegundaPaginaResultados(page)
    paginaTercerProductoElegido = new TercerProductoElegido(page)

}
)

test.describe('comprar producto amazon', async () => {

    test('comprar tercer producto pagina2 de amazon', async () => {

        await test.step('primer step', async () => {
            await page.goto('https://www.amazon.com/')
        }
        )

        await test.step('segundo step', async () => {
            await amazonPaginaPrincipal.buscarProducto("Alexa")
        }
        )

        await test.step('tercer step', async () => {
            await amazonPaginaPrimerResultado.irHaciaSegundaPagina()
        }
        )

        await test.step('cuarto step', async () => {
            await amazonPaginaSegundaResutados.elegirTercerProducto()
        }
        )

        await test.step('quinto step', async () => {
            await paginaTercerProductoElegido.agregarAlCarritoDeCompras()
        }
        )
    })

})

test.afterAll(async () => {
    await page.close();
    await contextoNavegador.close();
    await navegador.close();
}
)
