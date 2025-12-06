const j_ = require('../index')

describe('String Operations', () => {

    // firstItemOf
    test('firstItemOf comma-delimited', () => {
        expect(j_.firstItemOf('cat,dog')).toBe('cat')
    })
    test('firstItemOf period-delimited', () => {
        expect(j_.firstItemOf('cat.dog')).toBe('cat')
    })
    test('firstItemOf slash-delimited', () => {
        expect(j_.firstItemOf('cat/dog')).toBe('cat')
    })
    test('firstItemOf pipe-delimited', () => {
        expect(j_.firstItemOf('cat|dog')).toBe('cat')
    })

    // lastItemOf
    test('lastItemOf comma-delimited', () => {
        expect(j_.lastItemOf('cat,dog')).toBe('dog')
    })
    test('lastItemOf period-delimited', () => {
        expect(j_.lastItemOf('cat.dog')).toBe('dog')
    })
    test('lastItemOf slash-delimited', () => {
        expect(j_.lastItemOf('cat/dog')).toBe('dog')
    })
    test('lastItemOf pipe-delimited', () => {
        expect(j_.lastItemOf('alice|dog')).toBe('dog')
    })
    test('lastItemOf single item', () => {
        expect(j_.lastItemOf('alice')).toBe('alice')
    })

    // nthItemOf
    test('nthItemOf comma-delimited', () => {
        expect(j_.nthItemOf('cat,dog,shark,wombat', 3)).toBe('shark')
    })
    test('nthItemOf period-delimited', () => {
        expect(j_.nthItemOf('cat.dog.shark.wombat', 3)).toBe('shark')
    })
    test('nthItemOf slash-delimited', () => {
        expect(j_.nthItemOf('cat/dog/shark/wombat', 3)).toBe('shark')
    })
    test('nthItemOf pipe-delimited', () => {
        expect(j_.nthItemOf('cat|dog|shark|wombat', 3)).toBe('shark')
    })

    // allButFirstItemOf
    test('allButFirstItemOf comma-delimited', () => {
        expect(j_.allButFirstItemOf('cat,dog,shark,wombat')).toBe('dog,shark,wombat')
    })
    test('allButFirstItemOf period-delimited', () => {
        expect(j_.allButFirstItemOf('cat.dog.shark.wombat')).toBe('dog.shark.wombat')
    })
    test('allButFirstItemOf slash-delimited', () => {
        expect(j_.allButFirstItemOf('cat/dog/shark/wombat')).toBe('dog/shark/wombat')
    })
    test('allButFirstItemOf pipe-delimited', () => {
        expect(j_.allButFirstItemOf('cat|dog|shark|wombat')).toBe('dog|shark|wombat')
    })

    // allButLastItemOf
    test('allButLastItemOf comma-delimited', () => {
        expect(j_.allButLastItemOf('cat,dog,shark,wombat')).toBe('cat,dog,shark')
    })
    test('allButLastItemOf period-delimited', () => {
        expect(j_.allButLastItemOf('cat.dog.shark.wombat')).toBe('cat.dog.shark')
    })
    test('allButLastItemOf slash-delimited', () => {
        expect(j_.allButLastItemOf('cat/dog/shark/wombat')).toBe('cat/dog/shark')
    })
    test('allButLastItemOf pipe-delimited', () => {
        expect(j_.allButLastItemOf('cat|dog|shark|wombat')).toBe('cat|dog|shark')
    })

    // removeSpaces
    test('removeSpaces', () => {
        expect(j_.removeSpaces('cat dog shark wombat')).toBe('catdogsharkwombat')
    })

    // dashify
    test('dashify basic', () => {
        expect(j_.dashify('No Worries')).toBe('no-worries')
    })
    test('dashify camelCase', () => {
        expect(j_.dashify('noWorries')).toBe('no-worries')
    })
    test('dashify already dashed', () => {
        expect(j_.dashify('no-worries')).toBe('no-worries')
    })
    test('dashify PascalCase', () => {
        expect(j_.dashify('NoWorries')).toBe('no-worries')
    })
    test('dashify with period', () => {
        expect(j_.dashify('No.Worries')).toBe('no-worries')
    })
    test('dashify with special char', () => {
        expect(j_.dashify('No!Worries')).toBe('no-worries')
    })
    test('dashify with underscore', () => {
        expect(j_.dashify('no_worries')).toBe('no-worries')
    })

    // toTitleCase
    test('toTitleCase basic', () => {
        expect(j_.toTitleCase('No Worries')).toBe('No Worries')
    })
    test('toTitleCase lowercase', () => {
        expect(j_.toTitleCase('no worries')).toBe('No Worries')
    })
    test('toTitleCase with dash', () => {
        expect(j_.toTitleCase('no-worries')).toBe('No-worries')
    })
    test('toTitleCase with period', () => {
        expect(j_.toTitleCase('no.worries')).toBe('No.worries')
    })

    // decamelize
    test('decamelize default separator', () => {
        expect(j_.decamelize('thisIsCool')).toBe('this_is_cool')
    })
    test('decamelize space separator', () => {
        expect(j_.decamelize('thisIsCool', ' ')).toBe('this is cool')
    })

    // snakeToCamel
    test('snakeToCamel', () => {
        expect(j_.snakeToCamel('this_is_cool')).toBe('thisIsCool')
    })

    // camelToSnake
    test('camelToSnake', () => {
        expect(j_.camelToSnake('thisIsCool')).toBe('this_is_cool')
    })
    test('camelToSnake with numbers', () => {
        expect(j_.camelToSnake('stringWith234Numbers')).toBe('string_with234_numbers')
    })

    // slugify
    test('slugify default separator', () => {
        expect(j_.slugify('foo bar baz')).toBe('foo-bar-baz')
        expect(j_.slugify('foo    bar baz    ')).toBe('foo-bar-baz')
        expect(j_.slugify('   foo bar baz    ')).toBe('foo-bar-baz')
    })
    test('slugify underscore separator', () => {
        expect(j_.slugify('foo bar baz', '_')).toBe('foo_bar_baz')
    })
    test('slugify special characters', () => {
        expect(j_.slugify(`foo À bar baz`, '_')).toBe(`foo_a_bar_baz`)
    })
    test('slugify extended special characters', () => {
        expect(j_.slugify('Ĵ', '_')).toBe('j')
        expect(j_.slugify('Ñ', '_')).toBe('n')
        expect(j_.slugify('Ź', '_')).toBe('z')
    })

    // validEmailAddress (Pared down)
    describe('validEmailAddress', () => {
        test('must not be blank', () => {
            expect(j_.validEmailAddress('')).toBe(false)
        })
        test('must not be improper', () => {
            expect(j_.validEmailAddress('a')).toBe(false)
            expect(j_.validEmailAddress('a@')).toBe(false)
            expect(j_.validEmailAddress('a@a.')).toBe(false)
            expect(j_.validEmailAddress('https://website.com')).toBe(false)
        })
        test('can be normal', () => {
            expect(j_.validEmailAddress('me@website.security')).toBe(true)
            expect(j_.validEmailAddress('me.you@mywebsite.com')).toBe(true)
        })
        test('can use plus sign', () => {
             expect(j_.validEmailAddress('me+you@mywebsite.co.uk')).toBe(true)
        })
        test('can be a short domain', () => {
            expect(j_.validEmailAddress('me@a.dev')).toBe(true)
        })
        test('must not allow forbidden hostnames', () => {
            expect(j_.validEmailAddress('me@_hi_.com')).toBe(false)
            expect(j_.validEmailAddress('me@*hi*.com')).toBe(false)
        })
        test('can use really long domain names', () => {
             // 63 chars per label limit usually, but just testing general length
             let email = 'me@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcde.com'
             expect(j_.validEmailAddress(email)).toBe(true)
        })
    })

})
