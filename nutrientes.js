const alimentos = {
  // Carnes
  "Carne de res magra": { kcal: 250, proteina: 26, grasa: 18, calcio: 15, fosforo: 200 },
  "Carne de pollo": { kcal: 165, proteina: 27, grasa: 4, calcio: 12, fosforo: 190 },
  "Carne de cerdo": { kcal: 242, proteina: 25, grasa: 14, calcio: 10, fosforo: 190 },
  "Carne de conejo": { kcal: 173, proteina: 21, grasa: 8, calcio: 12, fosforo: 180 },
  "Aserrín de cerdo": { kcal: 120, proteina: 16, grasa: 10, calcio: 50, fosforo: 100 },
  "Aserrín de res": { kcal: 130, proteina: 15, grasa: 8, calcio: 45, fosforo: 90 },

  // Huesos carnosos
  "Ala de pollo": { kcal: 203, proteina: 30, grasa: 8, calcio: 200, fosforo: 180 },
  "Cuello de pollo": { kcal: 154, proteina: 18, grasa: 9, calcio: 280, fosforo: 210 },
  "Carcasa de pollo": { kcal: 120, proteina: 17, grasa: 5, calcio: 300, fosforo: 220 },
  "Costilla de ternera": { kcal: 224, proteina: 20, grasa: 15, calcio: 150, fosforo: 170 },

  // Vísceras
  "Hígado de res": { kcal: 135, proteina: 20, grasa: 3.6, calcio: 5, fosforo: 350, vitaminaA: 16800 },
  "Riñón de res": { kcal: 103, proteina: 17, grasa: 3, calcio: 13, fosforo: 250 },
  "Criadillas": { kcal: 142, proteina: 20, grasa: 7, calcio: 10, fosforo: 150 },
  "Pulmón de res": { kcal: 92, proteina: 16, grasa: 3, calcio: 10, fosforo: 120 },
  "Cerebro de res": { kcal: 151, proteina: 12, grasa: 11, calcio: 9, fosforo: 210 },

  // Frutas y verduras
  "Manzana": { kcal: 52, proteina: 0.3, grasa: 0.2, calcio: 6, fosforo: 11 },
  "Zapallo": { kcal: 26, proteina: 1, grasa: 0.1, calcio: 21, fosforo: 44 },
  "Zanahoria": { kcal: 41, proteina: 0.9, grasa: 0.2, calcio: 33, fosforo: 35 },
  "Brócoli": { kcal: 34, proteina: 2.8, grasa: 0.4, calcio: 47, fosforo: 66 },
  "Kion (jengibre)": { kcal: 80, proteina: 1.8, grasa: 0.8, calcio: 16, fosforo: 34 },
  "Albahaca fresca": { kcal: 23, proteina: 3.2, grasa: 0.6, calcio: 177, fosforo: 56 },
  "Pimiento rojo": { kcal: 31, proteina: 1, grasa: 0.3, calcio: 7, fosforo: 26 },
  "Fresas": { kcal: 32, proteina: 0.7, grasa: 0.3, calcio: 16, fosforo: 24 },
  "Maracuyá": { kcal: 97, proteina: 2.2, grasa: 0.4, calcio: 12, fosforo: 68 },
  "Ajo": { kcal: 149, proteina: 6.4, grasa: 0.5, calcio: 181, fosforo: 153 },

  // Carbohidratos
  "Camote cocido": { kcal: 90, proteina: 2, grasa: 0.2, calcio: 30, fosforo: 47 },
  "Avena cocida": { kcal: 71, proteina: 2.5, grasa: 1.4, calcio: 8, fosforo: 77 },
  "Yuca cocida": { kcal: 112, proteina: 1.4, grasa: 0.3, calcio: 16, fosforo: 27 },
  "Arroz cocido": { kcal: 130, proteina: 2.4, grasa: 0.3, calcio: 10, fosforo: 35 },

  // Semillas
  "Chía": { kcal: 486, proteina: 17, grasa: 30, calcio: 631, fosforo: 948 },
  "Semillas de zapallo": { kcal: 559, proteina: 30, grasa: 49, calcio: 46, fosforo: 1174 },
  "Linaza": { kcal: 534, proteina: 18, grasa: 42, calcio: 255, fosforo: 642 },

  // Algas
  "Cochayuyo": { kcal: 43, proteina: 3.5, grasa: 0.5, calcio: 100, fosforo: 90 }
};

function mostrarSeleccionAlimentos() {
  const selector = document.getElementById("seleccion-alimentos");
  selector.innerHTML = "<h3>Selecciona los alimentos usados y sus cantidades (g):</h3>";
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
    if (alimentos[nombre] && cantidad > 0) {
      const factor = cantidad / 100;
      total.kcal += alimentos[nombre].kcal * factor;
      total.proteina += alimentos[nombre].proteina * factor;
      total.grasa += alimentos[nombre].grasa * factor;
      total.calcio += alimentos[nombre].calcio * factor;
      total.fosforo += alimentos[nombre].fosforo * factor;
    }
  });

  const relacionCaP = total.fosforo > 0 ? (total.calcio / total.fosforo).toFixed(2) : "N/A";

  document.getElementById("aporte-nutricional").innerHTML = `
    <h3>Aporte Nutricional Total</h3>
    <ul>
      <li><strong>Energía:</strong> ${total.kcal.toFixed(1)} kcal</li>
      <li><strong>Proteína:</strong> ${total.proteina.toFixed(1)} g</li>
      <li><strong>Grasa:</strong> ${total.grasa.toFixed(1)} g</li>
      <li><strong>Calcio:</strong> ${total.calcio.toFixed(1)} mg</li>
      <li><strong>Fósforo:</strong> ${total.fosforo.toFixed(1)} mg</li>
      <li><strong>Relación Ca:P:</strong> ${relacionCaP}</li>
    </ul>
  `;
}
