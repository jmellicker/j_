module.exports = {
    validEmailAddress: function(string) {
        var re = /^([a-zA-Z0-9+_.-]){1,64}@(([a-zA-Z0-9-]){1,64}|\.){1,8}([a-zA-Z0-9]{2,9})$/
        return re.test(string)
    },

    validEmailAddressNonLatin: function(string) {
        var re = /^([a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØß.,\-\s0-9+_.-]){1,64}@(([a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØß.,\-\s0-9-]){1,64}|\.){1,8}([a-zA-Z0-9]{2,7})$/
        return re.test(string)
    },

    /**
     *
     * @param {string} value
     */
    luhnCheck: function (value) {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) return false;

        var nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
    }
}

