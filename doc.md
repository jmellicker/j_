# string ops

---

## firstItemOf
### `firstItemOf` comma-delimited
`j_.firstItemOf('cat,dog')` => 'cat'

### `firstItemOf` period-delimited
`j_.firstItemOf('cat.dog')` => 'cat'

### `firstItemOf` slash-delimited
`j_.firstItemOf('cat/dog')` => 'cat'

### `firstItemOf` pipe-delimited
`j_.firstItemOf('cat|dog')` => 'cat'

---

## lastItemOf
### `lastItemOf` comma-delimited
`j_.lastItemOf('cat,dog')` => 'dog'

### `lastItemOf` period-delimited
`j_.lastItemOf('cat.dog')` => 'dog'

### `lastItemOf` slash-delimited
`j_.lastItemOf('cat/dog')` => 'dog'

### `lastItemOf` pipe-delimited
`j_.lastItemOf('alice|dog')` => 'dog'

---

## nthItemOf
### `nthItemOf` comma-delimited
`j_.nthItemOf('cat,dog,shark,wombat', 3)` => 'shark'

### `nthItemOf` period-delimited
`j_.nthItemOf('cat.dog.shark.wombat', 3)` => 'shark'

### `nthItemOf` slash-delimited
`j_.nthItemOf('cat/dog/shark/wombat', 3)` => 'shark'

### `nthItemOf` pipe-delimited
`j_.nthItemOf('cat|dog|shark|wombat', 3)` => 'shark'


---

## allButFirstItemOf
### `allButFirstItemOf` comma-delimited
`j_.allButFirstItemOf('cat,dog,shark,wombat')` => 'dog,shark,wombat'

### `allButFirstItemOf` period-delimited
`j_.allButFirstItemOf('cat.dog.shark.wombat')` => 'dog.shark.wombat'

### `allButFirstItemOf` slash-delimited
`j_.allButFirstItemOf('cat/dog/shark/wombat')` => 'dog/shark/wombat'

### `allButFirstItemOf` pipe-delimited
`j_.allButFirstItemOf('cat|dog|shark|wombat')` => 'dog|shark|wombat'


---

## allButLastItemOf
### `allButLastItemOf` comma-delimited
`j_.allButLastItemOf('cat,dog,shark,wombat')` => 'cat,dog,shark'

### `allButLastItemOf` period-delimited
`j_.allButLastItemOf('cat.dog.shark.wombat')` => 'cat.dog.shark'

### `allButLastItemOf` slash-delimited
`j_.allButLastItemOf('cat/dog/shark/wombat')` => 'cat/dog/shark'

### `allButLastItemOf` pipe-delimited
`j_.allButLastItemOf('cat|dog|shark|wombat')` => 'cat|dog|shark'

---

## removeSpaces
### `removeSpaces`
`j_.removeSpaces('cat dog shark wombat')` => 'catdogsharkwombat'

---

## quoteIfString
### `quoteIfString` string
`j_.quoteIfString(`cat`)` => `'cat'`

### `quoteIfString` number
`j_.quoteIfString(808)` => 808

---

## escapeQuotes
### `escapeQuotes` with quotes
`j_.escapeQuotes(`Don't worry "friend"`)` => `Don\\'t worry \\\"friend\\\"`

### `escapeQuotes` without quotes
`j_.escapeQuotes(`Do not worry friend`)` => `Do not worry friend`

---

## replaceHtmlAttributeQuotes
### `replaceHtmlAttributeQuotes` with quotes
`j_.replaceHtmlAttributeQuotes(`Don't worry "friend"`)` => `Don't worry \"friend\"`

---

## addAdditionalSingleQuoteIfString
### `addAdditionalSingleQuoteIfString` with a quote
`j_.addAdditionalSingleQuoteIfString(`Don't worry "friend"`)` => `Don''t worry "friend"`

### `addAdditionalSingleQuoteIfString` without a quote
`j_.addAdditionalSingleQuoteIfString(808)` => 808

---

## backtickIfString
### `backtickIfString`
`j_.backtickIfString(`hi`)` => '`hi`'

---

## randomAnimal
### `backtickIfString`
`j_.eof j_.randomAnimal()` => 'string'

---

## decamelize with default separator
### `decamelize`
`j_.decamelize('thisIsCool')` => 'this_is_cool'

---

## decamelize with space separator
### `decamelize`
`j_.decamelize('thisIsCool', ' ')` => 'this is cool'
---

## snakeToCamel
### `snakeToCamel`
`j_.snakeToCamel('this_is_cool', ' ')` => 'thisIsCool'

---

## camelToSnake
### `camelToSnake`
`j_.camelToSnake('thisIsCool', ' ')` => 'this_is_cool'

---

## slugify with default separator
### `slugify`
`j_.lugify('foo bar baz')` => 'foo-bar-baz'

### `slugify` underscore separator
`j_.lugify('foo bar baz', '_')` => 'foo_bar_baz'

---

## uniqID
### `uniqID`
`j_.uniqID('myPrefix'))` => myPrefix + '_' + Date.now() + '_' + this.randomAlphaNumeric(8).toLowerCase() + '_' + this.randomColor() + '-' + this.randomAnimal()
    },

---

## isPlainObject
### `isPlainObject`
`j_.isPlainObject({ hi: 'there'` => true

---

## isPlainObject
### `isPlainObject`
`j_.isPlainObject('hi')` => false

---

## isPlainObject
### `isPlainObject`
`j_.isPlainObject(123)` => false

---

## isPlainObject
### `isPlainObject`
`j_.isPlainObject(true)` => false

---

## isPlainObject
### `isPlainObject`
`j_.isPlainObject([ 1, 2, 3 ])` => false

