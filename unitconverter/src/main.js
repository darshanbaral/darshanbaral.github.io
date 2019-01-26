const temperatureScales = {
  celsius: { upper: 100, lower: 0, symbol: "&#176;C" },
  kelvin: { upper: 373.15, lower: 273.15, symbol: "K" },
  fahrenheit: { upper: 212, lower: 32, symbol: "&#176;F" },
  rankine: { upper: 671.67, lower: 491.67, symbol: "&#176;R" }
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

let unitList = [];

for (let key in temperatureScales) {
  unitList.push(
    `<option value="${key}">${temperatureScales[key].symbol}</option>`
  );
}

function myFunction() {
  let selectedToText = $("#toOptions option:selected").text();
  let selectedFromText = $("#fromOptions option:selected").text();

  let inputTemperature = new temperature(
    $("#fromOptions").val(),
    $("#temperatureInput").val()
  );
  let outputTemperature = new temperature($("#toOptions").val());

  $("#ans").html(
    `${$("#temperatureInput").val()} ${selectedFromText} = ${Math.round(
      convertTemp(inputTemperature, outputTemperature) * 1000,
      3
    ) / 1000} ${selectedToText}`
  );
}

$(document).ready(function() {
  $("#fromList").html(
    `<select class="form-control" id="fromOptions" onchange="myFunction()">${unitList}</select>`
  );

  $("#toList").html(
    `<select class="form-control" id="toOptions" onchange="myFunction()">${unitList}</select>`
  );
});
