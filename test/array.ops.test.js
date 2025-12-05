const j_ = require('../index')

describe('Array Operations', () => {

    // indexFromArray
    test('indexFromArray match found', () => {
        const arr = [{me:true, you:true, us:true, them:false}]
        expect(j_.indexFromArray(arr, 'us', true)).toStrictEqual(0)
    })
    test('indexFromArray second item match', () => {
        const arr = [{me:true, you:true, us:false, them:false},{me:true, you:true, us:true, them:false}]
        expect(j_.indexFromArray(arr, 'us', true)).toStrictEqual(1)
    })
    test('indexFromArray no match', () => {
        const arr = [{me:true, you:true, us:true, them:false}]
        expect(j_.indexFromArray(arr, 'them', true)).toStrictEqual(-1)
    })

    // indexFromArrayID
    test('indexFromArrayID', () => {
        const arr = [{id:3, you:true, us:true, them:false},{id:4, you:true, us:true, them:false}]
        expect(j_.indexFromArrayID(arr, 4)).toStrictEqual(1)
    })

    // queryArrayFirstMatch
    test('queryArrayFirstMatch', () => {
        const arr = [{id:3, you:true, us:true, them:false},{id:4, you:true, us:true, them:false}]
        expect(j_.queryArrayFirstMatch(arr, 'them', false)).toStrictEqual({"id": 3, "them": false, "us": true, "you": true})
    })

    // queryArrayAllMatches
    test('queryArrayAllMatches', () => {
        const arr = [{id:3, you:true, us:true, them:false},{id:4, you:true, us:true, them:false},{id:4, you:true, us:true, them:true}]
        expect(j_.queryArrayAllMatches(arr, 'them', false)).toStrictEqual([{id:3, you:true, us:true, them:false},{id:4, you:true, us:true, them:false}])
    })

    // queryArrayAllPartialMatches
    test('queryArrayAllPartialMatches', () => {
        const arr = [{you:"yes", us:"yes", them:"no"},{you:"yes", us:"no", them:"no"},{you:"yes", us:"yes", them:"yes"}]
        expect(j_.queryArrayAllPartialMatches(arr, 'them', 'no')).toStrictEqual([{you:"yes", us:"yes", them:"no"},{you:"yes", us:"no", them:"no"}])
    })

    // queryArrayAllUniqueValues
    test('queryArrayAllUniqueValues', () => {
        const arr = [{you:"yes", us:"yes", them:"no"},{you:"yes", us:"no", them:"no"},{you:"yes", us:"yes", them:"yes"}]
        expect(j_.queryArrayAllUniqueValues(arr, 'them')).toStrictEqual(["no", "yes"])
    })

    // queryArrayOneOfEach
    test('queryArrayOneOfEach', () => {
        const arr = [{you:"yes"},{us:"no", them:"no"},{them:"yes"}]
        expect(j_.queryArrayOneOfEach(arr, 'them')).toStrictEqual({"no": {"them": "no", "us": "no"}, "undefined": {"you": "yes"}, "yes": {"them": "yes"}})
    })

})

