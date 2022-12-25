function makeTable() {
  let t = document.querySelector('#my-table');
  let headerRow = '<tr class="header">';
  for (let key in data[0]) {
    headerRow += `<th>${key}
    <svg class="sort-icon" width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="sort-active" d="M16.9706 8.48528L8.48529 0L9.29832e-06 8.48528H16.9706Z" fill="#960921"/>
<path d="M1.00136e-05 12.4853L8.48529 20.9706L16.9706 12.4853L1.00136e-05 12.4853Z" fill="#e6e8f5"/>
</svg>
    </th>`;
  }
  headerRow += '</tr>';
  t.innerHTML += headerRow;

  data.forEach((record) => {
    let row = '<tr>';
    for (let val in record) {
      row += `<td>${record[val]}</td>`;
    }
    row += `<td>
    <svg class="edit-icon" width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30.1136 1.88638C28.8976 0.668794 27.2784 0 25.5585 0C23.8401 0 22.2209 0.668794 21.0049 1.88638L2.75065 20.139C2.75065 20.139 2.74905 20.1438 2.74585 20.1454C2.61625 20.2766 2.39545 20.6222 2.32825 20.883L0.0482689 30.0093C-0.0893299 30.5533 0.0722687 31.1325 0.469065 31.5277L0.470665 31.5293L0.472265 31.5309C0.869062 31.9277 1.44506 32.0893 1.99065 31.9533L11.117 29.6701C11.3778 29.6029 11.725 29.3822 11.8546 29.2526C11.8562 29.251 11.861 29.2478 11.861 29.2478L30.1152 10.9967C31.3312 9.77912 32.0016 8.16313 32 6.44155C32 4.72156 31.3312 3.10397 30.1152 1.88638H30.1136ZM19.8577 7.56474L24.4385 12.1455L10.7298 25.8542L6.14902 21.2734L19.8577 7.56474ZM3.80024 28.2014L4.75223 24.403L7.6002 27.2526L3.80024 28.2014ZM27.8544 4.15036C29.0768 5.37435 29.0768 7.50874 27.8544 8.73273L26.704 9.88472L22.1185 5.30076L23.2721 4.15036C24.4961 2.92797 26.6304 2.92637 27.8544 4.15036Z"/>
    </svg>
    </td></tr>`;
    t.innerHTML += row;
  });
}

function editRow() {
  // 'this' is the clicked row
  let selected = data.find((o) => o.id === parseInt(this.cells[0].innerHTML));
  console.log(selected);
}

setTimeout(() => {
  document.querySelectorAll('tr').forEach((row) => {
    row.addEventListener('click', editRow);
  });
}, 500);

const data = [
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
