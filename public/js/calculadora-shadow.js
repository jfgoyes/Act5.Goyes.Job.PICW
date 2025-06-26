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
		// Definimos las variables para mostrar el resultado obtenido y la operación realizada.
        let resultadoCalculadora;
        let valorOperacion;
        // Implementamos una estructura de casos para cada operación, suma, resta, multiplicación y división.
        switch (operacionCalculadora) {
            // Si el usuario selecciona la operación suma, establecemos lo que se va a realizar.
            case 'suma':
                // Hacemos el calculo de la suma como tal.
                resultadoCalculadora = valor_numerico_1 + valor_numerico_2;
                // Mostramos el valor de la operación realizada.
                valorOperacion = `${valor_numerico_1} + ${valor_numerico_2} = ${resultadoCalculadora}`;
                // Terminamos el proceso realizado.
                break;
            // Definimos la operación resta.
            case 'resta':
                // Realizamos el calculo de la operación resta.
                resultadoCalculadora = valor_numerico_1 - valor_numerico_2;
                // Mostramos el valor de la operación realizada.
                valorOperacion = `${valor_numerico_1} - ${valor_numerico_2} = ${resultadoCalculadora}`;
                // Terminamos el proceso realizado en la operación.
                break;
            // Similar a los anteriores casos, definimos la operación multiplicación.
            case 'multiplicacion':
                resultadoCalculadora = valor_numerico_1 * valor_numerico_2;
                valorOperacion = `${valor_numerico_1} * ${valor_numerico_2} = ${resultadoCalculadora}`;
                // Terminamos el proceso realizado en la operación.
                break;
            // Definimos la operación división.
            case 'division':
                // Establecemos una condición para que no se pueda dividir sobre cero.
                if (valor_numerico_2 === 0) {
                    // Mostramos el mensaje de error si se cumple esa condición.
                    resultadoCalculadoraElement.textContent = 'No es posible una división sobre cero.';
                    // Hacemos uso de bootstrap para darle un estilo al mensaje.
                    resultadoCalculadoraElement.className = 'mt-3 alert alert-danger';
                    // No mostramos ningun resultado.
                    return;
                }
                // En caso de que no sea una división sobre cero, procedemos a calcular la operación.
                resultadoCalculadora = valor_numerico_1 / valor_numerico_2;
                // Mostramos el valor de la operación división.
                valorOperacion = `${valor_numerico_1} / ${valor_numerico_2} = ${resultadoCalculadora}`;
                // Terminamos el proceso realizado.
                break;
        }
		
		// Procedemos a mostrar el respectivo resultado de cada operación según sea el caso.
        resultadoCalculadoraElement.textContent = `Resultado obtenido: ${resultadoCalculadora}`;
        // Definimos un estilo para el resultado obtenido.
        resultadoCalculadoraElement.className = 'mt-3 alert alert-success';

        // Definimos un evento totalmente personalizado el cual tiene información respecto a la operación que fue realizada.
        this.dispatchEvent(new CustomEvent('resultadoCalculadoraObtenido', {
            detail: {
                operacionCalculadora: operacionCalculadora, // Especificamos el tipo de operación que fue realizada.
                resultadoCalculadora: resultadoCalculadora, // Especificamos el resultado obtenido en base a la operación.
                expresionObtenida: valorOperacion, // Establecemos la operación realizada.
                fechaOperacion: new Date().toISOString() // Establecemos la fecha que se realizó el cálculo en forma ISO.
            },
            /* Definimos la sentencia bubbles ya que nos permite hacer que el evento personalizado suba por el DOM,
            esto es util ya que de ese modo cualquier elemento superior (padre) puede capturar este evento. */
            bubbles: true,
            /* Establecemos composed ya que nos sirve para que el evento personalizado pueda ser visible desde otras 
            secciones del componente. */
            composed: true
        }));
        // Definimos  la estructura para el historial de las operaciones realizadas en la calculadora.
        // Creamos un elemento del tipo lista li para agregarlo en el historial de la calculadora.
        const item = document.createElement('li');
        // Establecemos el texto del elemento creado de tipo lista, con el valor de la operación.
        item.textContent = valorOperacion;
        // Damos un estilo al elemento mediante bootstrap.
        item.className = 'list-group-item';
        // Hacemos que el elemento lista con la operación se inserte de arriba hacia abajo.
        historialCalculadoraElement.prepend(item);
    }
}

// Definimos el registro para el evento personalizado, de este modo podemos usarlo como una etiqueta HTML.
customElements.define('calculadora-shadow-dom', CalculadoraShadowDom);