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

    j_.removeSpaces('hello world') // => 'helloworld'

## decodeHTML

    j_.decodeHTML('&#72;&#101;&#108;&#108;&#111;') // => 'Hello'

## educateQuotes

    j_.educateQuotes('"quote"') // => '"quote"'

## replaceHtmlAttributeQuotes

    j_.replaceHtmlAttributeQuotes('<div class="test">') // => '<div class="test">'

## straightenQuotes

    j_.straightenQuotes('"curly quotes"') // => '"straight quotes"'

## dashify

    j_.dashify('Hello World') // => 'hello-world'

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

    j_.uniqueKeysFromArray(xmen) // => ['name', 'power']

## queryArrayAllUniqueValues

Returns an array of unique values for a specified key in an array of objects

    j_.queryArrayAllUniqueValues(xmen, 'power') // => ['Teleportation', 'Optic blast', 'Absorbing powers', 'Regeneration']

## queryArrayOneOfEach

Returns an object with one object for each unique value of a specified key

    j_.queryArrayOneOfEach(xmen, 'power') // => { "Teleportation": { "name": "Nightcrawler", "power": "Teleportation" }, ... }

## queryArrayMaxValue

Returns the object with the maximum value for a specified key

    j_.queryArrayMaxValue(xmen, 'name') // => Returns object with max value

## removeFirstMatchFromArray

Removes the first object that matches the specified key and value

    j_.removeFirstMatchFromArray(xmen, 'name', 'Cyclops') // => Returns array without Cyclops

## sortArrayBy

Sorts an array of objects by a specified key

    j_.sortArrayBy(xmen, 'name') // => Returns array sorted by name

## shuffleArray

Randomly shuffles the elements in an array

    j_.shuffleArray(xmen) // => Returns randomly shuffled array

## removeKeyFromAllArrayObjs

Removes a specified key from all objects in an array

    j_.removeKeyFromAllArrayObjs(xmen, 'power') // => Returns array with power key removed from all objects

## arrayOfKeyValuesFromObject

Returns an array of values for a specified key from an object of objects

    j_.arrayOfKeyValuesFromObject(obj, 'key') // => ['value1', 'value2', ...]

## stringOfKeyValuesFromObject

Returns a comma-separated string of values for a specified key from an object of objects

    j_.stringOfKeyValuesFromObject(obj, 'key') // => 'value1, value2, ...'

## queryObjectFirstMatch

Returns the first object that matches the specified key and value

    j_.queryObjectFirstMatch(obj, 'key', 'value') // => Returns matching object

## removeMatchedObjectsFromArray

Removes all objects that match the specified key and value from an array

    j_.removeMatchedObjectsFromArray(xmen, 'name', 'Cyclops') // => Returns array without matching objects

## convertObj2array

Converts an object of objects to an array of objects

    j_.convertObj2array(obj) // => [{...}, {...}, ...]

## mergeObjects

Merges multiple objects into a single object

    j_.mergeObjects(obj1, obj2) // => Returns merged object

## cloneObject

Creates a deep copy of an object

    j_.cloneObject(obj) // => Returns cloned object

## sortObjectBy

Sorts an object by its keys or values

    j_.sortObjectBy(obj, 'key') // => Returns sorted object

## addKeyToTopOfObject

Adds a key-value pair to the beginning of an object

    j_.addKeyToTopOfObject(obj, 'key', 'value') // => Returns object with new key at top

## subVars

Substitutes variables in a string with values from an object

    j_.subVars('Hello {{name}}', { name: 'World' }) // => 'Hello World'

## createTableFromUnstructuredData

Creates a table structure from unstructured data

    j_.createTableFromUnstructuredData(data) // => Returns table structure

## randomInteger

Generates a random integer between min and max values

    j_.randomInteger(1, 10) // => Random number between 1 and 10

## randomAlphaNumeric

Generates a random alphanumeric string of specified length

    j_.randomAlphaNumeric(8) // => 'a1b2c3d4'

## randomCrayolaColor

Returns a random Crayola color name

    j_.randomCrayolaColor() // => 'Cerulean'

## randomAnimal

Returns a random animal name

    j_.randomAnimal() // => 'Dolphin'

## uaid

Generates a unique ID with a specified first letter and a random animal

    j_.uaid('A') // => 'A_1234567890_a1b2c3d4_Dolphin'

## ucid

Generates a unique ID with a specified first letter and a random color

    j_.ucid('C') // => 'C_1234567890_a1b2c3d4_Cerulean'

## uniqID

Generates a unique ID with a prefix, timestamp, random string, color, and animal

    j_.uniqID('uid') // => 'uid_1234567890_a1b2c3d4_Cerulean-Dolphin'

## randomLoadingMessage

Returns a random loading message

    j_.randomLoadingMessage() // => 'Loading...'

## randomSuccessQuote

Returns a random success quote

    j_.randomSuccessQuote() // => 'Success!'

## validEmailAddress

Validates an email address

    j_.validEmailAddress('user@example.com') // => true

## luhnCheck

Validates a number using the Luhn algorithm (used for credit card validation)

    j_.luhnCheck('79927398713') // => true

## objSub

Substitutes variables in an object with values from another object

    j_.objSub(obj, subVars) // => Returns object with substituted values

## openCleanWindow

Opens a new browser window with minimal features

    j_.openCleanWindow('https://example.com') // => Opens new window

## fillCleanWindowWithHTML

Fills a window with HTML content

    j_.fillCleanWindowWithHTML(window, '<h1>Hello</h1>') // => Fills window with HTML

## secondsToHms

Converts seconds to hours:minutes:seconds format

    j_.secondsToHms(3661) // => '01:01:01'

## hmsToSeconds

Converts hours:minutes:seconds format to seconds

    j_.hmsToSeconds('01:01:01') // => 3661

## formatMonthYear

Formats a month/year string

    j_.formatMonthYear('01/2023') // => '01/23'

## decodeHtmlEntity

Decodes HTML entities in a string

    j_.decodeHtmlEntity('&lt;div&gt;') // => '<div>'

## naturalSorter

Sorts strings in natural order (e.g., "file2" comes before "file10")

    j_.naturalSorter('file2', 'file10') // => -1


