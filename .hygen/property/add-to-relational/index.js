module.exports = {
  prompt: async ({ prompter, args }) => {
    // Step 1: Ask for entity name
    const { name } = await prompter.prompt({
      type: 'input',
      name: 'name',
      message: "Entity name (e.g. 'User')",
      validate: (input) => {
        if (!input.trim()) {
          return 'Entity name is required';
        }
        return true;
      },
      format: (input) => input.trim(),
    });

    // Step 2: Ask for property name
    const { property } = await prompter.prompt({
      type: 'input',
      name: 'property',
      message: "Property name in snake case (e.g. 'first_name')",
      validate: (input) => {
        if (!input.trim()) {
          return 'Property name is required';
        }
        return true;
      },
      format: (input) => input.trim(),
    });

    // Step 3: Ask if the property is optional
    const { isOptional } = await prompter.prompt({
      type: 'confirm',
      name: 'isOptional',
      message: 'Is this property optional?',
      initial: false,
    });

    // Step 4: Ask for type
    const { type } = await prompter.prompt({
      type: 'select',
      name: 'type',
      message: 'Select type',
      choices: [
        'varchar',
        'text',
        'uuid',
        'int',
        'float',
        'double',
        'decimal',
        'boolean',
        'timestamp',
        'date',
        'json',
        'custom',
      ],
    });

    // Handle custom type
    let customType = '';
    if (type === 'custom') {
      const { customTypeInput } = await prompter.prompt({
        type: 'input',
        name: 'customTypeInput',
        message: 'Enter custom type:',
        validate: (input) => {
          if (!input.trim()) {
            return 'Custom type is required';
          }
          return true;
        },
        format: (input) => input.trim(),
      });
      customType = customTypeInput;
    }

    // Step 5: Ask if the property should be added to DTO
    const { isAddToDto } = await prompter.prompt({
      type: 'confirm',
      name: 'isAddToDto',
      message: 'Add to DTO?',
      initial: true,
    });

    // Return the collected data
    return {
      name,
      property,
      isOptional, // Include the isOptional field
      type: customType || type,
      isAddToDto,
    };
  },
};
