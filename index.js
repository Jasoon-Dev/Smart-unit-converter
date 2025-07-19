const units = {
      length: ["meters", "kilometers", "miles", "feet"],
      weight: ["grams", "kilograms", "pounds", "ounces"],
      temperature: ["celsius", "fahrenheit", "kelvin"],
      area: ["sq_meters", "sq_kilometers", "acres", "hectares"],
      speed: ["mps", "kph", "mph"],
      time: ["seconds", "minutes", "hours", "days"],
      volume: ["liters", "milliliters", "gallons", "cubic_meters"]
    };

    const lengthFactors = {
      meters: 1, kilometers: 0.001, miles: 0.000621371, feet: 3.28084
    };
    const weightFactors = {
      grams: 1, kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274
    };
    const areaFactors = {
      sq_meters: 1, sq_kilometers: 1e-6, acres: 0.000247105, hectares: 0.0001
    };
    const speedFactors = {
      mps: 1, kph: 3.6, mph: 2.23694
    };
    const timeFactors = {
      seconds: 1, minutes: 1 / 60, hours: 1 / 3600, days: 1 / 86400
    };
    const volumeFactors = {
      liters: 1, milliliters: 1000, gallons: 0.264172, cubic_meters: 0.001
    };

    function populateUnits() {
      const type = document.getElementById("type").value;
      const from = document.getElementById("from");
      const to = document.getElementById("to");

      from.innerHTML = "";
      to.innerHTML = "";

      units[type].forEach(unit => {
        const label = unit.replace(/_/g, " ");
        from.innerHTML += `<option value="${unit}">${label}</option>`;
        to.innerHTML += `<option value="${unit}">${label}</option>`;
      });
    }

    function convert() {
      const type = document.getElementById("type").value;
      const from = document.getElementById("from").value;
      const to = document.getElementById("to").value;
      const value = parseFloat(document.getElementById("input").value);
      let result;

      if (isNaN(value)) {
        document.getElementById("result").innerText = "Please enter a number.";
        return;
      }

      switch (type) {
        case "length": result = convertGeneric(value, from, to, lengthFactors); break;
        case "weight": result = convertGeneric(value, from, to, weightFactors); break;
        case "area": result = convertGeneric(value, from, to, areaFactors); break;
        case "speed": result = convertGeneric(value, from, to, speedFactors); break;
        case "time": result = convertGeneric(value, from, to, timeFactors); break;
        case "volume": result = convertGeneric(value, from, to, volumeFactors); break;
        case "temperature": result = convertTemperature(value, from, to); break;
        default: result = "Invalid type";
      }

      document.getElementById("result").innerText =
        `${value} ${from.replace(/_/g, " ")} = ${result} ${to.replace(/_/g, " ")}`;
    }

    function convertGeneric(value, from, to, factorObj) {
      const raw = value / factorObj[from] * factorObj[to];
      return formatResult(raw);
    }

    function convertTemperature(value, from, to) {
      if (from === to) return formatResult(value);

      let celsius;
      if (from === "celsius") celsius = value;
      if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
      if (from === "kelvin") celsius = value - 273.15;

      let result;
      if (to === "celsius") result = celsius;
      if (to === "fahrenheit") result = (celsius * 9 / 5) + 32;
      if (to === "kelvin") result = celsius + 273.15;

      return formatResult(result);
    }

    function formatResult(num) {
      return Number.isInteger(num) ? num : parseFloat(num.toFixed(4));
    }

    // Load initial unit dropdowns
    window.onload = populateUnits;