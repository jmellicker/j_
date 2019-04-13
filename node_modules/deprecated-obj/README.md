# deprecated-obj

Simple utility to help making the transition from deprecated configuration objects to compliant ones.

## Usage

```
const Deprecation = require('deprecation');

const myConfig = {
  fine: true,
  old: {
    deprecated: true
  },
  'remove.me': 1
};

const deprecations = {
  old: {
    deprecated: 'new.shiny'
  },
  'remove.me': null
};

// or

const deprecations = {
  "old.deprecated": "new.shiny",
  "remove.me": null
}

const deprecation = new Deprecation(deprecations, myConfig);
```

## API

### `Deprecation::getCompliant()`

```
const myCompliant = deprecation.getCompliant();
→ { "fine": true, "new": { "shiny": true } }
```

Returns a new, compliant object. The `null` values in `deprecations` are excluded.

### `Deprecation::getViolations()`

```
const violations = deprecation.getViolations();
→ { "old.deprecated": "new.shiny", "remove.me": null }
```

The violations can be used to inform the user about the deprecations, for example:

```
if (Object.keys(violations).length > 0) {
  console.warn(`Deprecated configuration options found. Please migrate before the next major release.`);
}
for(let deprecated in violations) {
  console.warn(`The "${deprecated}" option is deprecated. Please use "${violations[deprecated]}" instead.`);
};
```
