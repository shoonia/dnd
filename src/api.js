const ROOT = (process.env.NODE_ENV === 'production')
  ? 'https://shoonia.github.io/dnd'
  : 'http://localhost:3000';

export const fetchAll = callback =>
  fetch(`${ROOT}/mock.json`)
    .then(response => response.json())
    .then(data => callback(null, data))
    .catch(error => callback(error));
