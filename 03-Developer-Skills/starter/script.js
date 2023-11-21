// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celcius',
    value: Number(prompt('Degree celcius..')),
  };

  console.log(measurement);
  //   console.warn(measurement);
  //   console.error(measurement);

  const kelvin = measurement.value + 273;

  return kelvin;
};

console.log(measureKelvin());
