---
to: src/<%= h.inflection.transform(entity, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/queries/<%= h.inflection.transform(entity, ['underscore', 'dasherize']) %>-queries.const.ts
unless_exists: true
---

// Add Query Here
