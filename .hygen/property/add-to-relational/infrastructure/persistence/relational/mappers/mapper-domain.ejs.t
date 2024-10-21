---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/mappers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mapper.ts
after: new <%= name %>\(\)
---

<% if (isOptional) { -%>
if (raw.<%= property %>) {
<% } -%>
domainEntity.<%= h.inflection.camelize(property, true) %> = raw.<%= property %>;
<% if (isOptional) { -%>
}
<% } -%>
