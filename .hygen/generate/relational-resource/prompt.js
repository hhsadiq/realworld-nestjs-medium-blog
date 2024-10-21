module.exports = [
  {
    type: 'confirm',
    name: 'isAddTestCase',
    message: 'Do you want to add test cases and mock data?',
    initial: true,
  },
  {
    type: 'multiselect',
    name: 'functionalities',
    message: 'Select the functionalities you want to include:',
    choices: [
      { name: 'create', value: 'create' },
      { name: 'findAll', value: 'findAll' },
      { name: 'findOne', value: 'findOne' },
      { name: 'update', value: 'update' },
      { name: 'delete', value: 'delete' },
    ],
  },
];
