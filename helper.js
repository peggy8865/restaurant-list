const Handlebars = require('handlebars')

Handlebars.registerHelper('sortUrl', function (keyword, sort) {
  if (keyword) { return `/search?keyword=${keyword}&sort=${sort}` }
  else { return `/?sort=${sort}` }
})

Handlebars.registerHelper('sortText', function (sort) {
  if (!sort) return '排列方式'
  switch (sort) {
    case 'AtoZ': return 'A -> Z';
    case 'ZtoA': return 'Z -> A';
    case 'category': return '類別';
    case 'location': return '地區';
    default: return '無'
  }
})