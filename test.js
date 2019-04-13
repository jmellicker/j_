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
