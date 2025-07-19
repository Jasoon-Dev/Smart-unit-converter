const unitMap = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  weight: {
    gram: 1,
    kilogram: 1000,
    milligram: 0.001,
    pound: 453.592,
    ounce: 28.3495
  },
  temperature: "special",
  area: {
    "square meter": 1,
    "square kilometer": 1e6,
    "square centimeter": 0.0001,
    "square millimeter": 0.000001,
    hectare: 10000,
    acre: 4046.86
  },
  speed: {
    "meter per second": 1,
    "kilometer per hour": 0.277778,
    "mile per hour": 0.44704,
    "foot per second": 0.3048
  },
  time: {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    "cubic meter": 1000,
    "cubic centimeter": 0.001,
    gallon: 3.78541,
    pint: 0.473176
  },
  "Digital Storage": {
    bit: 1,
    byte: 8,
    KB: 8192,
    MB: 8.388e6,
    GB: 8.59e9,
    TB: 8.796e12
  }
};

function populateUnits() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  from.innerHTML = "";
  to.innerHTML = "";

  const units = unitMap[type];
  if (units === "special") {
    const tempUnits = ["Celsius", "Fahrenheit", "Kelvin"];
    tempUnits.forEach(unit => {
      let option1 = new Option(unit, unit);
      let option2 = new Option(unit, unit);
      from.add(option1);
      to.add(option2);
    });
  } else {
    for (let unit in units) {
      let option1 = new Option(unit, unit);
      let option2 = new Option(unit, unit);
      from.add(option1);
      to.add(option2);
    }
  }
}

function convert() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const input = parseFloat(document.getElementById("input").value);
  const result = document.getElementById("result");

  if (isNaN(input)) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  if (type === "temperature") {
    let output;
    if (from === to) {
      output = input;
    } else if (from === "Celsius" && to === "Fahrenheit") {
      output = (input * 9/5) + 32;
    } else if (from === "Celsius" && to === "Kelvin") {
      output = input + 273.15;
    } else if (from === "Fahrenheit" && to === "Celsius") {
      output = (input - 32) * 5/9;
    } else if (from === "Fahrenheit" && to === "Kelvin") {
      output = (input - 32) * 5/9 + 273.15;
    } else if (from === "Kelvin" && to === "Celsius") {
      output = input - 273.15;
    } else if (from === "Kelvin" && to === "Fahrenheit") {
      output = (input - 273.15) * 9/5 + 32;
    } else {
      output = "Invalid conversion";
    }
    result.textContent = `${input} ${from} = ${output} ${to}`;
  } else {
    const factorFrom = unitMap[type][from];
    const factorTo = unitMap[type][to];
    const output = input * (factorFrom / factorTo);
    result.textContent = `${input} ${from} = ${output} ${to}`;
  }
}

// Auto-populate units on page load
window.onload = populateUnits;
