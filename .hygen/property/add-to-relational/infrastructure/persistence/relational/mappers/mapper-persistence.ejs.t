---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/mappers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mapper.ts
after: new <%= name %>Entity\(\)
---

<% if (isOptional) { -%>
if (domainEntity.<%= h.inflection.camelize(property, true) %>) {
<% } -%>
persistenceEntity.<%= property %> = domainEntity.<%= h.inflection.camelize(property, true) %>;
<% if (isOptional) { -%>
}
<% } -%>
