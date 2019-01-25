let temperatureScales = {
  celsius: { upper: 100, lower: 0 },
  kelvin: { upper: 373.15, lower: 273.15 },
  fahrenheit: { upper: 212, lower: 32 },
  rankine: { upper: 671.67, lower: 491.67 }
};

class temperature {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

function convertTemp(from, to) {
  return (
    temperatureScales[to.name]["lower"] +
    ((temperatureScales[to.name]["upper"] -
      temperatureScales[to.name]["lower"]) *
      (from.value - temperatureScales[from.name]["lower"])) /
      (temperatureScales[from.name]["upper"] -
        temperatureScales[from.name]["lower"])
  );
}

function myFunction() {
  let selectedTo = document.getElementById("toOptions");
  let selectedToText = selectedTo.options[selectedTo.selectedIndex].text;

  let selectedFrom = document.getElementById("fromOptions");
  let selectedFromText = selectedFrom.options[selectedFrom.selectedIndex].text;

  let inputTemperature = new temperature(
    document.getElementById("fromOptions").value,
    document.getElementById("temperatureInput").value
  );
  let outputTemperature = new temperature(
    document.getElementById("toOptions").value
  );
  document.getElementById("ans").innerHTML = `${
    document.getElementById("temperatureInput").value
  } ${selectedFromText} = ${Math.round(
    convertTemp(inputTemperature, outputTemperature) * 1000,
    3
  ) / 1000} ${selectedToText}`;
}
