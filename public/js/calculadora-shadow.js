// Definimos la clase CalculadoraShadowDom, haciendo uso de custom element.
class CalculadoraShadowDom extends HTMLElement {
    // Establecemos un constructor con la estructura de la calculadora.
    constructor() {
        super();
        // Establecemos un Shadow DOM abierto que se va a encargar de encapsular los estilos y la estructura como tal.
        this.shadow = this.attachShadow({ mode: 'open'});
        // Definimos toda la interfaz de la calculadora, utilizando Bootstrap.
        this.shadow.innerHTML = `
        <link href="./public/lib/bootstrap-5.3.6-dist/css/bootstrap.min.css" rel="stylesheet">
        <div class=" card p-4" style="width: 400px;">
        <div class="mb-3">
            <label class="from-label">Primer número</label>
            <input type="number" id="numero1" class="form-control" placeholder="Escriba aquí">
        </div>
        <div class="mb-3">
            <label class="from-label">Segundo número</label>
            <input type="number" id="numero2" class="form-control" placeholder="Escriba aquí">
        </div>
        <div class="mb-3">
            <label class="from-label">Operación a realizar</label>
            <select id="operacionCalculadora" class="from-select">
                <option value="suma">Suma</option>
                <option value="resta">Resta</option>
                <option value="multiplicacion">Multiplicación</option>
                <option value="division">División</option>
            </select>
        </div>
        <button id="realizarCalculo" class="btn btn-success w-100">Calcular resultado</button>
        <div class="mt-3 alert alert-secondary" id="resultadoCalculadora" role="alert">
            Resultado obtenido:
        </div>
        <hr>
        <h5>Historial de operaciones:</h5>
        <ul id="historialCalculadora" class="list-group list-group-flush"></ul>
        </div>
        `;
    }
    /* Definimos un evento para realizar el calculo, es decir, si el usuario da click en el botón Calcular resultado,
    entonces que se ejecute la función realizarCalculo */
    connectedCallback() {
        this.shadow.querySelector('#realizarCalculo').addEventListener('click', () => this.funcionRealizarCalculo());
    }
	
	// Definimos la función donde se llevará a cabo cualquier operación o expresión que sea válida o no válida.
    funcionRealizarCalculo() {
        // Establecemos los valores que se van a ingresar, el número 1 y número 2.
        const numero_1 = this.shadow.querySelector('#numero1').value.trim();
        const numero_2 = this.shadow.querySelector('#numero2').value.trim();
        // Definimos variables para las operaciones a realizar, el resultado y el historial de la calculadora.
        const operacionCalculadora = this.shadow.querySelector('#operacionCalculadora').value;
        const resultadoCalculadoraElement = this.shadow.querySelector('#resultadoCalculadora');
        const historialCalculadoraElement = this.shadow.querySelector('#historialCalculadora');
		// Establecemos condiciones para el caso donde el usuario no ingrese ningun valor en los recuadros.
        if (numero_1 === '' || numero_2 === '') {
            // Implementamos el mensaje a mostrar.
            resultadoCalculadoraElement.textContent = 'Es obligatorio ingresar los dos números.'
            // Establecemos el estilo del mensaje mediante bootstrap.
            resultadoCalculadoraElement.className = 'mt-3 alert alert-danger';
            // No mostramos ningun resultado.
            return;
        }
        // Seguidamente, transformamos los números ingresados a valores que son reales.
        const valor_numerico_1 = parseFloat(numero_1);
        const valor_numerico_2 = parseFloat(numero_2);
        // Hacemos una validación para corroborar que los valores ingresados sean números validos y no textos.
        if (isNaN(valor_numerico_1) || isNaN(valor_numerico_2)) {
            // Implementamos el mensaje de error en el caso de que los valores no sean números.
            resultadoCalculadoraElement.textContent = 'Los valores ingresados deben ser números.'
            // Utilizamos bootstrap para darle un estilo al mensaje mostrado.
            resultadoCalculadoraElement.className = 'mt-3 alert alert-danger';
            // No mostramos ningun resultado.
            return;
        }
    }
}

// Definimos el registro para el evento personalizado, de este modo podemos usarlo como una etiqueta HTML.
customElements.define('calculadora-shadow-dom', CalculadoraShadowDom);