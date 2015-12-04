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
    guessDelimiter: function(string) {
        if (string.indexOf(',') > -1) {
            return ','
        }
        else if (string.indexOf('.') > -1) {
            return '.'
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
            if (a[key].indexOf(value) > -1) {
                winners.push(a)
            }
        })
        return winners
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
          i = -1
        } else {
          return obj[objKeyArray[i]]
        }
        
    }
}
