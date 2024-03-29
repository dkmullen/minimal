function makeTable() {
  let t = document.querySelector('#my-table');
  t.innerHTML = '';
  let headerRow = '<tr class="header">';
  for (let key in tableData[0]) {
    headerRow += `<th class="th">${key}
    <svg class="sort-icon" width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="up" d="M16.9706 8.48528L8.48529 0L9.29832e-06 8.48528H16.9706Z"/>
<path class="down" d="M1.00136e-05 12.4853L8.48529 20.9706L16.9706 12.4853L1.00136e-05 12.4853Z"/>
</svg>
    </th>`;
  }
  headerRow += '</tr>';
  t.innerHTML += headerRow;

  tableData.forEach((record) => {
    let row = `<tr id="row-${record.id}">`;
    for (let val in record) {
      row += `<td>${record[val]}</td>`;
    }
    // Add edit icon
    row += `<td class="edit-cell" id="edit-${record.id}">
    <svg class="edit-icon" width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30.1136 1.88638C28.8976 0.668794 27.2784 0 25.5585 0C23.8401 0 22.2209 0.668794 21.0049 1.88638L2.75065 20.139C2.75065 20.139 2.74905 20.1438 2.74585 20.1454C2.61625 20.2766 2.39545 20.6222 2.32825 20.883L0.0482689 30.0093C-0.0893299 30.5533 0.0722687 31.1325 0.469065 31.5277L0.470665 31.5293L0.472265 31.5309C0.869062 31.9277 1.44506 32.0893 1.99065 31.9533L11.117 29.6701C11.3778 29.6029 11.725 29.3822 11.8546 29.2526C11.8562 29.251 11.861 29.2478 11.861 29.2478L30.1152 10.9967C31.3312 9.77912 32.0016 8.16313 32 6.44155C32 4.72156 31.3312 3.10397 30.1152 1.88638H30.1136ZM19.8577 7.56474L24.4385 12.1455L10.7298 25.8542L6.14902 21.2734L19.8577 7.56474ZM3.80024 28.2014L4.75223 24.403L7.6002 27.2526L3.80024 28.2014ZM27.8544 4.15036C29.0768 5.37435 29.0768 7.50874 27.8544 8.73273L26.704 9.88472L22.1185 5.30076L23.2721 4.15036C24.4961 2.92797 26.6304 2.92637 27.8544 4.15036Z"/>
    </svg>
    </td>`;
    // Add delete icon
    row += `<td class="delete-cell" id="delete-${record.id}">
    <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M6 4H18V21H6z" opacity=".3"/><path d="M11 18H9V7h2V18zM15 18h-2V7h2V18zM4 3H20V5H4z"/><path d="M17 5L14 2 10 2 7 5z"/><path d="M17,22H7c-1.1,0-2-0.9-2-2V3h14v17C19,21.1,18.1,22,17,22z M7,5v15h10V5H7z"/></svg>

    </td>
    </tr>`;
    t.innerHTML += row;
  });
  let headers = document.querySelectorAll('th');
  headers.forEach((header) => {
    if (header.textContent.includes(currentSortKey)) {
      header.classList.add(ascending ? 'asc' : 'desc');
    }
  });
  setTimeout(() => {
    document.querySelectorAll('tr').forEach((row) => {
      row.editIcon = row.querySelector('.edit-cell');
      if (row.editIcon) {
        row.editIcon.addEventListener('click', editRow);
      }
      row.deleteIcon = row.querySelector('.delete-cell');
      if (row.deleteIcon) {
        row.deleteIcon.addEventListener('click', deleteRow);
      }
    });
    headers.forEach((header) => {
      header.addEventListener('click', sortColumn);
    });
  }, 500);
}

let rowId = '';

let currentSortKey = 'id';
let ascending = true;

function sortColumn(e) {
  const sortKey = e.target.textContent.replace(/\s/g, '');
  if (!currentSortKey || sortKey !== currentSortKey) {
    ascending = true;
    // A reset
    tableData.sort((a, b) => (a.index > b.index ? 1 : -1));
    currentSortKey = sortKey;
    tableData.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
  } else {
    tableData.reverse();
    ascending = !ascending;
  }
  makeTable();
}

function editRow() {
  // 'this' is the clicked cell
  rowId = this.id.split('-')[1];
  let selected = tableData.find((o) => o.id === parseInt(rowId));
  document.querySelector('#editModal').style['display'] = 'block';
  for (let item in selected) {
    if (item !== 'id') {
      document.querySelector(`#edit-${item}`).value = selected[item];
    }
  }
}

function doSave() {
  // Fake API POST call
  let obj = {
    id: parseInt(rowId),
    name: document.querySelector('#edit-name').value,
    email: document.querySelector('#edit-email').value,
    title: document.querySelector('#edit-title').value,
  };
  // then, if it succeeds...
  let targetObj = tableData.find((o) => o.id === obj.id);
  for (let item in obj) {
    if (item !== 'id') {
      targetObj[item] = obj[item];
    }
  }
  // Update the stored data object too, via an api post call in prod
  let dataTargetObj = data.find((o) => o.id === obj.id);
  for (let item in obj) {
    if (item !== 'id') {
      dataTargetObj[item] = obj[item];
    }
  }
  makeTable();
  closeModal('#editModal');
}

function deleteRow() {
  // 'this' is the clicked cell
  rowId = this.id.split('-')[1];
  let selected = tableData.find((o) => o.id === parseInt(rowId));
  document.querySelector('#deleteModal').style['display'] = 'block';
  let modal = document.querySelector('.delete-modal-body');
  for (let item in selected) {
    if (item !== 'id') {
      modal.innerHTML += `<div><b>${item.charAt(0).toUpperCase()}${item.slice(
        1
      )}:</b> ${selected[item]}</div>`;
    }
  }
}

function doDelete() {
  // Fake API GET call
  tableData = tableData.filter((o) => o.id !== parseInt(rowId));
  // Update the stored data object too, via an api post call in prod
  data = data.filter((o) => o.id !== parseInt(rowId));
  // then, if it succeeds...
  document.querySelector(`#row-${rowId}`).remove();
  closeModal('#deleteModal');
}

function closeModal(name) {
  let elem = document.querySelector(name);
  elem.style['display'] = 'none';
  rowId = '';
}

function doFilter() {
  let val = document.querySelector('#find').value;
  if (val.length > 2) {
    tableData = data.filter((i) => {
      return (
        i.name.toLowerCase().includes(val.toLowerCase()) ||
        i.email.toLowerCase().includes(val.toLowerCase()) ||
        i.title.toLowerCase().includes(val.toLowerCase())
      );
    });
  } else {
    tableData = structuredClone(data);
  }
  makeTable();
}

let data = [
  {
    id: 1,
    name: 'Cameron Williamson',
    email: 'cameron.wiliamson@example.com',
    title: 'Software Developer',
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    title: 'Project Manager',
  },
  {
    id: 3,
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    title: 'Marketing Coordinator',
  },
  {
    id: 4,
    name: 'Wade Warren',
    email: 'wade.warren@example.com',
    title: 'Software Tester',
  },
  {
    id: 5,
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    title: 'Web Designer',
  },
  {
    id: 6,
    name: 'Kristin Watson',
    email: 'kristin.watson@example.com',
    title: 'Marketing Coordinator',
  },
  {
    id: 7,
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    title: 'Web Designer',
  },
  {
    id: 8,
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    title: 'UI/UX Designer',
  },
  {
    id: 9,
    name: 'Ralph Edwards',
    email: 'ralph.edwards@example.com',
    title: 'Software Tester',
  },
  {
    id: 10,
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    title: 'Ethical Hacker',
  },
  {
    id: 11,
    name: 'Willie Jennings',
    email: 'willie.jennings@example.com',
    title: 'Team Leader',
  },
  {
    id: 12,
    name: 'Neveah Simmons',
    email: 'neveah.simmons@example.com',
    title: 'Team Leader',
  },
  {
    id: 13,
    name: 'Theresa Webb',
    email: 'theresa.webb@example.com',
    title: 'Software Tester',
  },
  {
    id: 14,
    name: 'Debbe Baker',
    email: 'debbe.baker@example.com',
    title: 'Software Developer',
  },
  {
    id: 15,
    name: 'Ronald Richards',
    email: 'ronald.richards@example.com',
    title: 'Software Developer',
  },
  {
    id: 16,
    name: 'Deanna Curtis',
    email: 'deanna.curtis@example.com',
    title: 'Scrum Master',
  },
  {
    id: 17,
    name: 'Felicia Reid',
    email: 'felicia.reed@example.com',
    title: 'Ethical Hacker',
  },
  {
    id: 18,
    name: 'Jessie Alexander',
    email: 'jessie.alexander@example.com',
    title: 'Project Manager',
  },
  {
    id: 19,
    name: 'Sam Smith',
    email: 'sam.smith@example.com',
    title: 'Ethical Hacker',
  },
  {
    id: 20,
    name: 'Eleanor Rigby',
    email: 'eleanor.rigby@example.com',
    title: 'UI/UX Designer',
  },
  {
    id: 21,
    name: 'Devon Lane',
    email: 'devon.lane@example.com',
    title: 'Team Leader',
  },
  {
    id: 22,
    name: 'Guy Hawkins',
    email: 'guy.hawkins@example.com',
    title: 'Team Leader',
  },
  {
    id: 23,
    name: 'Jim Parks',
    email: 'jim.parks@example.com',
    title: 'Ethical Hacker',
  },
  {
    id: 24,
    name: 'Susanne Ford',
    email: 'susanne.ford@example.com',
    title: 'Software Developer Manager',
  },
  {
    id: 25,
    name: 'Kathryn Murphy',
    email: 'kathryn.murphy@example.com',
    title: 'Project Manager',
  },
  {
    id: 26,
    name: 'Cody Fisher',
    email: 'cody.fisher@example.com',
    title: 'Software Developer',
  },
  {
    id: 27,
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    title: 'Software Tester',
  },
  {
    id: 28,
    name: 'Karen MacAfee',
    email: 'karen.macafee@example.com',
    title: 'UI/UX Designer',
  },
  {
    id: 29,
    name: 'Dianne Russell',
    email: 'dianne.russell@example.com',
    title: 'Ethical Hacker',
  },
  {
    id: 30,
    name: 'Bessie Cooper',
    email: 'bessie.cooper@example.com',
    title: 'Scrum Master',
  },
];
let tableData = structuredClone(data);
