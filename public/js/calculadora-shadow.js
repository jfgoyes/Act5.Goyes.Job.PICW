class CalculadoraShadowDom extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});

        this.shadow.innerHTML = `
        <link href="./public/lib/bootstrap-5.3.6-dist/css/bootstrap.min.css" rel="stylesheet">
        <div class=" card p-4" style="width: 400px;">
        <div class="mb-3">
            <label class="from-label">Primer número</label>
            <input type="number" id="numero1" class="from-control" placeholder="Escriba aquí">
        </div>
        <div class="mb-3">
            <label class="from-label">Segundo número</label>
            <input type="number" id="numero2" class="from-control" placeholder="Escriba aquí">
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
}

customElements.define('calculadora-shadow-dom', CalculadoraShadowDom);