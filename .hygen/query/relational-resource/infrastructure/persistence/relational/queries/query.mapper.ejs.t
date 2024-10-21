---
to: src/<%= h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/queries/<%= h.inflection.transform(entity, ['underscore', 'dasherize']) %>-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mapper.ts
---
import { <%= entity %><%= name %> } from '@src/<%= h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize']) %>/domain/queries/<%= h.inflection.transform(entity, ['underscore', 'dasherize']) %>-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';

export class <%= entity %><%= name %>Mapper {
  static <%= name %>ToDomain(raw: any): <%= entity %><%= name %> {
    const domainEntity = new <%= entity %><%= name %>();
    return domainEntity;
  }
}
