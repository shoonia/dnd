export const fetchAll = callback =>
  fetch('/mock.json')
    .then(response => response.json())
    .then(data => callback(null, data))
    .catch(error => callback(error));
