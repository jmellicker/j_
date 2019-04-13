module.exports = {

    // -------- string operations -------- //

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

    decodeHTML: function (html) {
        return html.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        })
    },

    dashify: function (str) {
        str = str.replace(/([a-z])([A-Z])/g, '$1-$2')
        str = str.replace(/[ \t\W]/g, '-')
        str = str.replace(/^-+|-+$/g, '')
        return str.toLowerCase()
    },

    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
    },

    // -------- quote operations -------- //

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
    },

    // -------- array operations -------- //

    indexFromArray: function(arr, key, value) {
        var i = -1
        var test = ''

        while (test !== value && i < arr.length - 1) {
            i++
            test = arr[i][key]
        }

        if (test !== value && i == arr.length - 1) i = -1
        return i
    },

    indexFromArrayID: function(arr, value) {
        return this.indexFromArray(arr, 'id', value)
    },

    queryArrayFirstMatch: function(arr, key, value) {
        return arr[this.indexFromArray(arr, key, value)]
    },

    queryArrayAllMatches: function(arr, key, value) {
        var winners = []
        arr.forEach(function(a) {
            if (a[key] == value) {
                winners.push(a)
            }
        })
        return winners
    },

    queryArrayAllPartialMatches: function(arr, key, value) {
        var winners = []
        arr.forEach(function(a) {
            if (a[key].toLowerCase().indexOf(value.toLowerCase()) > -1) {
                winners.push(a)
            }
        })
        return winners
    },

    queryArrayAllUniqueValues: function(arr, key) {
        var uniques = {}
        arr.forEach(function(a) {
          uniques[a[key]] = true
        })

        return Object.keys(uniques)
    },

    queryArrayOneOfEach: function(arr, key) { // select distinct
        var uniques = {}
        arr.forEach(function(a) {
          uniques[a[key]] = a
        })

        return uniques
    },

    queryArrayMaxValue: function(arr, key) {
        var res = Math.max.apply(Math,array.map(function(o){return o[key]}))
        var obj = array.find(function(o){ return o[key] == res})
        return obj
    },

    removeFirstMatchFromArray: function(arr, key, value) {
        var x = arr.splice(this.indexFromArray(arr, key, value), 1)
        return arr
    },

    sortArrayBy: function (arr, key2sortBy) {
        function dynamicSort(key2sortBy) {
            var sortOrder = 1
            if (key2sortBy[0] === "-") {
                sortOrder = -1
                key2sortBy = key2sortBy.substr(1)
            }
            return function (a, b) {
                var result = (a[key2sortBy] < b[key2sortBy]) ? -1 : (a[key2sortBy] > b[key2sortBy]) ? 1 : 0
                return result * sortOrder
            }
        }

        arr.sort(dynamicSort(key2sortBy))

        return arr
    },

    shuffleArray: function(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex

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
        var uniques = {}

        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key]) delete arr[i][key]
        }

        return arr
    },

    // -------- object operations -------- //

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

    },
    removeMatchedObjectsFromArray: function(arr, key, valueArr) {
        if (valueArr.constructor !== Array) valueArr = valueArr.split(',')

        var newArr = []

        for (var i = 0; i < arr.length; i++) {
            if (valueArr.indexOf(arr[i][key]) < 0) {
                newArr.push(arr[i])
            }
        }

        return newArr
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

    // -------- random operations -------- //

    randomInteger: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomAlphaNumeric: function(length) {
        var result = ''
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result
    },

    randomCrayolaColor: function() {
        var crayolaColors = [ 'aliceblue', 'almond', 'antiquebrass', 'antiquewhite', 'apricot', 'aqua', 'aquamarine', 'asparagus', 'atomictangerine', 'azure', 'bananamania', 'beaver', 'beige', 'bisque', 'bittersweet', 'black', 'blanchedalmond', 'blizzardblue', 'blue', 'bluebell', 'bluegray', 'bluegreen', 'blueviolet', 'blush', 'brickred', 'brown', 'burlywood', 'burntorange', 'burntsienna', 'cadetblue', 'canary', 'caribbeangreen', 'carnationpink', 'cerise', 'cerulean', 'chartreuse', 'chestnut', 'chocolate', 'copper', 'coral', 'cornflower', 'cornflowerblue', 'cornsilk', 'cottoncandy', 'crimson', 'cyan', 'dandelion', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'denim', 'desertsand', 'dimgray', 'dimgrey', 'dodgerblue', 'eggplant', 'electriclime', 'fern', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'fuzzywuzzy', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'grannysmithapple', 'gray', 'green', 'greenblue', 'greenyellow', 'grey', 'honeydew', 'hotmagenta', 'hotpink', 'inchworm', 'indianred', 'indigo', 'ivory', 'jazzberryjam', 'junglegreen', 'khaki', 'laserlemon', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lemonyellow', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'macaroniandcheese', 'magenta', 'magicmint', 'mahogany', 'maize', 'manatee', 'mangotango', 'maroon', 'mauvelous', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'melon', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'mountainmeadow', 'mulberry', 'navajowhite', 'navy', 'navyblue', 'neoncarrot', 'oldlace', 'olive', 'olivedrab', 'olivegreen', 'orange', 'orangered', 'orangeyellow', 'orchid', 'outerspace', 'outrageousorange', 'pacificblue', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peach', 'peachpuff', 'periwinkle', 'peru', 'piggypink', 'pinegreen', 'pink', 'pinkflamingo', 'pinksherbet', 'plum', 'powderblue', 'purple', 'purpleheart', 'purplemountainsmajesty', 'purplepizzazz', 'radicalred', 'rawsienna', 'rawumber', 'razzledazzlerose', 'razzmatazz', 'rebeccapurple', 'red', 'redorange', 'redviolet', 'robineggblue', 'rosybrown', 'royalblue', 'royalpurple', 'saddlebrown', 'salmon', 'sandybrown', 'scarlet', 'seagreen', 'seashell', 'sepia', 'shadow', 'shamrock', 'shockingpink', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'sunglow', 'sunsetorange', 'tan', 'teal', 'tealblue', 'thistle', 'ticklemepink', 'timberwolf', 'tomato', 'tropicalrainforest', 'tumbleweed', 'turquoise', 'turquoiseblue', 'unmellowyellow', 'violet', 'violetblue', 'violetpurple', 'violetred', 'vividtangerine', 'vividviolet', 'wheat', 'white', 'whitesmoke', 'wildblueyonder', 'wildstrawberry', 'wildwatermelon', 'wisteria', 'yellow', 'yellowgreen', 'yelloworange']
        return crayolaColors[Math.floor(Math.random() * crayolaColors.length)]
    },

    randomColor: function() {
        var colors = [ 'aliceblue', 'almond', 'antiquebrass', 'antiquewhite', 'apricot', 'aqua', 'aquamarine', 'asparagus', 'atomictangerine', 'azure', 'bananamania', 'beaver', 'beige', 'bisque', 'bittersweet', 'black', 'blanchedalmond', 'blizzardblue', 'blue', 'bluebell', 'bluegray', 'bluegreen', 'blueviolet', 'blush', 'brickred', 'brown', 'burlywood', 'burntorange', 'burntsienna', 'cadetblue', 'canary', 'caribbeangreen', 'carnationpink', 'cerise', 'cerulean', 'chartreuse', 'chestnut', 'chocolate', 'copper', 'coral', 'cornflower', 'cornflowerblue', 'cornsilk', 'cottoncandy', 'crimson', 'cyan', 'dandelion', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'denim', 'desertsand', 'dimgray', 'dimgrey', 'dodgerblue', 'eggplant', 'electriclime', 'fern', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'fuzzywuzzy', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'grannysmithapple', 'gray', 'green', 'greenblue', 'greenyellow', 'grey', 'honeydew', 'hotmagenta', 'hotpink', 'inchworm', 'indianred', 'indigo', 'ivory', 'jazzberryjam', 'junglegreen', 'khaki', 'laserlemon', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lemonyellow', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'macaroniandcheese', 'magenta', 'magicmint', 'mahogany', 'maize', 'manatee', 'mangotango', 'maroon', 'mauvelous', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'melon', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'mountainmeadow', 'mulberry', 'navajowhite', 'navy', 'navyblue', 'neoncarrot', 'oldlace', 'olive', 'olivedrab', 'olivegreen', 'orange', 'orangered', 'orangeyellow', 'orchid', 'outerspace', 'outrageousorange', 'pacificblue', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peach', 'peachpuff', 'periwinkle', 'peru', 'piggypink', 'pinegreen', 'pink', 'pinkflamingo', 'pinksherbet', 'plum', 'powderblue', 'purple', 'purpleheart', 'purplemountainsmajesty', 'purplepizzazz', 'radicalred', 'rawsienna', 'rawumber', 'razzledazzlerose', 'razzmatazz', 'rebeccapurple', 'red', 'redorange', 'redviolet', 'robineggblue', 'rosybrown', 'royalblue', 'royalpurple', 'saddlebrown', 'salmon', 'sandybrown', 'scarlet', 'seagreen', 'seashell', 'sepia', 'shadow', 'shamrock', 'shockingpink', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'sunglow', 'sunsetorange', 'tan', 'teal', 'tealblue', 'thistle', 'ticklemepink', 'timberwolf', 'tomato', 'tropicalrainforest', 'tumbleweed', 'turquoise', 'turquoiseblue', 'unmellowyellow', 'violet', 'violetblue', 'violetpurple', 'violetred', 'vividtangerine', 'vividviolet', 'wheat', 'white', 'whitesmoke', 'wildblueyonder', 'wildstrawberry', 'wildwatermelon', 'wisteria', 'yellow', 'yellowgreen', 'yelloworange']
        return colors[Math.floor(Math.random() * crayolaColors.length)]
    },

    randomHexColor: function() {
        return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
    },

    randomAnimal: function() {
        var animals = ['aardvark', 'africanbuffalo', 'africanwilddog', 'ahituna', 'albacore', 'alligator', 'alpaca', 'amurtiger', 'anaconda', 'anchovy', 'anemone', 'angelfishking', 'anoa', 'anole', 'ant', 'anteater', 'antelope', 'ape', 'arcticchar', 'armadillo', 'armoredsnail', 'asianblackbear', 'asianelephant', 'baboon', 'babydollsheep', 'badger', 'baldeagle', 'baleenwhale', 'bandedbutterflyfish', 'bandedcoralshrimp', 'bandedseakrait', 'bandicoot', 'banteng', 'barbet', 'barnacle', 'barndoorskate', 'barracuda', 'barredowl', 'basilisk', 'baskingshark', 'bass', 'bat', 'bear', 'beardeddragon', 'beaver', 'bee-eater', 'bee', 'beetle', 'belugawhale', 'bettong', 'binturong', 'bird-of-paradise', 'bird', 'birds', 'bison', 'black-footedcat', 'black-footedferret', 'bluebandedgoby', 'bluebird', 'bluefish', 'blueheadwrasse', 'blueiguana', 'bluemarlin', 'blueshark', 'bluespinylobster', 'bluetang', 'bluewhale', 'boa', 'boar', 'boergoat', 'bongo', 'bowerbird', 'broadclubcuttlefish', 'brownbear', 'buffalo', 'bulbul', 'bull', 'bullshark', 'burro', 'bushbaby', 'bushdog', 'bushshrike', 'bustard', 'butterfly', 'buzzard', 'caecilian', 'camel', 'canary', 'capybara', 'caracal', 'caracara', 'cardinal', 'carp', 'cassowary', 'cat', 'caterpillar', 'cats', 'centipede', 'chamberednautilus', 'chameleon', 'chameleons', 'cheetah', 'chicken', 'chickens', 'chileanbasketstar', 'chileanjackmackerel', 'chimpanzee', 'chinchilla', 'chinchillas', 'chinesewaterdragon', 'chinooksalmon', 'chipmunk', 'christmastreeworm', 'chuckwalla', 'cicada', 'civet', 'clam', 'climbingmouse', 'cloudedleopard', 'clownanemonefish', 'clowntriggerfish', 'coati', 'cobra', 'cockatoo', 'cockroach', 'cockscombcupcoral', 'cod', 'coelacanth', 'collaredlemur', 'colugo', 'commonfangtooth', 'commongenet', 'conch', 'cookiecuttershark', 'copepod', 'copperhead', 'coquerel', 'coral', 'corydoras', 'cotinga', 'cottonrat', 'cougar', 'courser', 'cow', 'cownoseray', 'cows', 'coyote', 'crab', 'crane', 'cranefly', 'cricket', 'crocodile', 'crow', 'crown-of-thornsstarfish', 'cubanamazonparrot', 'cuckoo', 'culpeo', 'cuscus', 'cushionstar', 'cuttlefish', 'dassierat', 'deathadder', 'deer', 'deermouse', 'desert', 'devilfish', 'dhole', 'dingo', 'dinosaur', 'dog', 'dogs', 'dolphin', 'dolphinfish', 'donkey', 'dormouse', 'dory', 'dove', 'dromedary', 'drongo', 'duck', 'ducks', 'dugong', 'duiker', 'dumbooctopus', 'dungenesscrab', 'dunnart', 'eagle', 'ebonylangur', 'eccentricsanddollar', 'echidna', 'edibleseacucumber', 'eel', 'elephant', 'elephantseal', 'elk', 'elkhorncoral', 'emperorshrimp', 'emu', 'estuarinecrocodile', 'ewe', 'falcon', 'fatheadsculpin', 'fennecfox', 'ferret', 'ferrets', 'fiddlercrab', 'finch', 'finwhale', 'fish', 'fisher', 'flameback', 'flamingotonguesnail', 'flashlightfish', 'flat-headedcat', 'flatbackturtle', 'flatfish', 'flea', 'flounder', 'flowerpecker', 'fluke', 'fly', 'flyingfish', 'flyingfrog', 'fossa', 'fox', 'frenchangelfish', 'frilledshark', 'frog', 'frogmouth', 'fugu(alsocalledpufferfish)', 'gar', 'gartersnake', 'gaur', 'gayal', 'gazelle', 'gecko', 'geckos', 'geese', 'gelada', 'geoduck', 'gerbil', 'gerbils', 'giantclam', 'giantisopod', 'giantkingfish', 'giantoarfish', 'giantpanda', 'giantsquid', 'gianttubeworm', 'gilaMonster', 'giraffe', 'glowingsuckeroctopus', 'gnu', 'goat', 'goats', 'goblinshark', 'goose', 'goosefish', 'gopher', 'gorilla', 'grasshopper', 'greatwhiteshark', 'greenlandshark', 'greyatlanticseal', 'grison', 'grizzlybear', 'groundhog', 'grouper', 'grouse', 'guinea', 'guineafowl', 'guineafowlpuffer', 'guineapig', 'guineapigs', 'gundi', 'haddock', 'hake', 'halibut', 'hammerheadshark', 'hamster', 'hamsters', 'hapuka', 'harborporpoise', 'harborseal', 'harrier', 'hartebeest', 'hatchetfish', 'hawaiianhoneycreeper', 'hawaiianmonkseal', 'hawk', 'hawksbillturtle', 'hedgehog', 'hedgehogs', 'helmetshrike', 'leaf-tailedgecko', 'hermitcrab', 'herring', 'himalayantahr', 'hippopotamus', 'hog', 'hoki', 'honey', 'hornbill', 'hornshark', 'horse', 'horses', 'horseshoecrab', 'humpbackanglerfish', 'humpbackwhale', 'hyena', 'hyrax', 'ibex', 'icefish', 'iguana', 'impala', 'imperatorangelfish', 'indiangharial', 'indianrhinoceros', 'irukandjijellyfish', 'isopod', 'ivorybushcoral', 'jackal', 'jaguar', 'jaguarundi', 'japanesespidercrab', 'jellyfish', 'kangaroo', 'kangaroorat', 'kestrel', 'killerwhale', 'kingcobra', 'kingvulture', 'kiwahirsuta', 'koala', 'komododragon', 'kowari', 'krill', 'kultarr', 'ladybug', 'lagoontriggerfish', 'lamb', 'lamprey', 'leafyseadragon', 'lemur', 'leopard', 'leopardseal', 'limpet', 'ling', 'two-toedsloth', 'lion', 'lionfish', 'lionsmanejellyfish', 'littlepenguin', 'lizard', 'lizards', 'llama', 'llamas', 'lobecoral', 'lobster', 'loggerheadturtle', 'longnosesawshark', 'longsnoutseahorse', 'lopheliacoral', 'lynx', 'macaw', 'madagascartreeboa', 'magellanicpenguin', 'malayantapir', 'malayantiger', 'manatee', 'mandrill', 'mantaray', 'margay', 'marlin', 'marmoset', 'marrusorthocanna', 'matschiestreekangaroo', 'meerkat', 'megaladon', 'megamouthshark', 'mexicanlookdown', 'mice', 'mimicoctopus', 'minidonkey', 'mink', 'mole', 'mollusk', 'monarchbutterfly', 'mongoose', 'monkey', 'monkfish', 'moonjelly', 'moose', 'morayeel', 'mountainGoat', 'mouse', 'mousedeer', 'mule', 'mullet', 'muskrat', 'mussel', 'mustang', 'mynahBird', 'napoleonwrasse', 'narwhal', 'nassaugrouper', 'nautilus', 'needlefish', 'newt', 'nilecrocodile', 'nubianibex', 'nudibranch', 'numbat', 'nurseshark', 'oarfish', 'oceanicwhitetipshark', 'oceansunfish', 'ocelot', 'octopus', 'okapi', 'oldworldflycatcher', 'oliveseasnake', 'opossum', 'orangeroughy', 'orangutan', 'oryx', 'ostracod', 'ostrich', 'otter', 'owl', 'ox', 'oyster', 'panda', 'pangolin', 'panther', 'parakeet', 'parrot', 'patagoniantoothfish', 'peacockmantisshrimp', 'peafowl', 'pelagicthreshershark', 'penguin', 'peruviananchoveta', 'pheasant', 'pig', 'pigeon', 'pigeons', 'pigsandhogs', 'pilchard', 'pinksalmon', 'pinniped', 'plankton', 'platypus', 'poisondartfrog', 'polarbear', 'ponies', 'porcupine', 'porpoise', 'portuguesemanofwar', 'possum', 'potbelliedpig', 'prairiedog', 'pronghorn', 'puma', 'pycnogonidseaspider', 'pygmymarmoset', 'python', 'quahog', 'queenangelfish', 'queenconch', 'queenparrotfish', 'queenslandgrouper', 'quokka', 'quoll', 'rabbit', 'rabbits', 'raccoon', 'raccoondog', 'radiatedtortoise', 'ragfish', 'ram', 'rat', 'ratfish', 'rats', 'rattailfish', 'rattlesnake', 'raven', 'ray', 'reddrum', 'redkingcrab', 'redpanda', 'redriverhog', 'redruffedlemur', 'reindeer', 'reptile', 'rhea', 'rhinoceros', 'ring-tailedlemur', 'ring-tailedmongoose', 'ringedseal', 'rockhyrax', 'rossseals', 'sablefish', 'salamander', 'salmon', 'sandbarshark', 'sandcat', 'sanddollar', 'sarcasticfringehead', 'sawfish', 'scallopedhammerheadshark', 'seacucumber', 'seahorse', 'seal', 'sealion', 'seaurchin', 'shark', 'sheep', 'shelduck', 'shortfinmakoshark', 'shovelnoseguitarfish', 'shrew', 'shrimp', 'silkworm', 'silverFox', 'silversidefish', 'skinks', 'skipjacktuna', 'skunk', 'slendersnipeeel', 'sloth', 'slothbear', 'smallclawedasianotter', 'smalltoothsawfish', 'smelts', 'snake', 'snakes', 'snowleopard', 'snowyowl', 'sockeyesalmon', 'southernstingray', 'southernwhite-facedowl', 'southernwhiterhinocerous', 'spectacledbear', 'spinymouse', 'sponge', 'spotteddolphin', 'spottedeagleray', 'spottedmoray', 'spottedporcupinefish', 'squid', 'squidworm', 'squirrel', 'squirrelmonkey', 'starfish', 'starling', 'stickbug', 'stickinsects', 'stickleback', 'stonefish', 'stoplightloosejaw', 'sturgeon', 'sugargliders', 'sunbear', 'swordfish', 'tamandua', 'tamarin', 'tanbristlemouth', 'tapir', 'tarantula', 'tasmaniandevil', 'tasseledwobbegong', 'terribleclawlobster', 'thornbill', 'threespotdamselfish', 'thrush', 'tiger', 'tigerprawn', 'tigershark', 'tilefish', 'tit', 'toad', 'toadfish', 'tortoise', 'toucan', 'trogon', 'tropicaltwo-wingflyfish', 'trumpeter', 'tuftedpuffin', 'tuna', 'turaco', 'turkey', 'turkeys', 'turtle', 'turtles', 'tyrantflycatcher', 'umbrellasquid', 'vampiresquid', 'vaquita', 'velvetcrab', 'venusflytrapseaanemone', 'vigtorniellaworm', 'viper', 'viperfish', 'vole', 'vulture', 'wahoo', 'wallaby', 'walrus', 'warbler', 'warthog', 'wasp', 'waxwing', 'weasel', 'weaver-finch', 'weaver', 'westindianmanatee', 'whale', 'whaleshark', 'whiptailgulper', 'whistler', 'white-beakeddolphin', 'white-eye', 'white-ringgardeneel', 'white-throatedbeeeater', 'whitecheekedgibbon', 'whiteshrimp', 'whydah', 'wildcat', 'wobbegong', 'wolf', 'wolverine', 'wombat', 'woodchuck', 'woodpecker', 'woodswallow', 'worm', 'wrasse', 'wreckfish', 'wren', 'xenops', 'xerus', 'xiphosura', 'yak', 'yellowcupblackcoral', 'yelloweyerockfish', 'yellowfintuna', 'yellowjacket', 'yellowtaildamselfish', 'yellowtubesponge', 'zebra', 'zebrashark', 'zebu', 'zooplankton']
        return animals[Math.floor(Math.random() * animals.length)]
    },

    uaid: function(firstLetter) {
        return firstLetter + '_' + Date.now() + '_' + this.randomAlphaNumeric(8) + '_' + this.randomAnimal()
    },

    ucid: function(firstLetter) {
        return firstLetter + '_' + Date.now() + '_' + this.randomAlphaNumeric(8) + '_' + this.randomColor()
    },

    uniqID: function(firstLetter) {
        firstLetter = firstLetter ? firstLetter : 'u'
        return firstLetter + '_' + Date.now() + '_' + this.randomAlphaNumeric(8) + '_' + this.randomColor() + '-' + this.randomAnimal()
    },

    randomLoadingMessage: function() {
        var loadingMessages = ["activating tactical visor...", "adjusting flux capacitor...", "aligning covariance matrices...", "amping it up as we speak...", "applying feng shui shaders...", "asserting packed exemplars...", "attempting to lock back-buffer...", "bending the spoon...", "breeding fauna...", "calculating inverse probability matrices...", "calculating llama trajectory...", "charging ozone layer...", "checking gravitational constant...", "coalescing cloud formations...", "cohorting exemplars...", "collecting meteor particles...", "compounding inert tessellations...", "computing chance of success", "computing optimal bin packing...", "containing existential buffers...", "converting bugs to features...", "counting backwards from infinity", "creating time-loop inversion field", "debarking ark ramps...", "deciding what message to display next...", "decomposing singular values...", "decrementing tectonic plates...", "depixelating surface back faces...", "detecting neutrinos...", "dicing modals...", "dividing by zero...", "drafting blueprints...", "drawing map of middle earth...", "entangling superstrings...", "experiencing tranquility...", "extracting resources...", "generating unicorns...", "fixing election outcome matrix...", "flood-filling ground water...", "flushing pipe network...", "following the white rabbit...", "gathering particle sources...", "generating witty dialog...", "getting a bigger boat...", "graphing whale migration...", "increasing magmafacation...", "initializing my sim tracking mechanism...", "initializing velociraptor breeding timetable...", "initializing robotic click-path ai...", "initiating déjà vu...", "initiating vehicle avoidance behavior...", "integrating illumination form factors...", "leaving kansas...", "loading loading message...", "loading sense of humour...", "making it so...", "making science...", "modeling object components...", "normalizing power...", "not thinking of purple hippos...", "obfuscating quantum entaglement...", "obfuscating quigley matrix...", "opening pod bay doors", "opening portals...", "ordering pizza...", "partitioning singularities...", "perturbing matrices...", "please wait while the intern refills his coffee.", "polishing water highlights...", "popping theatre popcorn...", "preparing to nerf this...", "projecting stock market indices...", "purging decepticons...", "realigning alternate time frames...", "reconfiguring user mental processes...", "relaxing splines...", "removing road network speed bumps...", "removing texture gradients...", "reticulating splines...", "retracting phong shader...", "retrieving from back store...", "reverse engineering image consultant...", "routing neural network infanstructure...", "saving whales...", "scattering rhino food sources...", "scrubbing terrain...", "searching for dilithium crystals", "searching for llamas...", "searching for plot device...", "seeding architecture simulation parameters...", "sequencing particles...", "setting inner deity indicators...", "setting phasers to stun...", "setting universal physical constants...", "sonically enhancing occupant-free timber...", "spawning more bosses...", "spinning the wheel of fortune...", "splatting transforms...", "stratifying ground layers...", "swapping time and space...", "synthesizing gravity...", "synthesizing wavelets...", "taking a mindfulness minute...", "time-compressing simulator clock...", "sorting in o(n)...", "unable to reveal current activity...", "upgrading windows...", "watching cat videos..." ]
        return loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
    },

    randomSuccessQuote: function() {
        var quotes = ['"If you set your goals ridiculously high and it’s a failure, you will fail above everyone else’s success." - James Cameron', '"Success usually comes to those who are too busy to be looking for it." - Henry David Thoreau', '"Things work out best for those who make the best of how things work out." - John Wooden', '"If you are not willing to risk the usual, you will have to settle for the ordinary." - Jim Rohn', '"All our dreams can come true if we have the courage to pursue them." - Walt Disney', '"If you are willing to do more than you are paid to do, eventually you will be paid to do more than you do." - Anonymous', '"Success is walking from failure to failure with no loss of enthusiasm." - Winston Churchill', '"Whenever you see a successful person, you only see the public glories, never the private sacrifices to reach them." - Vaibhav Shah', '"Opportunities don’t happen. You create them." - Chris Grosser', '"It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change." - Charles Darwin', '"The best revenge is massive success." - Frank Sinatra', '"I have not failed. I’ve just found 10,000 ways that won’t work." - Thomas Edison', '"A successful man is one who can lay a firm foundation with the bricks others have thrown at him." - David Brinkley', '"The whole secret of a successful life is to find out what is one’s destiny to do, and then do it." - Henry Ford', '"If you’re going through hell, keep going." - Winston Churchill', '"What seems to us as bitter trials are often blessings in disguise." - Oscar Wilde', '"The distance between insanity and genius is measured only by success." - Bruce Feirstein', '"Don’t be afraid to give up the good to go for the great." - John D. Rockefeller', '"If you can’t explain it simply, you don’t understand it well enough." - Albert Einstein', '"Start where you are. Use what you have. Do what you can." - Arthur Ashe', '"People ask, "What’s the best role you’ve ever played?" "The next one." - Kevin Kline', '"I find that the harder I work, the more luck I seem to have." - Thomas Jefferson', '"The starting point of all achievement is desire." - Napoleon Hill', '"Success is the sum of small efforts, repeated day-in and day-out." - Robert Collier', '"All progress takes place outside the comfort zone." - Michael John Bobak', '"You may only succeed if you desire succeeding; you may only fail if you do not mind failing." - Philippos', '"Courage is resistance to fear, mastery of fear--not absence of fear." - Mark Twain', '"Only put off until tomorrow what you are willing to die having left undone." - Pablo Picasso', '"We become what we think about most of the time, and that’s the strangest secret." - Earl Nightingale', '"The only place where success comes before work is in the dictionary." - Vidal Sassoon', '"Though no one can go back and make a brand-new start, anyone can start from now and make a brand-new ending." - Carl Bard', '"The successful warrior is the average man, with laser-like focus." - Bruce Lee', '"Rarely have I seen a situation where doing less than the other guy is a good strategy." - Jimmy Spithill', '"Motivation is what gets you started. Habit is what keeps you going." - Jim Ryun', '"Be content to act, and leave the talking to others." - Baltasar', '"You may have to fight a battle more than once to win it." - Margaret Thatcher', '"Be patient with yourself. Self-growth is tender; it’s holy ground. There’s no greater investment." - Stephen Covey', '"I owe my success to having listened respectfully to the very best advice, and then going away and doing the exact opposite." - G. K. Chesterton', '"Many of life’s failures are people who did not realize how close they were to success when they gave up." - Thomas A. Edison', '"The greater the artist, the greater the doubt. Perfect confidence is granted to the less talented as a consolation prize." - Robert Hughes', '"What would you attempt to do if you knew you would not fail?" Robert Schuller', '"Successful and unsuccessful people do not vary greatly in their abilities. They vary in their desires to reach their potential." - John Maxwell', '"Logic will get you from A to B. Imagination will take you everywhere." - Albert Einstein', '"Success is just a war of attrition. If you just stick around long enough, eventually something is going to happen." - Dax Shepard', '"My tombstone? I’m thinking something along the lines of, "Geez, he was just here a minute ago." George Carlin', '"Success is nothing more than a few simple disciplines, practiced every day." - Jim Rohn', '"I’ve failed over and over and over again in my life and that is why I succeed." - Michael Jordan', '"Action is the foundational key to all success."  - Pablo Picasso', '"The starting point of all achievement is desire." - Napoleon Hill', '"Success consists of going from failure to failure without loss of enthusiasm." - Winston Churchill', '"In order to attain the impossible, one must attempt the absurd." - Miguel de Cervantes', '"Success is simple. Do what’s right, the right way, at the right time." = Arnold H. Glasow']
        return quotes[Math.floor(Math.random() * quotes.length)]
    },

    // -------- validations -------- //

    validEmailAddress: function(string) {
        var re = /^(?!\.)((?!.*\.{2})[a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\.!#$%&'*+-/=?^_`{|}~\-\d]+)@(?!\.)([a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\-\.\d]+)((\.([a-zA-Z\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF]){2,63})+)$/i
        return re.test(string)
    },

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
    },

    // -------- misc -------- //

    objSub: function(obj, subVars) {
        obj = JSON.stringify(obj)
        obj = this.subVars(obj, subVars)
        obj = JSON.parse(obj)
        return obj
    },

    openCleanWindow: function(url) {
        var w = window.open(url, 'name', 'width=800,height=800,toolbar=0,menubar=0,location=-100,status=1,scrollbars=1,resizable=1')
        w.focus()
    },

    fillCleanWindowWithHTML: function(name) {
        var w = window.open('', name || '', 'width=800,height=800,toolbar=0,menubar=0,location=-100,status=1,scrollbars=1,resizable=1')
        w.focus()

        return w
    },

    secondsToHms: function(pSeconds) {
        pSeconds = Number(pSeconds)
        var h = Math.floor(pSeconds / 3600)
        var m = Math.floor(pSeconds % 3600 / 60)
        var s = Math.floor(pSeconds % 3600 % 60)
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
    },

    hmsToSeconds: function(pHms) {
        tt = pHms.split(":");
        return tt[0] * 3600 + tt[1] * 60 + tt[2] * 1
    },

    formatMonthYear: function(s) {
        var i = 0
        s = s.replace(/\/20|-20| 20|20/g, function(match) {
            return match === 20 || match === '20' || match === '/20' || match === '-20' || match === ' 20' ? (i++ === 0 ? 20 : '') : '';
        })
        if (s.length === 3) s = '0' + s
        return !s.includes('/') ? s.slice(0,2) + '/' + s.slice(2,4) : s
    },

    decodeHtmlEntity: function(str) {
      return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec)
      });
    },

    naturalSorter: function(as, bs){
        var a, b, a1, b1, i= 0, n, L,
        rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
        if(as=== bs) return 0;
        a= as.toLowerCase().match(rx);
        b= bs.toLowerCase().match(rx);
        L= a.length;
        while(i<L){
            if(!b[i]) return 1;
            a1= a[i],
            b1= b[i++];
            if(a1!== b1){
                n= a1-b1;
                if(!isNaN(n)) return n;
                return a1>b1? 1:-1;
            }
        }
        return b[i]? -1:0;
    }
}
