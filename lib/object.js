module.exports = {
    get: (nestedObj, path) => {
        return path.split('.').reduce((obj, key) =>
            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj)
    },

    isPlainObject: function (obj) {
        return !!obj && (typeof obj === 'object') && Object.getPrototypeOf(obj) === Object.prototype
    },

    arrayOfKeyValuesFromObject: function(obj, key) {
        var arr = []
        Object.keys(obj).forEach(function(k) {
            if (obj[k][key]) arr.push(obj[k][key])
        })
        return arr

    },

    stringOfKeyValuesFromObject: function(obj, key) {
            return this.arrayOfKeyValuesFromObject(obj, key).join(', ')
    },

    queryObjectFirstMatch: function(obj, key, value) {
        var objKeyArray = Object.keys(obj)

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
    },

    convertObj2array: function(obj) {
        var arr = []
        Object.keys(obj).forEach(function(key) {
            arr.push(obj[key])
        })
        return arr
    },

    mergeObjects: function(src, dest) {
        if (src === undefined) return dest
        if (dest === undefined) return src
        Object.keys(src).forEach(function(key) {
            dest[key] = src[key]
        })
        return dest
    },

    cloneObject: function(obj) {
        return JSON.parse(JSON.stringify(obj))
    },

    sortObjectBy: function(obj, keyToSortBy, keyedBy) {
        var newObj = {}
        var tempArr = this.convertObj2array(obj)

        this.sortArrayBy(tempArr, keyToSortBy).forEach(function(elem) {
            var key = elem[keyedBy]
            newObj[key] = elem
            console.log(key)
        })
        return newObj
    },

    addKeyToTopOfObject: function(obj, newKey) {
        Object.keys(obj).forEach(function(k) {
            newKey[k] = obj[k]
        })
        return newKey
    },

    subVars: function (template, varsObj) {
        for (var p in varsObj) {
            // https://github.com/nodesecurity/eslint-plugin-security/blob/master/docs/regular-expression-dos-and-node.md
            // eslint-disable-next-line security/detect-non-literal-regexp
            var reg = new RegExp('{{' + p + '}}', "g")
            template = template.replace(reg, varsObj[p])
        }
        return template
    },

    createTableFromUnstructuredData: function(data) {

        var columnNames = {}
        var gridData = []

        data.forEach(function(doc) {
            Object.keys(doc).forEach(function(key) {
                columnNames[key] = key
            })
        })

        columnNames = Object.keys(columnNames)

        var newRow

        data.forEach(function(doc) {
            newRow = {
                columns: []
            }
            columnNames.forEach(function(columnName) {
                if (doc[columnName] === null) {
                    newRow.columns.push(0)
                } else if (typeof doc[columnName] === 'object') {
                    newRow.columns.push(JSON.stringify(doc[columnName], null, 2))
                } else {
                    newRow.columns.push(doc[columnName])
                }
            })
            gridData.push(newRow)
        })

        return {
            columnNames: columnNames,
            gridData: gridData
        }
    },
    objSub: function(obj, subVars) {
        obj = JSON.stringify(obj)
        obj = this.subVars(obj, subVars)
        obj = JSON.parse(obj)
        return obj
    }
}

