# j_

it's a toolkit of random and useful functions

install:

    yarn add @jmellicker/j_

---

# string ops

given this string:

`let x = 'cat.dog.dolphin.shark'`

## firstItemOf

    j_.firstItemOf(x) // => 'cat'

## lastItemOf

    j_.lastItemOf(x) // => 'shark'

## nthItemOf

    j_.nthItemOf(x, 3) // => 'dolphin'

## allButFirstItemOf

    j_.allButFirstItemOf(x) // => 'dog.dolphin.shark'

## allButLastItemOf

    j_.allButLastItemOf(x) // => 'cat.dog.dolphin'

## randomItemOf

    j_.randomItemOf(x) // => 'dog' or maybe something else!

All above ops will auto-detect ',' '.' '/' & '|' in that order. For a different delimiter, pass it as the last argument:

    let x = 'cat#dog#dolphin#shark'
    
    j_.nthItemOf(x, 2, '#') // => 'dolphin'

## removeSpaces

## decodeHTML

## educateQuotes

## replaceHtmlAttributeQuotes

## straightenQuotes

## dashify

## toTitleCase

    j_.toTitleCase(tHIs is wEIrD) // => 'This Is Weird"

---

# array ops

j_ array ops only operate on flat object keys in an array.

Given this array:

    let xmen = [{
      name: 'Nightcrawler',
      power: 'Teleportation'
    }, {
      name: 'Cyclops',
      power: 'Optic blast'
    }, {
      name: 'Rogue',
      power: 'Absorbing powers'
    }, {
      name: 'Wolverine',
      power: 'Regeneration'
    }]

## indexFromArray

Searches an array of objects for a whole value for a specified key and returns the index of the first matching element

    j_.indexFromArray(xmen, 'power', 'Optic blast') // => 1

## queryArrayFirstMatch

Searches an array of objects for a whole value for a specified key and returns the first matching array element

    j_.queryArrayFirstMatch(xmen, 'power', 'Optic blast') // => { "name": "Cyclops", "power": "Optic blast" }

## queryArrayAllMatches

Searches an array of objects for a whole or partial value for a specified key and returns all matching array elements

    j_.queryArrayAllMatches(xmen, 'power', 'po') // => [ { "name": "Nightcrawler", "power": "Teleportation" }, { "name": "Rogue", "power": "Absorbing powers" } ]

## sortArrayBy

Sorts an array of objects by a key

## uniqueKeysFromArray

Returns an array of unique keys from an array of objects

## queryArrayAllUniqueValues

## queryArrayOneOfEach

## queryArrayMaxValue

## removeFirstMatchFromArray

## sortArrayBy

## shuffleArray

## removeKeyFromAllArrayObjs

## arrayOfKeyValuesFromObject

## stringOfKeyValuesFromObject

## queryObjectFirstMatch

## removeMatchedObjectsFromArray

## convertObj2array

## mergeObjects

## cloneObject

## sortObjectBy

## addKeyToTopOfObject

## subVars

## createTableFromUnstructuredData

## randomInteger

## randomAlphaNumeric

## randomCrayolaColor

## randomAnimal

## uaid

## ucid

## uniqID

## randomLoadingMessage

## randomSuccessQuote

## validEmailAddress

## luhnCheck

## objSub

## openCleanWindow

## fillCleanWindowWithHTML

## secondsToHms

## hmsToSeconds

## formatMonthYear

## decodeHtmlEntity

## naturalSorter


