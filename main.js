function makeTable(data) {
  let t = document.querySelector('#my-table');
  let headerRow = '<tr>';
  for (let key in data[0]) {
    headerRow += `<th>${key}</th>`;
  }
  headerRow += '</tr>';
  t.innerHTML += headerRow;

  data.forEach((record) => {
    let row = '<tr>';
    for (let val in record) {
      row += `<td>${record[val]}</td>`;
    }
    row += '</tr>';
    t.innerHTML += row;
  });
}
