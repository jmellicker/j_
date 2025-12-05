const j_ = require('../index')

describe('Object Operations', () => {

    // isPlainObject
    test('isPlainObject valid object', () => {
        expect(j_.isPlainObject({ hi: 'there' })).toBe(true)
    })
    test('isPlainObject string', () => {
        expect(j_.isPlainObject('hi')).toBe(false)
    })
    test('isPlainObject number', () => {
        expect(j_.isPlainObject(123)).toBe(false)
    })
    test('isPlainObject boolean', () => {
        expect(j_.isPlainObject(true)).toBe(false)
    })
    test('isPlainObject array', () => {
        expect(j_.isPlainObject([ 1, 2, 3 ])).toBe(false)
    })

    // cloneObject
    test('cloneObject string', () => {
        expect(j_.cloneObject('79211')).toBe("79211")
    })
    test('cloneObject object', () => {
        expect(j_.cloneObject({me:'true'})).toStrictEqual({"me": "true"})
    })

    // convertObj2array
    test('convertObj2array', () => {
        const obj = {
            me: {me :1, you:1},
            you: {me:3, you:1},
            us: {me:2, you:1}
        }
        expect(j_.convertObj2array(obj)).toStrictEqual([{"me": 1, "you": 1}, {"me": 3, "you": 1}, {"me": 2, "you": 1}])
    })

    // arrayOfKeyValuesFromObject
    test('arrayOfKeyValuesFromObject', () => {
        const obj = {
            me: {me :1, you:1},
            you: {me:3, you:1},
            us: {me:2, you:1}
        }
        expect(j_.arrayOfKeyValuesFromObject(obj, 'me')).toStrictEqual([1,3,2])
    })

    // stringOfKeyValuesFromObject
    test('stringOfKeyValuesFromObject', () => {
        const obj = {
            me: {me :1, you:1},
            you: {me:3, you:1},
            us: {me:2, you:1}
        }
        expect(j_.stringOfKeyValuesFromObject(obj, 'me')).toStrictEqual("1, 3, 2")
    })

    // queryObjectFirstMatch
    test('queryObjectFirstMatch match found', () => {
        const obj = {
            me: {me :1, you:1},
            you: {me:3, you:1},
            us: {me:2, you:1}
        }
        expect(j_.queryObjectFirstMatch(obj, 'me', 3)).toStrictEqual({"me": 3, "you": 1})
    })
    test('queryObjectFirstMatch no match', () => {
        const obj = {
            me: {me :1, you:1},
            you: {me:3, you:1},
            us: {me:2, you:1}
        }
        expect(j_.queryObjectFirstMatch(obj, 'me', 6)).toStrictEqual(-1)
    })

    // get
    test('get nested property', () => {
        const nestedObj = {
            devices: {
                mobile: {
                    ios: 'iphone'
                }
            }
        }
        expect(j_.get(nestedObj, 'devices.mobile.ios')).toStrictEqual('iphone')
    })
    test('get undefined property', () => {
        const nestedObj = {
            devices: {
                mobile: {
                    ios: 'iphone'
                }
            }
        }
        expect(j_.get(nestedObj, 'devices.desktop.mac')).toBeUndefined()
    })

})

