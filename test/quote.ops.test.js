const j_ = require('../index')

describe('Quote Operations', () => {

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
    test('backtickIfString', () => {
        expect(j_.backtickIfString(`hi`)).toBe('`hi`')
    })
    test('backtickIfString', () => {
        expect(j_.backtickIfString('hi')).toBe('`hi`')
    })

    // quoteAndEscapeQuotesIfString
    test('quoteAndEscapeQuotesIfString template literal', () => {
        expect(j_.quoteAndEscapeQuotesIfString(`hi`)).toBe("'hi'")
    })
    test('quoteAndEscapeQuotesIfString string', () => {
        expect(j_.quoteAndEscapeQuotesIfString("hi")).toBe("'hi'")
    })
    test('quoteAndEscapeQuotesIfString already quoted', () => {
        expect(j_.quoteAndEscapeQuotesIfString("'hi'")).toBe("'\\'hi\\''")
    })

    // quoteAndEducateQuotesIfString
    test('quoteAndEducateQuotesIfString array', () => {
        expect(j_.quoteAndEducateQuotesIfString([`hi`])).toStrictEqual(["hi"])
    })
    test('quoteAndEducateQuotesIfString string', () => {
        expect(j_.quoteAndEducateQuotesIfString('hi')).toStrictEqual("'hi'")
    })

    // educateQuotes
    test('educateQuotes', () => {
        expect(j_.educateQuotes('"thing"')).toBe('\"thing\"')
    })

    // straightenQuotes
    test('straightenQuotes fancy quotes', () => {
        expect(j_.straightenQuotes('“thing”')).toBe('\"thing\"')
    })
    test('straightenQuotes fancy single quotes', () => {
        expect(j_.straightenQuotes('‘thing‘')).toBe("'thing'")
    })

})

