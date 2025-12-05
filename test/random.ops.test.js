const j_ = require('../index')

describe('Random Operations', () => {

    // randomAnimal
    test('randomAnimal', () => {
        expect(typeof j_.randomAnimal()).toBe('string')
    })

    // randomItemOf
    test('randomItemOf', () => {
        const arr = ['hi','there','you']
        const res = j_.randomItemOf('hi,there,you')
        expect(arr.find(r => res === r)).toBe(res)
    })

    // uniqID
    test('uniqID', () => {
        expect(j_.uniqID('thisIsCool')).toEqual(expect.stringContaining('thisIsCool'))
    })

    // id
    test('id', () => {
        expect(j_.id('u')).toHaveLength(16)
    })

})

