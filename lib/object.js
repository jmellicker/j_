const isSafeKey = (key) => {
    return key !== '__proto__' && key !== 'constructor' && key !== 'prototype'
}

module.exports = {
    get: (nestedObj, path) => {
        if (!nestedObj || !path) return undefined
        return path.split('.').reduce((obj, key) =>
            (obj && obj[key] !== undefined && isSafeKey(key)) ? obj[key] : undefined, nestedObj)
    },

    isPlainObject: function (obj) {
        return !!obj && (typeof obj === 'object') && Object.getPrototypeOf(obj) === Object.prototype
    },

    arrayOfKeyValuesFromObject: function(obj, key) {
        if (!obj) return []
        if (!isSafeKey(key)) return []
        return Object.values(obj).map(item => item[key]).filter(val => val !== undefined)
    },

    stringOfKeyValuesFromObject: function(obj, key) {
        return this.arrayOfKeyValuesFromObject(obj, key).join(', ')
    },

    queryObjectFirstMatch: function(obj, key, value) {
        if (!obj) return -1
        if (!isSafeKey(key)) return -1
        const values = Object.values(obj)
        for (let i = 0, len = values.length; i < len; i++) {
            if (values[i][key] === value) {
                return values[i]
            }
        }
        return -1
    },

    convertObj2array: function(obj) {
        return obj ? Object.values(obj) : []
    },

    mergeObjects: function(src, dest) {
        // Keeps original behavior: src properties overwrite dest, returns dest
        if (src === undefined) return dest
        if (dest === undefined) return src
        return Object.assign(dest, src)
    },

    cloneObject: function(obj) {
        // Simple deep clone for data objects
        return JSON.parse(JSON.stringify(obj))
    },

    sortObjectBy: function(obj, keyToSortBy, keyedBy) {
        const newObj = {}
        const tempArr = this.convertObj2array(obj)
        const sortOrder = keyToSortBy[0] === "-" ? -1 : 1
        const key = sortOrder === -1 ? keyToSortBy.substr(1) : keyToSortBy
        
        if (!isSafeKey(key)) return obj

        tempArr.sort((a, b) => {
             const valA = a[key]
             const valB = b[key]
             return (valA < valB ? -1 : valA > valB ? 1 : 0) * sortOrder
        })

        tempArr.forEach(elem => {
            if (isSafeKey(elem[keyedBy])) {
                newObj[elem[keyedBy]] = elem
            }
        })
        return newObj
    },

    addKeyToTopOfObject: function(obj, newKey) {
        // This function name is confusing. 
        // Original logic: keys of obj are added to newKey object. 
        // essentially merges obj into newKey.
        if (!obj || !newKey) return newKey
        Object.assign(newKey, obj)
        return newKey
    },

    subVars: function (template, varsObj) {
        if (!template || !varsObj) return template
        for (const p in varsObj) {
            if (Object.prototype.hasOwnProperty.call(varsObj, p)) {
                // eslint-disable-next-line security/detect-non-literal-regexp
                const reg = new RegExp('{{' + p + '}}', "g")
                template = template.replace(reg, varsObj[p])
            }
        }
        return template
    },

    createTableFromUnstructuredData: function(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return { columnNames: [], gridData: [] }
        }

        const columnNamesSet = new Set()
        data.forEach(doc => {
            if (doc && typeof doc === 'object') {
                Object.keys(doc).forEach(key => {
                    if (isSafeKey(key)) columnNamesSet.add(key)
                })
            }
        })

        const columnNames = Array.from(columnNamesSet)
        const gridData = data.map(doc => {
            const columns = columnNames.map(columnName => {
                const val = doc[columnName]
                if (val === null || val === undefined) {
                    return 0 // preserving original behavior of 0 for null
                } else if (typeof val === 'object') {
                    return JSON.stringify(val, null, 2)
                } else {
                    return val
                }
            })
            return { columns }
        })

        return {
            columnNames: columnNames,
            gridData: gridData
        }
    },

    objSub: function(obj, subVars) {
        const str = JSON.stringify(obj)
        const subbed = this.subVars(str, subVars)
        return JSON.parse(subbed)
    }
}
