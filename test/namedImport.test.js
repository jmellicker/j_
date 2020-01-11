import { j_ } from '../index'

test('firstItemOf comma-delimited', () => {
  expect (j_.firstItemOf('cat,dog')).toBe('cat')
})
