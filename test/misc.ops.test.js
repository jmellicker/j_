const j_ = require('../index')

describe('Miscellaneous Operations', () => {

    // decodeHTML
    test('decodeHTML script', () => {
        expect(j_.decodeHTML('<script>')).toBe('<script>')
    })
    test('decodeHTML nbsp', () => {
        expect(j_.decodeHTML('&nbsp;')).toBe('&nbsp;')
    })
    test('decodeHTML entity', () => {
        expect(j_.decodeHTML('&#222;')).toBe('Þ')
    })

    // decodeHtmlEntity
    test('decodeHtmlEntity Zeta', () => {
        expect(j_.decodeHtmlEntity('&#918;')).toBe('Ζ')
    })
    test('decodeHtmlEntity Sum', () => {
        expect(j_.decodeHtmlEntity('&#8721;')).toBe('∑')
    })
    test('decodeHtmlEntity passthrough', () => {
        expect(j_.decodeHtmlEntity('&#8721;')).toBe('∑')
    })

    // formatMonthYear
    test('formatMonthYear slash', () => {
        expect(j_.formatMonthYear('12/2020')).toBe('12/20')
    })
    test('formatMonthYear dash', () => {
        expect(j_.formatMonthYear('12-2020')).toBe('12/20')
    })
    test('formatMonthYear space', () => {
        expect(j_.formatMonthYear('12 2020')).toBe('12/20')
    })
    test('formatMonthYear short month', () => {
        expect(j_.formatMonthYear('2/2020')).toBe('02/20')
    })

    // hmsToSeconds
    test('hmsToSeconds', () => {
        expect(j_.hmsToSeconds('12:23:14')).toBe(44594)
    })
    test('hmsToSeconds short hour', () => {
        expect(j_.hmsToSeconds('2:23:14')).toBe(8594)
    })
    test('hmsToSeconds zero hour', () => {
        expect(j_.hmsToSeconds('0:23:14')).toBe(1394)
    })
    test('hmsToSeconds minutes only', () => {
        expect(j_.hmsToSeconds('0:03:14')).toBe(194)
    })
    test('hmsToSeconds decimal', () => {
        expect(j_.hmsToSeconds('0:00:14.5')).toBe(14.5)
    })

    // secondsToHms
    test('secondsToHms', () => {
        expect(j_.secondsToHms(44594)).toBe('12:23:14')
    })
    test('secondsToHms small', () => {
        expect(j_.secondsToHms(494)).toBe('08:14')
    })
    test('secondsToHms smaller', () => {
        expect(j_.secondsToHms(54)).toBe('00:54')
    })
    test('secondsToHms decimal', () => {
        expect(j_.secondsToHms(54.5)).toBe('00:54')
    })

    // luhnCheck
    test('luhnCheck valid', () => {
        expect(j_.luhnCheck('79927398713')).toBe(true)
    })
    test('luhnCheck invalid check digit', () => {
        expect(j_.luhnCheck('79927398711')).toBe(false)
    })
    test('luhnCheck invalid length', () => {
        expect(j_.luhnCheck('79211')).toBe(false)
    })

    // naturalSorter
    test('naturalSorter less', () => {
        expect(j_.naturalSorter('No','Worries')).toBe(-1)
    })
    test('naturalSorter greater', () => {
        expect(j_.naturalSorter('Worries', 'No')).toBe(1)
    })
    test('naturalSorter equal', () => {
        expect(j_.naturalSorter('No', 'No')).toBe(0)
    })
    test('naturalSorter undefined', () => {
        expect(j_.naturalSorter('No')).toBe(void 0)
    })

    // trueFalse (tf)
    test('trueFalse', () => {
        expect(j_.tf({})).toStrictEqual(false)
        expect(j_.tf([])).toStrictEqual(false)
        expect(j_.tf('')).toStrictEqual(false)
        expect(j_.tf({cat: 'dog'})).toStrictEqual(true)
        expect(j_.tf(['cat'])).toStrictEqual(true)
        expect(j_.tf('cat')).toStrictEqual(true)
    })

    // Named Import Test
    test('named import', () => {
        expect(j_.firstItemOf('cat,dog')).toBe('cat')
    })

})

