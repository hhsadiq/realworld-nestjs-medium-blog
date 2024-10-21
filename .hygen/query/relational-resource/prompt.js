module.exports = [
  {
    type: 'input',
    name: 'entity',
    message: "Entity (e.g. 'Article')",
    validate: (input) => {
      if (!input.trim()) {
        return 'Entity name is required';
      }
      return true;
    },
    format: (input) => input.trim(),
  },
  {
    type: 'input',
    name: 'name',
    message: "Name (e.g. 'ListingQuery')",
    validate: (input) => {
      if (!input.trim()) {
        return 'Name is required';
      }
      return true;
    },
    format: (input) => input.trim(),
  },
];
