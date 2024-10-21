---
to: src/<%= h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize']) %>/domain/queries/<%= h.inflection.transform(entity, ['underscore', 'dasherize']) %>-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---

export class <%= entity %><%= name %> {
 
}
