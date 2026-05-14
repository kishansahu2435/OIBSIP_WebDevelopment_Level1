const tempInput = document.getElementById('tempInput');
const scale = document.getElementById('scale');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');
const message = document.getElementById('message');

function convertTemperature(value, from) {
  if (from === 'c') {
    return {
      c: value,
      f: (value * 9) / 5 + 32,
      k: value + 273.15
    };
  }

  if (from === 'f') {
    const c = (value - 32) * 5 / 9;
    return {
      c: c,
      f: value,
      k: c + 273.15
    };
  }

  const c = value - 273.15;
  return {
    c: c,
    f: (c * 9) / 5 + 32,
    k: value
  };
}

convertBtn.addEventListener('click', () => {
  const value = parseFloat(tempInput.value);
  if (isNaN(value)) {
    result.textContent = '--';
    message.textContent = 'Please enter a valid number.';
    return;
  }

  const converted = convertTemperature(value, scale.value);
  const display = scale.value === 'c'
    ? `${converted.f.toFixed(2)} °F | ${converted.k.toFixed(2)} K`
    : scale.value === 'f'
    ? `${converted.c.toFixed(2)} °C | ${converted.k.toFixed(2)} K`
    : `${converted.c.toFixed(2)} °C | ${converted.f.toFixed(2)} °F`;

  result.textContent = display;
  message.textContent = 'Conversion completed successfully.';
});