const j_ = require('../index')

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
test('lastItemOf pipe-delimited', () => {
  expect (j_.lastItemOf('alice')).toBe('alice')
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
test('backtickIfString', () => {
  expect (j_.backtickIfString('hi')).toBe('`hi`')
})

// quoteAndEscapeQuotesIfString
test('quoteAndEscapeQuotesIfString', () => {
  expect (j_.quoteAndEscapeQuotesIfString(`hi`)).toBe("'hi'")
})
test('quoteAndEscapeQuotesIfString', () => {
  expect (j_.quoteAndEscapeQuotesIfString("hi")).toBe("'hi'")
})
test('quoteAndEscapeQuotesIfString', () => {
  expect (j_.quoteAndEscapeQuotesIfString("'hi'")).toBe("'\\'hi\\''") // seems wrong
})

//quoteAndEducateQuotesIfString
test('quoteAndEducateQuotesIfString', () => {
  expect (j_.quoteAndEducateQuotesIfString([`hi`])).toStrictEqual(["hi"])
})
test('quoteAndEducateQuotesIfString', () => {
  expect (j_.quoteAndEducateQuotesIfString('hi')).toStrictEqual("'hi'")
})

//// INDEXES
//indexFromArray
test('indexFromArray', () => {
  const arr = [{me:true, you:true, us:true, them:false}]
  const key = 'us'
  const value = true
  expect (j_.indexFromArray(arr, key, value)).toStrictEqual(0)
})
test('indexFromArray', () => {
  const arr = [{me:true, you:true, us:false, them:false},{me:true, you:true, us:true, them:false}]
  const key = 'us'
  const value = true
  expect (j_.indexFromArray(arr, key, value)).toStrictEqual(1)
})
test('indexFromArray', () => {
  const arr = [{me:true, you:true, us:true, them:false}]
  const key = 'them'
  const value = true
  expect (j_.indexFromArray(arr, key, value)).toStrictEqual(-1)
})

// indexFromArrayID
test('indexFromArrayID', () => {
  const arr = [{id:3, you:true, us:true, them:false},{id:4, you:true, us:true, them:false}]
  const value = 4
  expect (j_.indexFromArrayID(arr, value)).toStrictEqual(1)
})

// queryArrayFirstMatch
test('queryArrayFirstMatch', () => {
  const arr = [{id:3, you:true, us:true, them:false},{id:4, you:true, us:true, them:false}]
  const key = 'them'
  const value = false
  expect (j_.queryArrayFirstMatch(arr, key, value)).toStrictEqual({"id": 3, "them": false, "us": true, "you": true})
})

// queryArrayAllMatches
test('queryArrayAllMatches', () => {
  const arr = [{id:3, you:true, us:true, them:false},{id:4, you:true, us:true, them:false},{id:4, you:true, us:true, them:true}]
  const key = 'them'
  const value = false
  expect (j_.queryArrayAllMatches(arr, key, value)).toStrictEqual([{id:3, you:true, us:true, them:false},{id:4, you:true, us:true, them:false}])
})

// queryArrayAllPartialMatches
test('queryArrayAllPartialMatches', () => {
  const arr = [{you:"yes", us:"yes", them:"no"},{you:"yes", us:"no", them:"no"},{you:"yes", us:"yes", them:"yes"}]
  const key = 'them'
  const value = 'no'
  expect (j_.queryArrayAllPartialMatches(arr, key, value)).toStrictEqual([{you:"yes", us:"yes", them:"no"},{you:"yes", us:"no", them:"no"}])
})

// queryArrayAllUniqueValues
test('queryArrayAllUniqueValues', () => {
  const arr = [{you:"yes", us:"yes", them:"no"},{you:"yes", us:"no", them:"no"},{you:"yes", us:"yes", them:"yes"}]
  const key = 'them'
  expect (j_.queryArrayAllUniqueValues(arr, key)).toStrictEqual(["no", "yes"])
})

// queryArrayOneOfEach
test('queryArrayOneOfEach', () => {
  const arr = [{you:"yes"},{us:"no", them:"no"},{them:"yes"}]
  const key = 'them'
  expect (j_.queryArrayOneOfEach(arr, key)).toStrictEqual({"no": {"them": "no", "us": "no"}, "undefined": {"you": "yes"}, "yes": {"them": "yes"}})
})




// randomAnimal
test('randomAnimal', () => {
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

// uniqID
test('uniqID', () => {
    expect (j_.uniqID('thisIsCool')).toEqual(expect.stringContaining('thisIsCool'))
})

// isPlainObject
test('isPlainObject', () => {
    expect (j_.isPlainObject({ hi: 'there' })).toBe(true)
})

// isPlainObject
test('isPlainObject', () => {
    expect (j_.isPlainObject('hi')).toBe(false)
})

// isPlainObject
test('isPlainObject', () => {
    expect (j_.isPlainObject(123)).toBe(false)
})

// isPlainObject
test('isPlainObject', () => {
    expect (j_.isPlainObject(true)).toBe(false)
})

// isPlainObject
test('isPlainObject', () => {
    expect (j_.isPlainObject([ 1, 2, 3 ])).toBe(false)
})

// educateQuotes
test('educateQuotes', () => {
  expect (j_.educateQuotes('"thing"')).toBe('\"thing\"')
})

// straightenQuotes
test('straightenQuotes', () => {
  expect (j_.straightenQuotes('“thing”')).toBe('\"thing\"')
})
test('straightenQuotes', () => {
  expect (j_.straightenQuotes('‘thing‘')).toBe("'thing'")
})








// randomItemOf
test('randomItemOf', () => {
  const arr = ['hi','there','you']
  const res = j_.randomItemOf('hi,there,you')
  expect(res).toBe(arr.find(r => res === r))
})

// decodeHTML
test('decodeHTML', () => {
  expect (j_.decodeHTML('<script>')).toBe('<script>')
})
test('decodeHTML', () => {
  expect (j_.decodeHTML('&nbsp;')).toBe('&nbsp;')
})
test('decodeHTML', () => {
  expect (j_.decodeHTML('&#222;')).toBe('Þ')
})

// dashify
test('dashify', () => {
  expect (j_.dashify('No Worries')).toBe('no-worries')
})
test('dashify', () => {
  expect (j_.dashify('noWorries')).toBe('no-worries')
})
test('dashify', () => {
  expect (j_.dashify('no-worries')).toBe('no-worries')
})
test('dashify', () => {
  expect (j_.dashify('NoWorries')).toBe('no-worries')
})
test('dashify', () => {
  expect (j_.dashify('No.Worries')).toBe('no-worries')
})
test('dashify', () => {
  expect (j_.dashify('No!Worries')).toBe('no-worries')
})
test('dashify', () => {
  expect (j_.dashify('no_worries')).toBe('no-worries')
})

// toTitleCase
test('toTitleCase', () => {
  expect (j_.toTitleCase('No Worries')).toBe('No Worries')
})
test('toTitleCase', () => {
  expect (j_.toTitleCase('no worries')).toBe('No Worries')
})
test('toTitleCase', () => {
  expect (j_.toTitleCase('no-worries')).toBe('No-worries')
})
test('toTitleCase', () => {
  expect (j_.toTitleCase('no.worries')).toBe('No.worries')
})

// naturalSorter
test('naturalSorter', () => {
  expect (j_.naturalSorter('No','Worries')).toBe(-1)
})
test('naturalSorter', () => {
  expect (j_.naturalSorter('Worries', 'No')).toBe(1)
})
test('naturalSorter', () => {
  expect (j_.naturalSorter('No', 'No')).toBe(0)
})
test('naturalSorter', () => {
  expect (j_.naturalSorter('No')).toBe(void 0)
})

// decodeHtmlEntity
test('decodeHtmlEntity', () => {
  expect (j_.decodeHtmlEntity('&#918;')).toBe('Ζ') // this is Zeta, not 'Z'
})
test('decodeHtmlEntity', () => {
  expect (j_.decodeHtmlEntity('&#8721;')).toBe('∑')
})
test('decodeHtmlEntity passthrough', () => {
  expect (j_.decodeHtmlEntity('&#8721;')).toBe('∑')
})

// formatMonthYear
test('formatMonthYear', () => {
  expect (j_.formatMonthYear('12/2020')).toBe('12/20')
})
test('formatMonthYear', () => {
  expect (j_.formatMonthYear('12-2020')).toBe('12/20')
})
test('formatMonthYear', () => {
  expect (j_.formatMonthYear('12 2020')).toBe('12/20')
})
test('formatMonthYear', () => {
  expect (j_.formatMonthYear('2/2020')).toBe('02/20')
})

// hmsToSeconds
test('hmsToSeconds', () => {
  expect (j_.hmsToSeconds('12:23:14')).toBe(44594)
})
test('hmsToSeconds', () => {
  expect (j_.hmsToSeconds('2:23:14')).toBe(8594)
})
test('hmsToSeconds', () => {
  expect (j_.hmsToSeconds('0:23:14')).toBe(1394)
})
test('hmsToSeconds', () => {
  expect (j_.hmsToSeconds('0:03:14')).toBe(194)
})
test('hmsToSeconds', () => {
  expect (j_.hmsToSeconds('0:00:14.5')).toBe(14.5)
})

// secondsToHms
test('secondsToHms', () => {
  expect (j_.secondsToHms(44594)).toBe('12:23:14')
})
test('secondsToHms', () => {
  expect (j_.secondsToHms(494)).toBe('08:14')
})
test('secondsToHms', () => {
  expect (j_.secondsToHms(54)).toBe('00:54')
})
test('secondsToHms', () => {
  expect (j_.secondsToHms(54.5)).toBe('00:54') // unexpected
})

// objSub
// test('objSub', () => {
//   const obj = {me: true, you: true}
//   const sub = '{{ me: false }}'
//   expect (j_.objSub(obj, sub)).toStrictEqual({"me": true, "you": true})
// })

// luhnCheck
test('luhnCheck', () => {
  expect (j_.luhnCheck('79927398713')).toBe(true)
})
test('luhnCheck', () => {
  expect (j_.luhnCheck('79927398711')).toBe(false)
})
test('luhnCheck', () => {
  expect (j_.luhnCheck('79211')).toBe(false)
})

// cloneObject
test('cloneObject', () => {
  expect (j_.cloneObject('79211')).toBe("79211")
})
test('cloneObject', () => {
  expect (j_.cloneObject({me:'true'})).toStrictEqual({"me": "true"})
})

// convertObj2array
test('convertObj2array', () => {
  const obj = {
    me: {me :1, you:1},
    you: {me:3, you:1},
    us: {me:2, you:1}
  }
  expect (j_.convertObj2array(obj)).toStrictEqual([{"me": 1, "you": 1}, {"me": 3, "you": 1}, {"me": 2, "you": 1}])
})

// arrayOfKeyValuesFromObject
test('arrayOfKeyValuesFromObject', () => {
  const obj = {
    me: {me :1, you:1},
    you: {me:3, you:1},
    us: {me:2, you:1}
  }
  expect (j_.arrayOfKeyValuesFromObject(obj, 'me')).toStrictEqual([1,3,2])
})

// stringOfKeyValuesFromObject
test('stringOfKeyValuesFromObject', () => {
  const obj = {
    me: {me :1, you:1},
    you: {me:3, you:1},
    us: {me:2, you:1}
  }
  expect (j_.stringOfKeyValuesFromObject(obj, 'me')).toStrictEqual("1, 3, 2")
})


// queryObjectFirstMatch
test('queryObjectFirstMatch', () => {
  const obj = {
    me: {me :1, you:1},
    you: {me:3, you:1},
    us: {me:2, you:1}
  }
  expect (j_.queryObjectFirstMatch(obj, 'me', 3)).toStrictEqual({"me": 3, "you": 1})
})
test('queryObjectFirstMatch', () => {
  const obj = {
    me: {me :1, you:1},
    you: {me:3, you:1},
    us: {me:2, you:1}
  }
  expect (j_.queryObjectFirstMatch(obj, 'me', 6)).toStrictEqual(-1)
})
