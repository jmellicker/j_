module.exports = {
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

    removeSpaces: function (str) {
        return str.replace(/\s+/g, '')
    },

    dashify: function (str) {
        str = str.replace(/([a-z])([A-Z])/g, '$1-$2')
        str = str.replace(/[ _\t\W]/g, '-')
        str = str.replace(/^-+|-+$/g, '')
        return str.toLowerCase()
    },

    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
    },

    decamelize: function(str, separator) {
    	separator = typeof separator === 'undefined' ? '_' : separator

    	return str
            .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
            .toLowerCase()
    },

    snakeToCamel: function(str) {
        return str.replace(/(_\w)/g, function(m){
            return m[1].toUpperCase()
        })
    },

    camelToSnake: function(str) {
        return str.replace(/[\w]([A-Z])/g, function(m) {
            return m[0] + "_" + m[1]
        }).toLowerCase()
    },

    slugify: function(text, separator) {
        text = text.toString().toLowerCase().trim();

        const sets = [
          {to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]'},
          {to: 'c', from: '[ÇĆĈČ]'},
          {to: 'd', from: '[ÐĎĐÞ]'},
          {to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]'},
          {to: 'g', from: '[ĜĞĢǴ]'},
          {to: 'h', from: '[ĤḦ]'},
          {to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]'},
          {to: 'j', from: 'Ĵ]'},
          {to: 'ij', from: 'Ĳ]'},
          {to: 'k', from: 'Ķ]'},
          {to: 'l', from: 'ĹĻĽŁ]'},
          {to: 'm', from: 'Ḿ]'},
          {to: 'n', from: 'ÑŃŅŇ]'},
          {to: 'o', from: 'ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]'},
          {to: 'oe', from: 'Œ]'},
          {to: 'p', from: 'ṕ]'},
          {to: 'r', from: 'ŔŖŘ]'},
          {to: 's', from: 'ßŚŜŞŠ]'},
          {to: 't', from: 'ŢŤ]'},
          {to: 'u', from: 'ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]'},
          {to: 'w', from: 'ẂŴẀẄ]'},
          {to: 'x', from: 'ẍ]'},
          {to: 'y', from: 'ÝŶŸỲỴỶỸ]'},
          {to: 'z', from: 'ŹŻŽΖ]'},
          {to: '-', from: '[·/_,:;\']'}
        ];

        sets.forEach(set => {
            // eslint-disable-next-line security/detect-non-literal-regexp
            text = text.replace(new RegExp(set.from,'gi'), set.to);
        });

        text = text.toString().toLowerCase()
            .replace(/\s+/g, '-')         // Replace spaces with -
            .replace(/&/g, '-and-')       // Replace & with 'and'
            .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
            .replace(/\--+/g, '-')        // Replace multiple - with single -
            .replace(/^-+/, '')           // Trim - from start of text
            .replace(/-+$/, '');          // Trim - from end of text

        if ((typeof separator !== 'undefined') && (separator !== '-')) {
            text = text.replace(/-/g, separator);
        }

        return text;
    }
}

