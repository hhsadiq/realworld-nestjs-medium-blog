---
inject: true
to: src/<%= h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/queries/<%= h.inflection.transform(entity, ['underscore', 'dasherize']) %>-queries.const.ts
after: // Add Query Here
---

const <%= h.inflection.transform(entity, ['underscore']).toUpperCase() %>_<%= h.inflection.transform(name, ['underscore']).toUpperCase() %> = ``;