// Variables globales
let gramosDiaGlobal = 0;
let remFinalGlobal = 0;

function calcularRacionBase() {
  const peso = parseFloat(document.getElementById("peso").value);
  const edadAnios = parseInt(document.getElementById("edad-anios").value || 0);
  const edadMeses = parseInt(document.getElementById("edad-meses").value || 0);
  const actividad = document.getElementById("actividad").value;
  const etapa = document.getElementById("etapa").value;

  if (isNaN(peso) || peso <= 0) {
    alert("Por favor, introduce un peso válido.");
    return;
  }

  const edadTotalMeses = edadAnios * 12 + edadMeses;
  const remBase = 110 * Math.pow(peso, 0.75);

  let factorActividad = 1.0;
  let porcentajeRacion = 0.025; // % del peso vivo

  if (etapa === "cachorro") {
    factorActividad = edadTotalMeses < 4 ? 3 : edadTotalMeses <= 6 ? 2.5 : 2.0;
    porcentajeRacion = 0.05;
  } else if (etapa === "gestante") {
    factorActividad = 2.0;
    porcentajeRacion = 0.04;
  } else if (etapa === "lactancia") {
    factorActividad = 2.5;
    porcentajeRacion = 0.05;
  } else if (etapa === "esterilizado") {
    factorActividad = 1.3;
    porcentajeRacion = 0.02;
  } else if (etapa === "senior") {
    factorActividad = 1.2;
    porcentajeRacion = 0.02;
  } else {
    // Adulto entero
    if (actividad === "baja") factorActividad = 1.4;
    if (actividad === "media") factorActividad = 1.6;
    if (actividad === "alta") factorActividad = 1.8;
    porcentajeRacion = 0.025;
  }

  const remFinal = remBase * factorActividad;
  const gramosDia = peso * 1000 * porcentajeRacion;

  // Guardamos para usar luego
  gramosDiaGlobal = gramosDia;
  remFinalGlobal = remFinal;

  document.getElementById("resultados").innerHTML = `
    <h3>Resultados Nutricionales</h3>
    <ul>
      <li><strong>Edad:</strong> ${edadAnios} años y ${edadMeses} meses</li>
      <li><strong>Etapa:</strong> ${etapa}</li>
      <li><strong>REM:</strong> ${remFinal.toFixed(0)} kcal/día</li>
      <li><strong>Ración diaria estimada:</strong> ${gramosDia.toFixed(0)} g</li>
    </ul>
    <p><em>Ahora ingresa los porcentajes de ingredientes para calcular la distribución en gramos.</em></p>
  `;
}

function calcularDistribucion() {
  const carne = parseFloat(document.getElementById("carne").value || 0);
  const hueso = parseFloat(document.getElementById("hueso").value || 0);
  const visceras = parseFloat(document.getElementById("visceras").value || 0);
  const vegetales = parseFloat(document.getElementById("vegetales").value || 0);
  const carbohidratos = parseFloat(document.getElementById("carbohidratos").value || 0);

  const totalPorcentaje = carne + hueso + visceras + vegetales + carbohidratos;

  if (totalPorcentaje !== 100) {
    alert("La suma de los porcentajes debe ser exactamente 100%");
    return;
  }

  if (gramosDiaGlobal <= 0) {
    alert("Primero debes calcular la ración base.");
    return;
  }

  const gCarne = gramosDiaGlobal * (carne / 100);
  const gHueso = gramosDiaGlobal * (hueso / 100);
  const gVisceras = gramosDiaGlobal * (visceras / 100);
  const gVegetales = gramosDiaGlobal * (vegetales / 100);
  const gCarbohidratos = gramosDiaGlobal * (carbohidratos / 100);

  const resultado = `
    <h4>Distribución diaria en gramos</h4>
    <ul>
      <li>Carne magra: ${gCarne.toFixed(0)} g</li>
      <li>Hueso carnoso: ${gHueso.toFixed(0)} g</li>
      <li>Vísceras: ${gVisceras.toFixed(0)} g</li>
      <li>Vegetales: ${gVegetales.toFixed(0)} g</li>
      <li>Carbohidratos: ${gCarbohidratos.toFixed(0)} g</li>
    </ul>
    <p><em>Estos valores son estimados. Para balancear nutrientes, usa la base de datos alimentaria.</em></p>
  `;

  document.getElementById("resultados").innerHTML += resultado;
}
