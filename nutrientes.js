
const alimentos = {
  "Carne de res magra": { kcal: 250, proteina: 26, grasa: 18, calcio: 15, fosforo: 200 },
  "Pollo sin piel": { kcal: 165, proteina: 27, grasa: 4, calcio: 12, fosforo: 190 },
  "Hígado de res": { kcal: 135, proteina: 20, grasa: 3.6, calcio: 5, fosforo: 350, vitaminaA: 16800 },
  "Zanahoria": { kcal: 41, proteina: 0.9, grasa: 0.2, calcio: 33, fosforo: 35 },
  "Avena cocida": { kcal: 71, proteina: 2.5, grasa: 1.4, calcio: 8, fosforo: 77 }
};

function mostrarSeleccionAlimentos() {
  const selector = document.getElementById("seleccion-alimentos");
  selector.innerHTML = "";
  for (const alimento in alimentos) {
    selector.innerHTML += `
      <label>
        ${alimento} (g):
        <input type="number" data-nombre="${alimento}" class="alimento-input" value="0" min="0">
      </label>`;
  }
}

function calcularAporteNutricional() {
  let total = { kcal: 0, proteina: 0, grasa: 0, calcio: 0, fosforo: 0 };
  document.querySelectorAll('.alimento-input').forEach(input => {
    const nombre = input.dataset.nombre;
    const cantidad = parseFloat(input.value);
    if (alimentos[nombre]) {
      const factor = cantidad / 100;
      total.kcal += alimentos[nombre].kcal * factor;
      total.proteina += alimentos[nombre].proteina * factor;
      total.grasa += alimentos[nombre].grasa * factor;
      total.calcio += alimentos[nombre].calcio * factor;
      total.fosforo += alimentos[nombre].fosforo * factor;
    }
  });

  document.getElementById("aporte-nutricional").innerHTML = `
    <h3>Aporte Nutricional Total</h3>
    <ul>
      <li>Kcal: ${total.kcal.toFixed(1)} kcal</li>
      <li>Proteína: ${total.proteina.toFixed(1)} g</li>
      <li>Grasa: ${total.grasa.toFixed(1)} g</li>
      <li>Calcio: ${total.calcio.toFixed(1)} mg</li>
      <li>Fósforo: ${total.fosforo.toFixed(1)} mg</li>
      <li>Relación Ca:P: ${(total.calcio / total.fosforo).toFixed(2)}</li>
    </ul>
  `;
}
