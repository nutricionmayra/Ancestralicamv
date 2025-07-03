function calcularDieta() {
  const peso = parseFloat(document.getElementById("peso").value);
  const edadAnios = parseInt(document.getElementById("edad-anios").value || 0);
  const edadMeses = parseInt(document.getElementById("edad-meses").value || 0);
  const actividad = document.getElementById("actividad").value;
  const etapa = document.getElementById("etapa").value;

  const carne = parseFloat(document.getElementById("carne").value);
  const hueso = parseFloat(document.getElementById("hueso").value);
  const visceras = parseFloat(document.getElementById("visceras").value);
  const vegetales = parseFloat(document.getElementById("vegetales").value);
  const carbohidratos = parseFloat(document.getElementById("carbohidratos").value || 0);

  const totalEtapaEdadMeses = edadAnios * 12 + edadMeses;

  // Calcular REM base
  const remBase = 110 * Math.pow(peso, 0.75);

  // Factor según etapa de vida
  let factor = 1.0;
  if (etapa === "cachorro") {
    factor = totalEtapaEdadMeses <= 6 ? 2.0 : 1.6;
  } else if (etapa === "gestante") {
    factor = 2.0;
  } else if (etapa === "lactancia") {
    factor = 2.5;
  } else if (etapa === "esterilizado") {
    factor = 1.3;
  } else if (etapa === "senior") {
    factor = 1.2;
  } else {
    // Adulto
    if (actividad === "baja") factor = 1.4;
    if (actividad === "media") factor = 1.6;
    if (actividad === "alta") factor = 1.8;
  }

  const rem = remBase * factor;

  // Ración diaria total aproximada (2.5% del peso vivo, ajustado por etapa)
  let porcentajeRacion = 0.025;
  if (etapa === "cachorro") porcentajeRacion = 0.05;
  else if (etapa === "gestante" || etapa === "lactancia") porcentajeRacion = 0.04;

  const gramosDia = peso * 1000 * porcentajeRacion;

  // Composición de la dieta según % ingresado
  const totalDistribucion = carne + hueso + visceras + vegetales + carbohidratos;
  const gCarne = gramosDia * (carne / totalDistribucion);
  const gHueso = gramosDia * (hueso / totalDistribucion);
  const gVisceras = gramosDia * (visceras / totalDistribucion);
  const gVegetales = gramosDia * (vegetales / totalDistribucion);
  const gCarbohidratos = gramosDia * (carbohidratos / totalDistribucion);

  const resultado = `
    <h3>Resultados del Cálculo</h3>
    <p><strong>Edad:</strong> ${edadAnios} años y ${edadMeses} meses</p>
    <p><strong>Etapa de vida:</strong> ${etapa.charAt(0).toUpperCase() + etapa.slice(1)}</p>
    <p><strong>REM estimado:</strong> ${rem.toFixed(2)} kcal/día</p>
    <p><strong>Ración total estimada:</strong> ${gramosDia.toFixed(0)} g/día</p>
    <p><strong>Distribución por alimento:</strong></p>
    <ul>
      <li>Carne magra: ${gCarne.toFixed(0)} g</li>
      <li>Hueso carnoso: ${gHueso.toFixed(0)} g</li>
      <li>Vísceras: ${gVisceras.toFixed(0)} g</li>
      <li>Vegetales: ${gVegetales.toFixed(0)} g</li>
      <li>Carbohidratos: ${gCarbohidratos.toFixed(0)} g</li>
    </ul>
    <p><em>Estos valores deben ser ajustados según análisis nutricional y seguimiento clínico individual.</em></p>
  `;

  document.getElementById("resultados").innerHTML = resultado;
}
