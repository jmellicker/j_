const j_ = require('./index')

// firstItemOf
test('firstItemOf comma-delimited', () => {
  expect (j_.firstItemOf('alice,bob')).toBe('alice')
})

test('firstItemOf period-delimited', () => {
  expect (j_.firstItemOf('alice.bob')).toBe('alice')
})

test('firstItemOf slash-delimited', () => {
  expect (j_.firstItemOf('alice/bob')).toBe('alice')
})

test('firstItemOf pipe-delimited', () => {
  expect (j_.firstItemOf('alice|bob')).toBe('alice')
})

// lastItemOf
test('lastItemOf comma-delimited', () => {
  expect (j_.lastItemOf('alice,bob')).toBe('bob')
})

test('lastItemOf period-delimited', () => {
  expect (j_.lastItemOf('alice.bob')).toBe('bob')
})

test('lastItemOf slash-delimited', () => {
  expect (j_.lastItemOf('alice/bob')).toBe('bob')
})

test('lastItemOf pipe-delimited', () => {
  expect (j_.lastItemOf('alice|bob')).toBe('bob')
})

// nthItemOf
test('nthItemOf comma-delimited', () => {
  expect (j_.nthItemOf('alice,bob,charlie,dawn', 3)).toBe('charlie')
})

test('nthItemOf period-delimited', () => {
  expect (j_.nthItemOf('alice.bob.charlie.dawn', 3)).toBe('charlie')
})

test('nthItemOf slash-delimited', () => {
  expect (j_.nthItemOf('alice/bob/charlie/dawn', 3)).toBe('charlie')
})

test('nthItemOf pipe-delimited', () => {
  expect (j_.nthItemOf('alice|bob|charlie|dawn', 3)).toBe('charlie')
})


// allButFirstItemOf
test('allButFirstItemOf comma-delimited', () => {
  expect (j_.allButFirstItemOf('alice,bob,charlie,dawn')).toBe('bob,charlie,dawn')
})

test('allButFirstItemOf period-delimited', () => {
  expect (j_.allButFirstItemOf('alice.bob.charlie.dawn')).toBe('bob.charlie.dawn')
})

test('allButFirstItemOf slash-delimited', () => {
  expect (j_.allButFirstItemOf('alice/bob/charlie/dawn')).toBe('bob/charlie/dawn')
})

test('allButFirstItemOf pipe-delimited', () => {
  expect (j_.allButFirstItemOf('alice|bob|charlie|dawn')).toBe('bob|charlie|dawn')
})


// allButLastItemOf
test('allButLastItemOf comma-delimited', () => {
  expect (j_.allButLastItemOf('alice,bob,charlie,dawn')).toBe('alice,bob,charlie')
})

test('allButLastItemOf period-delimited', () => {
  expect (j_.allButLastItemOf('alice.bob.charlie.dawn')).toBe('alice.bob.charlie')
})

test('allButLastItemOf slash-delimited', () => {
  expect (j_.allButLastItemOf('alice/bob/charlie/dawn')).toBe('alice/bob/charlie')
})

test('allButLastItemOf pipe-delimited', () => {
  expect (j_.allButLastItemOf('alice|bob|charlie|dawn')).toBe('alice|bob|charlie')
})
