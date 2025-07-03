
function calcularDieta() {
    const peso = parseFloat(document.getElementById('peso').value);
    const edad = parseInt(document.getElementById('edad').value);
    const actividad = document.getElementById('actividad').value;
    const carne = parseFloat(document.getElementById('carne').value);
    const hueso = parseFloat(document.getElementById('hueso').value);
    const visceras = parseFloat(document.getElementById('visceras').value);
    const vegetales = parseFloat(document.getElementById('vegetales').value);
    const carbohidratos = parseFloat(document.getElementById('carbohidratos').value || 0);

    const rem_base = 110 * Math.pow(peso, 0.75);
    let factor = actividad === 'baja' ? 1.2 : actividad === 'media' ? 1.5 : 1.8;
    const rem = rem_base * factor;

    const total_dieta = carne + hueso + visceras + vegetales + carbohidratos;
    const gramos_dia = peso * 25; // promedio base en gramos/día

    const resultado = `
        <h3>Resultados</h3>
        <p><strong>REM:</strong> ${rem.toFixed(2)} kcal/día</p>
        <p><strong>Ración Total Estimada:</strong> ${gramos_dia.toFixed(0)} g/día</p>
        <p><strong>Distribución:</strong></p>
        <ul>
            <li>Carne magra: ${(gramos_dia * carne / 100).toFixed(0)} g</li>
            <li>Hueso carnoso: ${(gramos_dia * hueso / 100).toFixed(0)} g</li>
            <li>Vísceras: ${(gramos_dia * visceras / 100).toFixed(0)} g</li>
            <li>Vegetales: ${(gramos_dia * vegetales / 100).toFixed(0)} g</li>
            <li>Carbohidratos: ${(gramos_dia * carbohidratos / 100).toFixed(0)} g</li>
        </ul>
        <p><em>Este es un cálculo base. Para balance completo (Ca, P, vitaminas), usar ingredientes específicos o solicitar análisis detallado.</em></p>
    `;
    document.getElementById('resultados').innerHTML = resultado;
}
