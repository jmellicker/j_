# j_

semantic ops for Javascript data objects and strings

Just barely getting started. Play with j_ [here.](http://codepen.io/jmellicker/pen/qOmxyY?editors=001)

```
npm install https://github.com/jmellicker/j_.git --save
```

## string ops

given this string:

```x = 'cat.dog.dolphin.shark'```

#### firstItemOf
```javascript
firstItemOf(x) // => 'cat'
```
#### lastItemOf
```javascript
lastItemOf(x) // => 'shark'
```
#### nthItemOf
```javascript
nthItemOf(x, 3) // => 'dolphin'
```
#### allButFirstItemOf
```javascript
allButFirstItemOf(x) // => 'dog.dolphin.shark'
```
#### allButLastItemOf
```javascript
allButLastItemOf(x) // => 'cat.dog.dolphin'
```

All ops will auto-detect ',' '.' '/' & '|' in that order. For a different delimiter, pass it as the last argument:

```javascript
x = 'cat|dog|dolphin|shark'

nthItemOf(x, 2, '|') // => 'dog'
```

## array ops

j_ array ops only operate on flat object keys in an array.

Given this array:

```javascript
xmen = [{
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
```

#### indexFromArray
Searches an array of objects for a whole value for a specified key and returns the index of the first matching element

```javascript
indexFromArray(xmen, 'power', 'Optic blast') // => 1
```

#### queryArrayFirstMatch
Searches an array of objects for a whole value for a specified key and returns the first matching array element

```javascript
queryArrayFirstMatch(xmen, 'power', 'Optic blast') // => { "name": "Cyclops", "power": "Optic blast" }
```

#### queryArrayAllMatches
Searches an array of objects for a whole or partial value for a specified key and returns all matching array elements

```javascript
queryArrayAllMatches(xmen, 'power', 'po') // => [ { "name": "Nightcrawler", "power": "Teleportation" }, { "name": "Rogue", "power": "Absorbing powers" } ]
```
#### sortArrayBy
Returns an array of unique keys from an array of objects

#### uniqueKeysFromArray
Returns an array of unique keys from an array of objects
