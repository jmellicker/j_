const isSafeKey = (key) => {
    return key !== '__proto__' && key !== 'constructor' && key !== 'prototype'
}

module.exports = {
    indexFromArray: function(arr, key, value) {
        if (!isSafeKey(key)) return -1
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i][key] === value) return i
        }
        return -1
    },

    indexFromArrayID: function(arr, value) {
        return this.indexFromArray(arr, 'id', value)
    },

    queryArrayFirstMatch: function(arr, key, value) {
        if (!isSafeKey(key)) return undefined
        const idx = this.indexFromArray(arr, key, value)
        return idx > -1 ? arr[idx] : undefined
    },

    queryArrayAllMatches: function(arr, key, value) {
        if (!isSafeKey(key)) return []
        const winners = []
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i][key] == value) {
                winners.push(arr[i])
            }
        }
        return winners
    },

    queryArrayAllPartialMatches: function(arr, key, value) {
        if (!isSafeKey(key)) return []
        const winners = []
        const lowerValue = typeof value === 'string' ? value.toLowerCase() : value

        for (let i = 0, len = arr.length; i < len; i++) {
            const item = arr[i]
            const itemValue = item[key]

            if (typeof itemValue === 'string') {
                if (itemValue.toLowerCase().indexOf(lowerValue) > -1) {
                    winners.push(item)
                }
            } else if (itemValue && itemValue.indexOf) {
                 // specific handling for non-strings that might still have indexOf (like arrays)
                if (itemValue.indexOf(value) > -1) {
                    winners.push(item)
                }
            }
        }
        return winners
    },

    queryArrayAllUniqueValues: function(arr, key) {
        if (!isSafeKey(key)) return []
        const uniques = new Set()
        for (let i = 0, len = arr.length; i < len; i++) {
             uniques.add(arr[i][key])
        }
        return Array.from(uniques)
    },

    queryArrayOneOfEach: function(arr, key) { // select distinct
        if (!isSafeKey(key)) return {}
        const uniques = {}
        for (let i = 0, len = arr.length; i < len; i++) {
            const item = arr[i]
            // Keep the last one encountered to match previous behavior,
            // or keep first? Previous logic: uniques[a[key]] = a (keeps last)
            uniques[item[key]] = item
        }
        return uniques
    },

    queryArrayMaxValue: function(arr, key) {
        if (!arr || arr.length === 0) return undefined
        if (!isSafeKey(key)) return undefined

        let maxVal = -Infinity
        let maxObj = undefined

        for (let i = 0, len = arr.length; i < len; i++) {
            const val = arr[i][key]
            if (val > maxVal) {
                maxVal = val
                maxObj = arr[i]
            }
        }
        return maxObj
    },

    removeFirstMatchFromArray: function(arr, key, value) {
        if (!isSafeKey(key)) return arr
        const idx = this.indexFromArray(arr, key, value)
        if (idx > -1) {
            arr.splice(idx, 1)
        }
        return arr
    },

    sortArrayBy: function (arr, key2sortBy) {
        let sortOrder = 1
        let key = key2sortBy

        if (key[0] === "-") {
            sortOrder = -1
            key = key.substr(1)
        }

        if (!isSafeKey(key)) return arr

        // Pre-compute comparison function to avoid closure creation per call if possible,
        // but sort expects a function.
        return arr.sort(function (a, b) {
            const valA = a[key]
            const valB = b[key]
            const result = (valA < valB) ? -1 : (valA > valB) ? 1 : 0
            return result * sortOrder
        })
    },

    shuffleArray: function(array) {
        let currentIndex = array.length
        let temporaryValue, randomIndex

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array;
    },

    removeKeyFromAllArrayObjs: function (arr, key) {
        if (!isSafeKey(key)) return arr
        for (let i = 0, len = arr.length; i < len; i++) {
            delete arr[i][key]
        }
        return arr
    },

    removeMatchedObjectsFromArray: function(arr, key, valueArr) {
        if (!isSafeKey(key)) return arr
        let valuesSet
        if (valueArr.constructor === Array) {
            valuesSet = new Set(valueArr)
        } else {
             // Handle comma-separated string
            valuesSet = new Set(valueArr.split(','))
        }

        const newArr = []
        for (let i = 0, len = arr.length; i < len; i++) {
            if (!valuesSet.has(arr[i][key])) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }
}
