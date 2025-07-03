function calcularDieta() {
  const peso = parseFloat(document.getElementById("peso").value);
  const edadAnios = parseInt(document.getElementById("edad-anios").value || 0);
  const edadMeses = parseInt(document.getElementById("edad-meses").value || 0);
  const actividad = document.getElementById("actividad").value;
  const etapa = document.getElementById("etapa").value;

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

  const edadTotalMeses = edadAnios * 12 + edadMeses;

  // 1. Cálculo del REM
  const remBase = 110 * Math.pow(peso, 0.75); // fórmula NRC

  let factorActividad = 1.0;

  if (etapa === "cachorro") {
    factorActividad = edadTotalMeses < 4 ? 3 : edadTotalMeses <= 6 ? 2.5 : 2.0;
  } else if (etapa === "gestante") {
    factorActividad = 2.0;
  } else if (etapa === "lactancia") {
    factorActividad = 2.5;
  } else if (etapa === "esterilizado") {
    factorActividad = 1.3;
  } else if (etapa === "senior") {
    factorActividad = 1.2;
  } else {
    // adulto normal
    if (actividad === "baja") factorActividad = 1.4;
    if (actividad === "media") factorActividad = 1.6;
    if (actividad === "alta") factorActividad = 1.8;
  }

  const remFinal = remBase * factorActividad;

  // 2. Cálculo de gramos por día
  let porcentajeRacion = 0.025;
  if (etapa === "cachorro") porcentajeRacion = 0.05;
  else if (etapa === "gestante") porcentajeRacion = 0.04;
  else if (etapa === "lactancia") porcentajeRacion = 0.05;

  const gramosDia = peso * 1000 * porcentajeRacion;

  // 3. Distribución correcta
  const gCarne = gramosDia * (carne / 100);
  const gHueso = gramosDia * (hueso / 100);
  const gVisceras = gramosDia * (visceras / 100);
  const gVegetales = gramosDia * (vegetales / 100);
  const gCarbohidratos = gramosDia * (carbohidratos / 100);

  // 4. Resultado
  const resultado = `
    <h3>Resultados Nutricionales</h3>
    <ul>
      <li><strong>Edad:</strong> ${edadAnios} años y ${edadMeses} meses</li>
      <li><strong>Etapa de vida:</strong> ${etapa}</li>
      <li><strong>REM estimado:</strong> ${remFinal.toFixed(0)} kcal/día</li>
      <li><strong>Ración total estimada:</strong> ${gramosDia.toFixed(0)} g/día (${(porcentajeRacion * 100).toFixed(1)}% del peso)</li>
    </ul>
    <h4>Distribución de la dieta diaria</h4>
    <ul>
      <li>Carne magra: ${gCarne.toFixed(0)} g</li>
      <li>Hueso carnoso: ${gHueso.toFixed(0)} g</li>
      <li>Vísceras: ${gVisceras.toFixed(0)} g</li>
      <li>Vegetales: ${gVegetales.toFixed(0)} g</li>
      <li>Carbohidratos: ${gCarbohidratos.toFixed(0)} g</li>
    </ul>
    <p><em>Estos valores son aproximados. El balance nutricional completo depende de los alimentos específicos usados.</em></p>
  `;

  document.getElementById("resultados").innerHTML = resultado;
}
