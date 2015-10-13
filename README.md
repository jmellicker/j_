# j_
J - semantic ops for Javascript data objects and strings

Just barely getting started.

## string ops

given this string:

```x = 'cat.dog.dolphin.shark'```

---

```javascript
firstItemOf(x) // => 'cat'

lastItemOf(x) // => 'shark'

nthItemOf(x, 3) // => 'dolphin'

allButFirstItemOf(x) // => 'dog.dolphin.shark'

allButLastItemOf(x) // => 'cat.dog.dolphin'
```

All string ops will auto-detect a period or comma delimiter. If you are using a different delimiter, pass it as the second argument:

```javascript
x = 'cat|dog|dolphin|shark'

firstItemOf(x, '|') // => 'cat'

```

## array ops

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

```javascript

indexFromArray(xmen, 'power', 'Optic blast') // => 1

queryArrayFirstMatch(xmen, 'power', 'Optic blast') // => { "name": "Cyclops", "power": "Optic blast" }

```

This one will search for partial strings:
```javascript

queryArrayAllMatches(xmen, 'power', 'po') // => [ { "name": "Nightcrawler", "power": "Teleportation" }, { "name": "Rogue", "power": "Absorbing powers" } ]

```
