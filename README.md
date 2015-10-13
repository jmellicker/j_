# j_
J - semantic ops for Javascript data objects and strings

Just barely getting started.

## string ops

given:
```x = 'cat.dog.dolphin.shark'```

```firstItemOf(x) // => 'cat'```

```lastItemOf(x) // => 'shark'```

```nthItemOf(x, 3) // => 'dolphin'```

```allButFirstItemOf(x) // => 'dog.dolphin.shark'```

```allButLastItemOf(x) // => 'cat.dog.dolphin'```

These ops will auto-detect a period or comma delimiter, if you are using a different delimiter, pass it as the second argument:

```x = 'cat|dog|dolphin|shark'```

```firstItemOf(x, '|') // => 'cat'```

## array ops

Given

```xmen = [{
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
}]```

```indexFromArray(xmen, 'power', 'Optic blast') // => 1```

```queryArrayFirstMatch(xmen, 'power', 'Optic blast') // => { "name": "Cyclops", "power": "Optic blast" }```

This one will search for partial strings:
```queryArrayAllMatches(xmen, 'power', 'po') // => [ { "name": "Nightcrawler", "power": "Teleportation" }, { "name": "Rogue", "power": "Absorbing powers" } ]```
