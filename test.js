const j_ = require('./index')

// firstItemOf
test('firstItemOf comma-delimited', () => {
  expect (j_.firstItemOf('cat,dog')).toBe('cat')
})

test('firstItemOf period-delimited', () => {
  expect (j_.firstItemOf('cat.dog')).toBe('cat')
})

test('firstItemOf slash-delimited', () => {
  expect (j_.firstItemOf('cat/dog')).toBe('cat')
})

test('firstItemOf pipe-delimited', () => {
  expect (j_.firstItemOf('cat|dog')).toBe('cat')
})

// lastItemOf
test('lastItemOf comma-delimited', () => {
  expect (j_.lastItemOf('cat,dog')).toBe('dog')
})

test('lastItemOf period-delimited', () => {
  expect (j_.lastItemOf('cat.dog')).toBe('dog')
})

test('lastItemOf slash-delimited', () => {
  expect (j_.lastItemOf('cat/dog')).toBe('dog')
})

test('lastItemOf pipe-delimited', () => {
  expect (j_.lastItemOf('alice|dog')).toBe('dog')
})

// nthItemOf
test('nthItemOf comma-delimited', () => {
  expect (j_.nthItemOf('cat,dog,shark,wombat', 3)).toBe('shark')
})

test('nthItemOf period-delimited', () => {
  expect (j_.nthItemOf('cat.dog.shark.wombat', 3)).toBe('shark')
})

test('nthItemOf slash-delimited', () => {
  expect (j_.nthItemOf('cat/dog/shark/wombat', 3)).toBe('shark')
})

test('nthItemOf pipe-delimited', () => {
  expect (j_.nthItemOf('cat|dog|shark|wombat', 3)).toBe('shark')
})


// allButFirstItemOf
test('allButFirstItemOf comma-delimited', () => {
  expect (j_.allButFirstItemOf('cat,dog,shark,wombat')).toBe('dog,shark,wombat')
})

test('allButFirstItemOf period-delimited', () => {
  expect (j_.allButFirstItemOf('cat.dog.shark.wombat')).toBe('dog.shark.wombat')
})

test('allButFirstItemOf slash-delimited', () => {
  expect (j_.allButFirstItemOf('cat/dog/shark/wombat')).toBe('dog/shark/wombat')
})

test('allButFirstItemOf pipe-delimited', () => {
  expect (j_.allButFirstItemOf('cat|dog|shark|wombat')).toBe('dog|shark|wombat')
})


// allButLastItemOf
test('allButLastItemOf comma-delimited', () => {
  expect (j_.allButLastItemOf('cat,dog,shark,wombat')).toBe('cat,dog,shark')
})

test('allButLastItemOf period-delimited', () => {
  expect (j_.allButLastItemOf('cat.dog.shark.wombat')).toBe('cat.dog.shark')
})

test('allButLastItemOf slash-delimited', () => {
  expect (j_.allButLastItemOf('cat/dog/shark/wombat')).toBe('cat/dog/shark')
})

test('allButLastItemOf pipe-delimited', () => {
  expect (j_.allButLastItemOf('cat|dog|shark|wombat')).toBe('cat|dog|shark')
})

// removeSpaces
test('removeSpaces', () => {
  expect (j_.removeSpaces('cat dog shark wombat')).toBe('catdogsharkwombat')
})

// quoteIfString
test('quoteIfString string', () => {
  expect (j_.quoteIfString(`cat`)).toBe(`'cat'`)
})

test('quoteIfString number', () => {
  expect (j_.quoteIfString(808)).toBe(808)
})

// escapeQuotes
test('escapeQuotes with quotes', () => {
  expect (j_.escapeQuotes(`Don't worry "friend"`)).toBe(`Don\\'t worry \\\"friend\\\"`)
})

test('escapeQuotes without quotes', () => {
  expect (j_.escapeQuotes(`Do not worry friend`)).toBe(`Do not worry friend`)
})

// replaceHtmlAttributeQuotes
test('replaceHtmlAttributeQuotes with quotes', () => {
  expect (j_.replaceHtmlAttributeQuotes(`Don't worry "friend"`)).toBe(`Don't worry \"friend\"`)
})

// addAdditionalSingleQuoteIfString
test('addAdditionalSingleQuoteIfString with a quote', () => {
  expect (j_.addAdditionalSingleQuoteIfString(`Don't worry "friend"`)).toBe(`Don''t worry "friend"`)
})

test('addAdditionalSingleQuoteIfString without a quote', () => {
  expect (j_.addAdditionalSingleQuoteIfString(808)).toBe(808)
})

// backtickIfString
test('backtickIfString', () => {
    expect (j_.backtickIfString(`hi`)).toBe('`hi`')
})

// randomAnimal
test('backtickIfString', () => {
    expect (typeof j_.randomAnimal()).toBe('string')
})

// decamelize with default separator
test('decamelize', () => {
    expect (j_.decamelize('thisIsCool')).toBe('this_is_cool')
})

// decamelize with space separator
test('decamelize', () => {
    expect (j_.decamelize('thisIsCool', ' ')).toBe('this is cool')
})
// snakeToCamel
test('snakeToCamel', () => {
    expect (j_.snakeToCamel('this_is_cool', ' ')).toBe('thisIsCool')
})

// camelToSnake
test('camelToSnake', () => {
    expect (j_.camelToSnake('thisIsCool', ' ')).toBe('this_is_cool')
})

// slugify with default separator
test('slugify', () => {
  expect(j_.slugify('foo bar baz')).toBe('foo-bar-baz')
  expect(j_.slugify('foo    bar baz    ')).toBe('foo-bar-baz')
  expect(j_.slugify('   foo bar baz    ')).toBe('foo-bar-baz')
})

test('slugify underscore separator', () => {
  expect(j_.slugify('foo bar baz', '_')).toBe('foo_bar_baz')
  expect(j_.slugify('foo    bar baz    ', '_')).toBe('foo_bar_baz')
  expect(j_.slugify('   foo bar baz    ', '_')).toBe('foo_bar_baz')
})

test('slugify special characters', () => {
  const sets = [
      {to: 'a', from: 'ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ'},
      {to: 'c', from: 'ÇĆĈČ'},
      {to: 'd', from: 'ÐĎĐÞ'},
      {to: 'e', from: 'ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ'},
      {to: 'g', from: 'ĜĞĢǴ'},
      {to: 'h', from: 'ĤḦ'},
      {to: 'i', from: 'ÌÍÎÏĨĪĮİỈỊ'},
      {to: 'j', from: 'Ĵ'},
      {to: 'ij', from: 'Ĳ'},
      {to: 'k', from: 'Ķ'},
      {to: 'l', from: 'ĹĻĽŁ'},
      {to: 'm', from: 'Ḿ'},
      {to: 'n', from: 'ÑŃŅŇ'},
      {to: 'o', from: 'ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ'},
      {to: 'oe', from: 'Œ'},
      {to: 'p', from: 'ṕ'},
      {to: 'r', from: 'ŔŖŘ'},
      {to: 's', from: 'ßŚŜŞŠ'},
      {to: 't', from: 'ŢŤ'},
      {to: 'u', from: 'ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ'},
      {to: 'w', from: 'ẂŴẀẄ'},
      {to: 'x', from: 'ẍ'},
      {to: 'y', from: 'ÝŶŸỲỴỶỸ'},
      {to: 'z', from: 'ŹŻŽ'},
  ];
  sets.forEach(({to, from}) => {
    from.split('').forEach(char => {
      expect(j_.slugify(`foo ${char} bar baz`, '_')).toBe(`foo_${to}_bar_baz`)
    })
  })
})
