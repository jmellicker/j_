const j_ = require('../index')

// String operations tests
describe('String Operations', () => {
  // firstItemOf
  describe('firstItemOf', () => {
    test('comma-delimited', () => {
      expect(j_.firstItemOf('cat,dog')).toBe('cat')
    })

    test('period-delimited', () => {
      expect(j_.firstItemOf('cat.dog')).toBe('cat')
    })

    test('slash-delimited', () => {
      expect(j_.firstItemOf('cat/dog')).toBe('cat')
    })

    test('pipe-delimited', () => {
      expect(j_.firstItemOf('cat|dog')).toBe('cat')
    })
  })

  // lastItemOf
  describe('lastItemOf', () => {
    test('comma-delimited', () => {
      expect(j_.lastItemOf('cat,dog')).toBe('dog')
    })

    test('period-delimited', () => {
      expect(j_.lastItemOf('cat.dog')).toBe('dog')
    })

    test('slash-delimited', () => {
      expect(j_.lastItemOf('cat/dog')).toBe('dog')
    })

    test('pipe-delimited', () => {
      expect(j_.lastItemOf('alice|dog')).toBe('dog')
    })

    test('single item', () => {
      expect(j_.lastItemOf('alice')).toBe('alice')
    })
  })

  // nthItemOf
  describe('nthItemOf', () => {
    test('comma-delimited', () => {
      expect(j_.nthItemOf('cat,dog,shark,wombat', 3)).toBe('shark')
    })

    test('period-delimited', () => {
      expect(j_.nthItemOf('cat.dog.shark.wombat', 3)).toBe('shark')
    })

    test('slash-delimited', () => {
      expect(j_.nthItemOf('cat/dog/shark/wombat', 3)).toBe('shark')
    })

    test('pipe-delimited', () => {
      expect(j_.nthItemOf('cat|dog|shark|wombat', 3)).toBe('shark')
    })
  })

  // allButFirstItemOf
  describe('allButFirstItemOf', () => {
    test('comma-delimited', () => {
      expect(j_.allButFirstItemOf('cat,dog,shark,wombat')).toBe('dog,shark,wombat')
    })

    test('period-delimited', () => {
      expect(j_.allButFirstItemOf('cat.dog.shark.wombat')).toBe('dog.shark.wombat')
    })

    test('slash-delimited', () => {
      expect(j_.allButFirstItemOf('cat/dog/shark/wombat')).toBe('dog/shark/wombat')
    })

    test('pipe-delimited', () => {
      expect(j_.allButFirstItemOf('cat|dog|shark|wombat')).toBe('dog|shark|wombat')
    })
  })

  // allButLastItemOf
  describe('allButLastItemOf', () => {
    test('comma-delimited', () => {
      expect(j_.allButLastItemOf('cat,dog,shark,wombat')).toBe('cat,dog,shark')
    })

    test('period-delimited', () => {
      expect(j_.allButLastItemOf('cat.dog.shark.wombat')).toBe('cat.dog.shark')
    })

    test('slash-delimited', () => {
      expect(j_.allButLastItemOf('cat/dog/shark/wombat')).toBe('cat/dog/shark')
    })

    test('pipe-delimited', () => {
      expect(j_.allButLastItemOf('cat|dog|shark|wombat')).toBe('cat|dog|shark')
    })
  })

  // removeSpaces
  test('removeSpaces', () => {
    expect(j_.removeSpaces('cat dog shark wombat')).toBe('catdogsharkwombat')
  })

  // randomItemOf
  test('randomItemOf', () => {
    const arr = ['hi','there','you']
    const res = j_.randomItemOf('hi,there,you')
    expect(arr.includes(res)).toBe(true)
  })

  // String formatting tests
  describe('String formatting', () => {
    // quoteIfString
    test('quoteIfString string', () => {
      expect(j_.quoteIfString(`cat`)).toBe(`'cat'`)
    })

    test('quoteIfString number', () => {
      expect(j_.quoteIfString(808)).toBe(808)
    })

    // escapeQuotes
    test('escapeQuotes with quotes', () => {
      expect(j_.escapeQuotes(`Don't worry "friend"`)).toBe(`Don\\'t worry \\\"friend\\\"`)
    })

    test('escapeQuotes without quotes', () => {
      expect(j_.escapeQuotes(`Do not worry friend`)).toBe(`Do not worry friend`)
    })

    // replaceHtmlAttributeQuotes
    test('replaceHtmlAttributeQuotes with quotes', () => {
      expect(j_.replaceHtmlAttributeQuotes(`Don't worry "friend"`)).toBe(`Don't worry \"friend\"`)
    })

    // addAdditionalSingleQuoteIfString
    test('addAdditionalSingleQuoteIfString with a quote', () => {
      expect(j_.addAdditionalSingleQuoteIfString(`Don't worry "friend"`)).toBe(`Don''t worry "friend"`)
    })

    test('addAdditionalSingleQuoteIfString without a quote', () => {
      expect(j_.addAdditionalSingleQuoteIfString(808)).toBe(808)
    })

    // backtickIfString
    test('backtickIfString with template literal', () => {
      expect(j_.backtickIfString(`hi`)).toBe('`hi`')
    })

    test('backtickIfString with string', () => {
      expect(j_.backtickIfString('hi')).toBe('`hi`')
    })

    // quoteAndEscapeQuotesIfString
    describe('quoteAndEscapeQuotesIfString', () => {
      test('with template literal', () => {
        expect(j_.quoteAndEscapeQuotesIfString(`hi`)).toBe("'hi'")
      })

      test('with string', () => {
        expect(j_.quoteAndEscapeQuotesIfString("hi")).toBe("'hi'")
      })

      test('with quoted string', () => {
        expect(j_.quoteAndEscapeQuotesIfString("'hi'")).toBe("'\\'hi\\''")
      })
    })

    // quoteAndEducateQuotesIfString
    describe('quoteAndEducateQuotesIfString', () => {
      test('with array', () => {
        expect(j_.quoteAndEducateQuotesIfString([`hi`])).toStrictEqual(["hi"])
      })

      test('with string', () => {
        expect(j_.quoteAndEducateQuotesIfString('hi')).toStrictEqual("'hi'")
      })
    })
  })

  // Case conversion tests
  describe('Case conversion', () => {
    // decamelize
    test('decamelize with default separator', () => {
      expect(j_.decamelize('thisIsCool')).toBe('this_is_cool')
    })

    test('decamelize with space separator', () => {
      expect(j_.decamelize('thisIsCool', ' ')).toBe('this is cool')
    })

    // snakeToCamel
    test('snakeToCamel', () => {
      expect(j_.snakeToCamel('this_is_cool')).toBe('thisIsCool')
    })

    // camelToSnake
    test('camelToSnake basic', () => {
      expect(j_.camelToSnake('thisIsCool')).toBe('this_is_cool')
    })

    test('camelToSnake with numbers', () => {
      expect(j_.camelToSnake('stringWith234Numbers')).toBe('string_with234_numbers')
    })

    // toTitleCase
    describe('toTitleCase', () => {
      test('already title case', () => {
        expect(j_.toTitleCase('No Worries')).toBe('No Worries')
      })

      test('lowercase', () => {
        expect(j_.toTitleCase('no worries')).toBe('No Worries')
      })

      test('with dash', () => {
        expect(j_.toTitleCase('no-worries')).toBe('No-worries')
      })

      test('with period', () => {
        expect(j_.toTitleCase('no.worries')).toBe('No.worries')
      })
    })
  })

  // Slugify tests
  describe('slugify', () => {
    test('with default separator', () => {
      expect(j_.slugify('foo bar baz')).toBe('foo-bar-baz')
      expect(j_.slugify('foo    bar baz    ')).toBe('foo-bar-baz')
      expect(j_.slugify('   foo bar baz    ')).toBe('foo-bar-baz')
    })

    test('with underscore separator', () => {
      expect(j_.slugify('foo bar baz', '_')).toBe('foo_bar_baz')
      expect(j_.slugify('foo    bar baz    ', '_')).toBe('foo_bar_baz')
      expect(j_.slugify('   foo bar baz    ', '_')).toBe('foo_bar_baz')
    })

    test('with special characters', () => {
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
      ]
      sets.forEach(({to, from}) => {
        from.split('').forEach(char => {
          expect(j_.slugify(`foo ${char} bar baz`, '_')).toBe(`foo_${to}_bar_baz`)
        })
      })
    })
  })

  // HTML related tests
  describe('HTML operations', () => {
    // decodeHTML
    test('decodeHTML script tag', () => {
      expect(j_.decodeHTML('<script>')).toBe('<script>')
    })

    test('decodeHTML nbsp', () => {
      expect(j_.decodeHTML('&nbsp;')).toBe('&nbsp;')
    })

    test('decodeHTML numeric entity', () => {
      expect(j_.decodeHTML('&#222;')).toBe('Þ')
    })

    // decodeHtmlEntity
    test('decodeHtmlEntity zeta', () => {
      expect(j_.decodeHtmlEntity('&#918;')).toBe('Ζ')
    })

    test('decodeHtmlEntity sum', () => {
      expect(j_.decodeHtmlEntity('&#8721;')).toBe('∑')
    })
  })

  // dashify
  describe('dashify', () => {
    test('with spaces', () => {
      expect(j_.dashify('No Worries')).toBe('no-worries')
    })

    test('camelCase', () => {
      expect(j_.dashify('noWorries')).toBe('no-worries')
    })

    test('already dashed', () => {
      expect(j_.dashify('no-worries')).toBe('no-worries')
    })

    test('PascalCase', () => {
      expect(j_.dashify('NoWorries')).toBe('no-worries')
    })

    test('with period', () => {
      expect(j_.dashify('No.Worries')).toBe('no-worries')
    })

    test('with exclamation', () => {
      expect(j_.dashify('No!Worries')).toBe('no-worries')
    })

    test('with underscore', () => {
      expect(j_.dashify('no_worries')).toBe('no-worries')
    })
  })

  // educateQuotes and straightenQuotes
  describe('Quote formatting', () => {
    test('educateQuotes', () => {
      expect(j_.educateQuotes('"thing"')).toBe('\"thing\"')
    })

    test('straightenQuotes double', () => {
      expect(j_.straightenQuotes('"thing"')).toBe('\"thing\"')
    })

    test('straightenQuotes single', () => {
      expect(j_.straightenQuotes("'thing'")).toBe("'thing'")
    })
  })

  // Time formatting tests
  describe('Time formatting', () => {
    // formatMonthYear
    test('formatMonthYear slash format', () => {
      expect(j_.formatMonthYear('12/2020')).toBe('12/20')
    })

    test('formatMonthYear dash format', () => {
      expect(j_.formatMonthYear('12-2020')).toBe('12/20')
    })

    test('formatMonthYear space format', () => {
      expect(j_.formatMonthYear('12 2020')).toBe('12/20')
    })

    test('formatMonthYear single digit month', () => {
      expect(j_.formatMonthYear('2/2020')).toBe('02/20')
    })

    // hmsToSeconds
    test('hmsToSeconds hours minutes seconds', () => {
      expect(j_.hmsToSeconds('12:23:14')).toBe(44594)
    })

    test('hmsToSeconds single digit hour', () => {
      expect(j_.hmsToSeconds('2:23:14')).toBe(8594)
    })

    test('hmsToSeconds zero hour', () => {
      expect(j_.hmsToSeconds('0:23:14')).toBe(1394)
    })

    test('hmsToSeconds single digit minute', () => {
      expect(j_.hmsToSeconds('0:03:14')).toBe(194)
    })

    test('hmsToSeconds with decimal', () => {
      expect(j_.hmsToSeconds('0:00:14.5')).toBe(14.5)
    })

    // secondsToHms
    test('secondsToHms hours minutes seconds', () => {
      expect(j_.secondsToHms(44594)).toBe('12:23:14')
    })

    test('secondsToHms minutes seconds', () => {
      expect(j_.secondsToHms(494)).toBe('08:14')
    })

    test('secondsToHms seconds only', () => {
      expect(j_.secondsToHms(54)).toBe('00:54')
    })

    test('secondsToHms decimal seconds', () => {
      expect(j_.secondsToHms(54.5)).toBe('00:54')
    })
  })

  // naturalSorter
  describe('naturalSorter', () => {
    test('first less than second', () => {
      expect(j_.naturalSorter('No', 'Worries')).toBe(-1)
    })

    test('first greater than second', () => {
      expect(j_.naturalSorter('Worries', 'No')).toBe(1)
    })

    test('equal strings', () => {
      expect(j_.naturalSorter('No', 'No')).toBe(0)
    })

    test('single argument', () => {
      expect(j_.naturalSorter('No')).toBe(void 0)
    })
  })
})
