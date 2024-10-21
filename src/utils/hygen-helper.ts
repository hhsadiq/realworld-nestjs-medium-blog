const customTypeMapping: { [key: string]: string } = {
  int4: 'number',
  int8: 'number',
  int16: 'number',
  int32: 'number',
  uint8: 'number',
  uint16: 'number',
  uint32: 'number',
  bigint: 'bigint',
  char: 'string',
  longtext: 'string',
  smallint: 'number',
  // Add more custom mappings as needed
};

export const getType = (type: string): string => {
  switch (type) {
    case 'varchar':
    case 'text':
    case 'uuid':
    case 'decimal':
      return 'string';
    case 'int':
    case 'float':
    case 'double':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'timestamp':
    case 'date':
      return 'Date';
    case 'json':
      return 'object';
    default:
      if (customTypeMapping.hasOwnProperty(type)) {
        console.log(customTypeMapping.hasOwnProperty(type));
        return customTypeMapping[type];
      }
      return 'any';
  }
};
