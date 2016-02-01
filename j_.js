cart = {
  "hs_DVD-MEH-JS22": {
    "productName": "The Ultimate Swing Guitar Gypsy Jazz Guitar Lesson-DVD 2",
    "productSKU": "hs_DVD-MEH-JS22",
    "productPrice": 24.95,
    "publisherID": 3,
    "tags": "11,26,115,240,491,1027,2950",
    "productID": 38675
  },
  "hs_fingerstyle1": {
    "productName": "Essential Exercises for Fingerstyle Guitar",
    "productSKU": "hs_fingerstyle1",
    "productPrice": 24.95,
    "publisherID": 3,
    "tags": "34,467,45,67656,73,67",
    "productID": 16025
  },
  "hs_fingerstyle2": {
    "productName": "More Essential Exercises for Fingerstyle Guitar",
    "productSKU": "hs_fingerstyle2",
    "productPrice": 24.95,
    "publisherID": 3,
    "tags": "34,467,45,67656,73,67",
    "productID": 16026
  }
}

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
  name: 'Rogue',
  power: 'Absorbing powers'
}, {
  name: 'Wolverine',
  power: 'Regeneration'
}]

x = "this.that.foo.bar"

var j_ = {
    // string operations
    firstItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.slice(0, string.indexOf(delimiter))
    },
    lastItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.slice(string.lastIndexOf(delimiter) + 1, string.length)
    },
    nthItemOf: function(string, n, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.split(delimiter)[n - 1]
    },
    allButFirstItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.slice(string.indexOf(delimiter) + 1)
    },
    allButLastItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.slice(0, string.lastIndexOf(delimiter))
    },
    randomItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        var arr = string.split(delimiter)
        return arr[Math.floor(Math.random() * arr.length)]
    },

    guessDelimiter: function(string) {
        if (string.indexOf(',') > -1) {
            return ','
        }
        else if (string.indexOf('.') > -1) {
            return '.'
        }
        else if (string.indexOf('/') > -1) {
            return '/'
        }
        else if (string.indexOf('|') > -1) {
            return '|'
        }
        else {
            return "error: no delimiter"
        }
    },

    // array operations
    indexFromArray: function(arr, key, value) {

        if (arr.length == 0) return 'array has no length'
        if (key == '') return 'missing key'
        if (value == '') return 'missing value'

        var i = -1,
            test = ''
        while (test !== value && i < arr.length - 1) {
            i++
            test = arr[i][key]
            
            if (arr[i][key] == value) {
                k('match', arr[i][key], value)
                k(arr[i])
            }
        }

        if (test !== value && i == arr.length - 1) i = -1
        return i

    },
    queryArrayFirstMatch: function(arr, key, value) {
        return arr[this.indexFromArray(arr, key, value)]
    },
    queryArrayAllMatches: function(arr, key, value) {
        if (arr.length == 0) return 'array has no length'
        if (key == '') return 'missing key'
        if (value == '') return 'missing value'

        var winners = []
        arr.forEach(function(a) {
            if (a[key] == value) {
                winners.push(a)
            }
        })
        return winners
    },
    queryArrayAllPartialMatches: function(arr, key, value) {
        if (arr.length == 0) return 'array has no length'
        if (key == '') return 'missing key'
        if (value == '') return 'missing value'

        var winners = []
        arr.forEach(function(a) {
            if (a[key].indexOf(value) > -1) {
                winners.push(a)
            }
        })
        return winners
    },
  
    queryArrayAllUniqueValues: function(arr, key) {
        if (arr.length == 0) return 'array has no length'
        if (key == '') return 'missing key'

        var uniques = {}
        arr.forEach(function(a) {
          uniques[a[key]] = true
        })
        
        return Object.keys(uniques)
    },

    // object operations
    arrayOfKeyValuesFromObject: function(obj, key) {
        var arr = []
        Object.keys(obj).forEach(function(k) {
            if (obj[k][key]) arr.push(obj[k][key])
        })
        return arr
    },
    stringOfKeyValuesFromObject: function(obj, key) {
        if (Object.keys(obj).length > 0) {
            return this.arrayOfKeyValuesFromObject(obj, key).join(', ')
        }
        else {
            return ('object is empty')
        }
    },
    queryObjectFirstMatch: function(obj, key, value) {
      
        if (!obj) return 'object is empty'
        if (key == '') return 'missing key'
        if (value == '') return 'missing value'

        objKeyArray = Object.keys(obj)
        
        var i = -1,
            test = ''
        while (test !== value && i < objKeyArray.length - 1) {
            i++
            test = obj[objKeyArray[i]][key]
        }

        if (test !== value && i == objKeyArray.length - 1) {
          return -1
        } else {
          return obj[objKeyArray[i]]
        }
        
    }
}

r = new Ractive({
  el: '#container',
  template: '#template',
  data: function() {
    return ({

    })
  },

  oninit: function() {
    
    // comment the below lines in and out to experiment

    /*    this.k(j_.firstItemOf(x))*/
       // this.k(j_.lastItemOf(x, '.'))
    /*    this.k(j_.nthItemOf(x, 3))*/
    /*    this.k(j_.allButLastItemOf(x))*/

//        this.k(j_.indexFromArray(xmen, 'power', 'Regeneration'))
    // this.k(j_.randomItemOf(x))
    /*    this.j(j_.queryArrayFirstMatch(xmen, 'power', 'Optic blast'))*/
    /*    this.j(j_.queryArrayAllMatches(xmen, 'power', 'Hotdog eating'))*/
/*        this.j(j_.uniqueKeysFromArray(xmen, 'power'))*/
    
       // this.k(j_.arrayOfKeyValuesFromObject(cart, 'productName'))
/*    this.k(j_.stringOfKeyValuesFromObject(cart, 'productName'))*/
    
//   this.k(j_.queryObjectFirstMatch(cart,  'productName', 'More Essential Exercises for Fingerstyle Guitar'))
     this.j(j_.queryArrayAllUniqueValues(xmen, 'power'))
/*   this.k({} === true)*/

  },

  j: function(x) {
    /*    console.log("______________________")*/
    console.log(JSON.stringify(x, null, 2))
    this.set('output', JSON.stringify(x, null, 2))
  },

  k: function(x) {
    /*    console.log("______________________")*/
    console.log(x)
      /*    self.set('output', self.get('output') + '<br />' + x)*/
    this.set('output', x)
  }

})

console.log("______________________")
