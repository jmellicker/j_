module.exports = {
    replaceHtmlAttributeQuotes: function (string) {
        return string.replace(/<([^>]+)>/g, function (r) {
            return r.replace(/\\"/g, "\\'");
        });
    },

    educateQuotes: function (string) {
        return string.replace(/>([^>]+)</g, function (r) {
            return r.replace(/(>|\s)"/g, "$1“")
                .replace(/"/g, "”")
                .replace(/("|\s)'/g, "$1‘")
                .replace(/'/g, "’");
        });
    },

    straightenQuotes: function (string) {
        return string.replace(/[“”]/g, "\"").replace(/[‘’]/g, "'")
    },

    quoteIfString: function (input) {
      return typeof input === 'string' ? `'${ input }'` : input
    },

    backtickIfString: function (input) {
      return typeof input === 'string' ? '`' + input + '`' : input
    },

    escapeQuotes: function( str ) {
      return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
    },

    quoteAndEscapeQuotesIfString: function(input) {
      // return typeof input === 'string' ? `'${ (input + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0') }'` : input
      return typeof input === 'string' ? this.quoteIfString(this.escapeQuotes(input)) : input
    },

    quoteAndEducateQuotesIfString: function(input) {
      return typeof input === 'string' ? this.quoteIfString(this.educateQuotes(input)) : input
    },

    addAdditionalSingleQuoteIfString: function(input) {
      return typeof input === 'string' ? input.replace(/'/g, "''") : input
    }
}

