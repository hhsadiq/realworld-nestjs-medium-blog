---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
after: "export class"
---

@ApiProperty()
<%= h.inflection.camelize(property, true) %><% if (isOptional) { -%>?<% } -%>: <%= h.getType(type) %>;
