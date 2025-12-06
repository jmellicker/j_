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
        const arr = string.split(delimiter)
        return arr[Math.floor(Math.random() * arr.length)]
    },

    guessDelimiter: function(string) {
        const delimiters = [',', '.', '/', '|']
        for (const d of delimiters) {
            if (string.indexOf(d) > -1) return d
        }
        return "error: no delimiter"
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
          {to: 'a', from: /[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]/gi},
          {to: 'c', from: /[ÇĆĈČ]/gi},
          {to: 'd', from: /[ÐĎĐÞ]/gi},
          {to: 'e', from: /[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]/gi},
          {to: 'g', from: /[ĜĞĢǴ]/gi},
          {to: 'h', from: /[ĤḦ]/gi},
          {to: 'i', from: /[ÌÍÎÏĨĪĮİỈỊ]/gi},
          {to: 'j', from: /[Ĵ]/gi},
          {to: 'ij', from: /[Ĳ]/gi},
          {to: 'k', from: /[Ķ]/gi},
          {to: 'l', from: /[ĹĻĽŁ]/gi},
          {to: 'm', from: /[Ḿ]/gi},
          {to: 'n', from: /[ÑŃŅŇ]/gi},
          {to: 'o', from: /[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]/gi},
          {to: 'oe', from: /[Œ]/gi},
          {to: 'p', from: /[ṕ]/gi},
          {to: 'r', from: /[ŔŖŘ]/gi},
          {to: 's', from: /[ßŚŜŞŠ]/gi},
          {to: 't', from: /[ŢŤ]/gi},
          {to: 'u', from: /[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]/gi},
          {to: 'w', from: /[ẂŴẀẄ]/gi},
          {to: 'x', from: /[ẍ]/gi},
          {to: 'y', from: /[ÝŶŸỲỴỶỸ]/gi},
          {to: 'z', from: /[ŹŻŽΖ]/gi},
          {to: '-', from: /[·/_,:;']/gi}
        ];

        sets.forEach(set => {
            text = text.replace(set.from, set.to);
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
