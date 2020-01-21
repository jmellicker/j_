const j_ = require('../index')

// validEmailAddress
describe('[Rules] Email:', () => {
  it('must not be blank', () => {
   const email = ''
   expect(j_.validEmailAddress(email)).toBe(false)
 })
 it('must not be improper', () => {
   let email = 'a'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'a@'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'a@a.'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'a@aa.'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'a@aa.a'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'a@aa.a.a'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'mw*site@digg.de'
   expect(j_.validEmailAddress(email)).toBe(false)
   email = 'a@aa/aa'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'a@a!.da'
   expect(j_.validEmailAddress(email)).toBe(false)
   email = 'éeek@a3.da'
   expect(j_.validEmailAddress(email)).toBe(false)
   email = 'https://website.com'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'mw-site@digg*.de'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'b_site.com.au'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'emoji@😍.emoji'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'me@hello.ššš'
   expect(j_.validEmailAddress(email)).toBe(false)

  })
 it('can be normal', () => {
   let email = 'me@website.security'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'me+you@mywebsite.co.uk'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'me.you@mywebsite.com'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'sArCaSm@my-awesome-website.com.au'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'sArCaSm+game@my-awesome-website.com.au'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'sArCaSm.fame@my-awesome-website.com.au'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'sArCaSm_fame@my-awesome-website.com.au'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'sArCaSm-fame@my1st-awesome-website.com.au'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
 })
 it('can be a short domain', () => {
   let email = 'me@1.dev'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'me@a.dev'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
 })
 it('can use multiple subdomains', () => {
   let email = 'me@first.second.third.fourth.fifth'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'me@first.second.third.fourth.fifth.sixth'
   expect(j_.validEmailAddress(email)).toBe(false)  // five domains components max
 })
 it('must not allow forbidden hostnames', () => {
   // none of these should pass
   let email = 'me@-hi-.com'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   email = 'me@_hi_.com'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'me@*hi*.com'
   expect(j_.validEmailAddress(email)).toBe(false)

   email = 'me@_.howso.com'
   expect(j_.validEmailAddress(email)).toBe(false)

 })
 it('can use reallylong domain names', () => {
   // need to tighten up the regex
   let email = 'me@iureallluyslongseyouknowniversewowcratztsgfsdjhsdsdfsdfsdfsdfsdfsdfsdfsdfsghghghghghggdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdsdfsdfsdfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfssdfsdffsdfsjdf.forever'
   expect(j_.validEmailAddress(email)).toBe(true)
 })


 it('can use reallylong domain names', () => {
   // this is technically the longest entire hostname permitted:
   let email = 'me@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcde.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk.com'
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddress(email)).toBe(true)
   expect(j_.validEmailAddressNonLatin(email)).toBe(true)
 })
 it('can use non-latin chars', () => {
   let email = 'me@deutßchewelle.de'
   expect(j_.validEmailAddress(email)).toBe(false)
   expect(j_.validEmailAddressNonLatin(email)).toBe(true)
   email = '私に@ジョエル@.jp'
   expect(j_.validEmailAddress(email)).toBe(false)

   expect(j_.validEmailAddressNonLatin(email)).toBe(false)
   email = '我@景觀@.cn'
   expect(j_.validEmailAddress(email)).toBe(false)

   expect(j_.validEmailAddressNonLatin(email)).toBe(false)
 })
})
