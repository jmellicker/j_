module.exports = {
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
        // console.log(arr, key, value)
        var i = -1
        var test = ''

        while (test !== value && i < arr.length - 1) {
            i++
            test = arr[i][key]
            // k('test is', test, '=', value)
        }

        if (test !== value && i == arr.length - 1) i = -1
        return i
    },

    indexFromArrayID: function(arr, value) {
        return this.indexFromArray(arr, 'id', value)
    },

    sortArrayBy: function(arr, key2sortBy) {

       function dynamicSort(key2sortBy) {
            var sortOrder = 1
            if(key2sortBy[0] === "-") {
                sortOrder = -1
                key2sortBy = key2sortBy.substr(1)
            }
            return function (a,b) {
                var result = (a[key2sortBy] < b[key2sortBy]) ? -1 : (a[key2sortBy] > b[key2sortBy]) ? 1 : 0
                return result * sortOrder
            }
        }

        arr.sort(dynamicSort(key2sortBy))

        return arr
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
            if (!a || !a[key]) kw(a)
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

    shuffleArray: function(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
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
        // k(obj, keyToSortBy, keyedBy)
        var newObj = {}
        var tempArr = this.convertObj2array(obj)

        this.sortArrayBy(tempArr, keyToSortBy).forEach(function(elem) {
            var key = elem[keyedBy]
            // k(elem, key)
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
                if (typeof doc[columnName] === 'object') {
                    newRow.columns.push(JSON.stringify(doc[columnName]), null, 2)
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
    
    // misc
    randomAlphaNumeric: function(length) {
        var result = ''
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result
    },

    uaid: function(firstLetter) {
        return firstLetter + '_' + Date.now() + '_' + this.randomAlphaNumeric(4) + '_' + this.randomAnimal()
    },

    randomAnimal: function() {
        var animals = ["aardvark","alligator","alpaca","antelope","ape","armadillo","baboon","badger","bat","bear","beaver","bison","boar","buffalo","bull","camel","canary","capybara","cat","chameleon","cheetah","chimpanzee","chinchilla","chipmunk","cougar","cow","coyote","crocodile","crow","deer","dingo","dog","donkey","dromedary","elephant","elk","ewe","ferret","finch","fish","fox","frog","gazelle","gilaMonster","giraffe","gnu","goat","gopher","gorilla","grizzlyBear","groundHog","guineaPig","hamster","hedgehog","hippopotamus","hog","horse","hyena","ibex","iguana","impala","jackal","jaguar","kangaroo","koala","lamb","lemur","leopard","lion","lizard","llama","lynx","mandrill","marmoset","mink","mole","mongoose","monkey","moose","mountainGoat","mouse","mule","muskrat","mustang","mynahBird","newt","ocelot","opossum","orangutan","oryx","otter","ox","panda","panther","parakeet","parrot","pig","platypus","polarBear","porcupine","porpoise","prairieDog","puma","rabbit","raccoon","ram","rat","reindeer","reptile","rhinoceros","salamander","seal","sheep","shrew","silverFox","skunk","sloth","snake","squirrel","tapir","tiger","toad","turtle","walrus","warthog","weasel","whale","wildcat","wolf","wolverine","wombat","woodchuck","yak","zebra"]
        return animals[Math.floor(Math.random() * animals.length)]
    },

    ucid: function(firstLetter) {
        return firstLetter + '_' + Date.now() + '_' + this.randomAlphaNumeric(4) + '_' + this.randomCrayolaColor()
    },

    randomCrayolaColor: function() {
        var crayolaColors = ["almond", "antiqueBrass", "apricot", "aquamarine", "asparagus", "atomicTangerine", "bananaMania", "beaver", "bittersweet", "black", "blizzardBlue", "blue", "blueBell", "blueGray", "blueGreen", "blueViolet", "blush", "brickRed", "brown", "burntOrange", "burntSienna", "cadetBlue", "canary", "caribbeanGreen", "carnationPink", "cerise", "cerulean", "chestnut", "copper", "cornflower", "cottonCandy", "dandelion", "denim", "desertSand", "eggplant", "electricLime", "fern", "forestGreen", "fuchsia", "fuzzyWuzzy", "gold", "goldenrod", "grannySmithApple", "gray", "green", "greenBlue", "greenYellow", "hotMagenta", "inchworm", "indigo", "jazzberryJam", "jungleGreen", "laserLemon", "lavender", "lemonYellow", "macaroniAndCheese", "magenta", "magicMint", "mahogany", "maize", "manatee", "mangoTango", "maroon", "mauvelous", "melon", "midnightBlue", "mountainMeadow", "mulberry", "navyBlue", "neonCarrot", "oliveGreen", "orange", "orangeRed", "orangeYellow", "orchid", "outerSpace", "outrageousOrange", "pacificBlue", "peach", "periwinkle", "piggyPink", "pineGreen", "pinkFlamingo", "pinkSherbet", "plum", "purpleHeart", "purpleMountainsMajesty", "purplePizzazz", "radicalRed", "rawSienna", "rawUmber", "razzleDazzleRose", "razzmatazz", "red", "redOrange", "redViolet", "robinEggBlue", "royalPurple", "salmon", "scarlet", "seaGreen", "sepia", "shadow", "shamrock", "shockingPink", "silver", "skyBlue", "springGreen", "sunglow", "sunsetOrange", "tan", "tealBlue", "thistle", "tickleMePink", "timberwolf", "tropicalRainForest", "tumbleweed", "turquoiseBlue", "unmellowYellow", "violetpurple", "violetBlue", "violetRed", "vividTangerine", "vividViolet", "white", "wildBlueYonder", "wildStrawberry", "wildWatermelon", "wisteria", "yellow", "yellowGreen", "yellowOrange"]
        return crayolaColors[Math.floor(Math.random() * crayolaColors.length)]
    },

    objSub: function(obj, subVars) {
        obj = JSON.stringify(obj)
        obj = this.subVars(obj, subVars)
        obj = JSON.parse(obj)
        return obj
    },
    
    removeSpaces: function(str) {
        return str.replace(/\s+/g, '')
    },

    subVars: function(template, varsObj) {
        for (var p in varsObj) {
            var reg = new RegExp('{{'+p+'}}', "g")
            template = template.replace(reg, varsObj[p])
        }
        return template
    },

    randomSuccessQuote: function() {
        var quotes = ['"If you set your goals ridiculously high and it’s a failure, you will fail above everyone else’s success." - James Cameron', '"Success usually comes to those who are too busy to be looking for it." - Henry David Thoreau', '"Things work out best for those who make the best of how things work out." - John Wooden', '"If you are not willing to risk the usual, you will have to settle for the ordinary." - Jim Rohn', '"All our dreams can come true if we have the courage to pursue them." - Walt Disney', '"If you are willing to do more than you are paid to do, eventually you will be paid to do more than you do." - Anonymous', '"Success is walking from failure to failure with no loss of enthusiasm." - Winston Churchill', '"Whenever you see a successful person, you only see the public glories, never the private sacrifices to reach them." - Vaibhav Shah', '"Opportunities don’t happen. You create them." - Chris Grosser', '"It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change." - Charles Darwin', '"The best revenge is massive success." - Frank Sinatra', '"I have not failed. I’ve just found 10,000 ways that won’t work." - Thomas Edison', '"A successful man is one who can lay a firm foundation with the bricks others have thrown at him." - David Brinkley', '"The whole secret of a successful life is to find out what is one’s destiny to do, and then do it." - Henry Ford', '"If you’re going through hell, keep going." - Winston Churchill', '"What seems to us as bitter trials are often blessings in disguise." - Oscar Wilde', '"The distance between insanity and genius is measured only by success." - Bruce Feirstein', '"Don’t be afraid to give up the good to go for the great." - John D. Rockefeller', '"If you can’t explain it simply, you don’t understand it well enough." - Albert Einstein', '"Start where you are. Use what you have. Do what you can." - Arthur Ashe', '"People ask, "What’s the best role you’ve ever played?" "The next one." - Kevin Kline', '"I find that the harder I work, the more luck I seem to have." - Thomas Jefferson', '"The starting point of all achievement is desire." - Napoleon Hill', '"Success is the sum of small efforts, repeated day-in and day-out." - Robert Collier', '"All progress takes place outside the comfort zone." - Michael John Bobak', '"You may only succeed if you desire succeeding; you may only fail if you do not mind failing." - Philippos', '"Courage is resistance to fear, mastery of fear--not absence of fear." - Mark Twain', '"Only put off until tomorrow what you are willing to die having left undone." - Pablo Picasso', '"We become what we think about most of the time, and that’s the strangest secret." - Earl Nightingale', '"The only place where success comes before work is in the dictionary." - Vidal Sassoon', '"Though no one can go back and make a brand-new start, anyone can start from now and make a brand-new ending." - Carl Bard', '"The successful warrior is the average man, with laser-like focus." - Bruce Lee', '"Rarely have I seen a situation where doing less than the other guy is a good strategy." - Jimmy Spithill', '"Motivation is what gets you started. Habit is what keeps you going." - Jim Ryun', '"Be content to act, and leave the talking to others." - Baltasar', '"You may have to fight a battle more than once to win it." - Margaret Thatcher', '"Be patient with yourself. Self-growth is tender; it’s holy ground. There’s no greater investment." - Stephen Covey', '"I owe my success to having listened respectfully to the very best advice, and then going away and doing the exact opposite." - G. K. Chesterton', '"Many of life’s failures are people who did not realize how close they were to success when they gave up." - Thomas A. Edison', '"The greater the artist, the greater the doubt. Perfect confidence is granted to the less talented as a consolation prize." - Robert Hughes', '"What would you attempt to do if you knew you would not fail?" Robert Schuller', '"Successful and unsuccessful people do not vary greatly in their abilities. They vary in their desires to reach their potential." - John Maxwell', '"Logic will get you from A to B. Imagination will take you everywhere." - Albert Einstein', '"Success is just a war of attrition. If you just stick around long enough, eventually something is going to happen." - Dax Shepard', '"My tombstone? I’m thinking something along the lines of, "Geez, he was just here a minute ago." George Carlin', '"Success is nothing more than a few simple disciplines, practiced every day." - Jim Rohn', '"I’ve failed over and over and over again in my life and that is why I succeed." - Michael Jordan', '"Action is the foundational key to all success."  - Pablo Picasso', '"The starting point of all achievement is desire." - Napoleon Hill', '"Success consists of going from failure to failure without loss of enthusiasm." - Winston Churchill', '"In order to attain the impossible, one must attempt the absurd." - Miguel de Cervantes', '"Success is simple. Do what’s right, the right way, at the right time." = Arnold H. Glasow']
        return quotes[Math.floor(Math.random() * quotes.length)]
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

    randomInteger: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    decodeHTML: function(html) {
        return html.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        })
    },

    removeKeyFromAllArrayObjs: function(arr, key) {
        var uniques = {}

        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key]) delete arr[i][key]
        }

        return arr
    },

    educateQuotes: function(string) {
        // return string.replace(/"([^"]*)"/g, "“$1”")
        return string.replace(/>([^>]+)</g, function(r) {
              return r.replace(/(>|\s)"/g, "$1“")
                      .replace(/"/g, "”")
                      .replace(/("|\s)'/g, "$1‘")
                      .replace(/'/g, "’");
            });
    },
    replaceHtmlAttributeQuotes: function(string) {
        return string.replace(/<([^>]+)>/g, function(r) {
            // console.log(r)
            return r.replace(/\\"/g, "\\'");
            });
    },

    straightenQuotes: function(string) {
        return string.replace(/[“”]/g, "\"").replace(/[‘’]/g, "'")

    },

    dashify: function(str) {
        str = str.replace(/([a-z])([A-Z])/g, '$1-$2')
        str = str.replace(/[ \t\W]/g, '-')
        str = str.replace(/^-+|-+$/g, '')
        return str.toLowerCase()
    },

    validEmailAddress: function(string) {
        var re = /^(?!\.)((?!.*\.{2})[a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\.!#$%&'*+-/=?^_`{|}~\-\d]+)@(?!\.)([a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\-\.\d]+)((\.([a-zA-Z\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF]){2,63})+)$/i
        // var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(string)
    },

    subVars: function(template, varsObj) {
        for (var p in varsObj) {
            var reg = new RegExp('{{'+p+'}}', "g")
            template = template.replace(reg, varsObj[p])
        }
        return template
    },

    decodeHtmlEntity: function(str) {
      return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
      });
    },

    decodeHTML: function(html) {
        html = html.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        })

        // html = html.replace(/&amp;/g, '&')
        // html = html.replace(/&Atilde;/g, String.fromCharCode(0x00c3))
        html =  html.replace(/&[a-z]+;/gi, function(entity) {
          switch (entity) {
          case '&quot;': return String.fromCharCode(0x0022);
          case '&amp;': return String.fromCharCode(0x0026);
          case '&lt;': return String.fromCharCode(0x003c);
          case '&gt;': return String.fromCharCode(0x003e);
          case '&nbsp;': return String.fromCharCode(0x00a0);
          case '&iexcl;': return String.fromCharCode(0x00a1);
          case '&cent;': return String.fromCharCode(0x00a2);
          case '&pound;': return String.fromCharCode(0x00a3);
          case '&curren;': return String.fromCharCode(0x00a4);
          case '&yen;': return String.fromCharCode(0x00a5);
          case '&brvbar;': return String.fromCharCode(0x00a6);
          case '&sect;': return String.fromCharCode(0x00a7);
          case '&uml;': return String.fromCharCode(0x00a8);
          case '&copy;': return String.fromCharCode(0x00a9);
          case '&ordf;': return String.fromCharCode(0x00aa);
          case '&laquo;': return String.fromCharCode(0x00ab);
          case '&not;': return String.fromCharCode(0x00ac);
          case '&shy;': return String.fromCharCode(0x00ad);
          case '&reg;': return String.fromCharCode(0x00ae);
          case '&macr;': return String.fromCharCode(0x00af);
          case '&deg;': return String.fromCharCode(0x00b0);
          case '&plusmn;': return String.fromCharCode(0x00b1);
          case '&sup2;': return String.fromCharCode(0x00b2);
          case '&sup3;': return String.fromCharCode(0x00b3);
          case '&acute;': return String.fromCharCode(0x00b4);
          case '&micro;': return String.fromCharCode(0x00b5);
          case '&para;': return String.fromCharCode(0x00b6);
          case '&middot;': return String.fromCharCode(0x00b7);
          case '&cedil;': return String.fromCharCode(0x00b8);
          case '&sup1;': return String.fromCharCode(0x00b9);
          case '&ordm;': return String.fromCharCode(0x00ba);
          case '&raquo;': return String.fromCharCode(0x00bb);
          case '&frac14;': return String.fromCharCode(0x00bc);
          case '&frac12;': return String.fromCharCode(0x00bd);
          case '&frac34;': return String.fromCharCode(0x00be);
          case '&iquest;': return String.fromCharCode(0x00bf);
          case '&Agrave;': return String.fromCharCode(0x00c0);
          case '&Aacute;': return String.fromCharCode(0x00c1);
          case '&Acirc;': return String.fromCharCode(0x00c2);
          case '&Atilde;': return String.fromCharCode(0x00c3);
          case '&Auml;': return String.fromCharCode(0x00c4);
          case '&Aring;': return String.fromCharCode(0x00c5);
          case '&AElig;': return String.fromCharCode(0x00c6);
          case '&Ccedil;': return String.fromCharCode(0x00c7);
          case '&Egrave;': return String.fromCharCode(0x00c8);
          case '&Eacute;': return String.fromCharCode(0x00c9);
          case '&Ecirc;': return String.fromCharCode(0x00ca);
          case '&Euml;': return String.fromCharCode(0x00cb);
          case '&Igrave;': return String.fromCharCode(0x00cc);
          case '&Iacute;': return String.fromCharCode(0x00cd);
          case '&Icirc;': return String.fromCharCode(0x00ce);
          case '&Iuml;': return String.fromCharCode(0x00cf);
          case '&ETH;': return String.fromCharCode(0x00d0);
          case '&Ntilde;': return String.fromCharCode(0x00d1);
          case '&Ograve;': return String.fromCharCode(0x00d2);
          case '&Oacute;': return String.fromCharCode(0x00d3);
          case '&Ocirc;': return String.fromCharCode(0x00d4);
          case '&Otilde;': return String.fromCharCode(0x00d5);
          case '&Ouml;': return String.fromCharCode(0x00d6);
          case '&times;': return String.fromCharCode(0x00d7);
          case '&Oslash;': return String.fromCharCode(0x00d8);
          case '&Ugrave;': return String.fromCharCode(0x00d9);
          case '&Uacute;': return String.fromCharCode(0x00da);
          case '&Ucirc;': return String.fromCharCode(0x00db);
          case '&Uuml;': return String.fromCharCode(0x00dc);
          case '&Yacute;': return String.fromCharCode(0x00dd);
          case '&THORN;': return String.fromCharCode(0x00de);
          case '&szlig;': return String.fromCharCode(0x00df);
          case '&agrave;': return String.fromCharCode(0x00e0);
          case '&aacute;': return String.fromCharCode(0x00e1);
          case '&acirc;': return String.fromCharCode(0x00e2);
          case '&atilde;': return String.fromCharCode(0x00e3);
          case '&auml;': return String.fromCharCode(0x00e4);
          case '&aring;': return String.fromCharCode(0x00e5);
          case '&aelig;': return String.fromCharCode(0x00e6);
          case '&ccedil;': return String.fromCharCode(0x00e7);
          case '&egrave;': return String.fromCharCode(0x00e8);
          case '&eacute;': return String.fromCharCode(0x00e9);
          case '&ecirc;': return String.fromCharCode(0x00ea);
          case '&euml;': return String.fromCharCode(0x00eb);
          case '&igrave;': return String.fromCharCode(0x00ec);
          case '&iacute;': return String.fromCharCode(0x00ed);
          case '&icirc;': return String.fromCharCode(0x00ee);
          case '&iuml;': return String.fromCharCode(0x00ef);
          case '&eth;': return String.fromCharCode(0x00f0);
          case '&ntilde;': return String.fromCharCode(0x00f1);
          case '&ograve;': return String.fromCharCode(0x00f2);
          case '&oacute;': return String.fromCharCode(0x00f3);
          case '&ocirc;': return String.fromCharCode(0x00f4);
          case '&otilde;': return String.fromCharCode(0x00f5);
          case '&ouml;': return String.fromCharCode(0x00f6);
          case '&divide;': return String.fromCharCode(0x00f7);
          case '&oslash;': return String.fromCharCode(0x00f8);
          case '&ugrave;': return String.fromCharCode(0x00f9);
          case '&uacute;': return String.fromCharCode(0x00fa);
          case '&ucirc;': return String.fromCharCode(0x00fb);
          case '&uuml;': return String.fromCharCode(0x00fc);
          case '&yacute;': return String.fromCharCode(0x00fd);
          case '&thorn;': return String.fromCharCode(0x00fe);
          case '&yuml;': return String.fromCharCode(0x00ff);
          case '&OElig;': return String.fromCharCode(0x0152);
          case '&oelig;': return String.fromCharCode(0x0153);
          case '&Scaron;': return String.fromCharCode(0x0160);
          case '&scaron;': return String.fromCharCode(0x0161);
          case '&Yuml;': return String.fromCharCode(0x0178);
          case '&fnof;': return String.fromCharCode(0x0192);
          case '&circ;': return String.fromCharCode(0x02c6);
          case '&tilde;': return String.fromCharCode(0x02dc);
          case '&Alpha;': return String.fromCharCode(0x0391);
          case '&Beta;': return String.fromCharCode(0x0392);
          case '&Gamma;': return String.fromCharCode(0x0393);
          case '&Delta;': return String.fromCharCode(0x0394);
          case '&Epsilon;': return String.fromCharCode(0x0395);
          case '&Zeta;': return String.fromCharCode(0x0396);
          case '&Eta;': return String.fromCharCode(0x0397);
          case '&Theta;': return String.fromCharCode(0x0398);
          case '&Iota;': return String.fromCharCode(0x0399);
          case '&Kappa;': return String.fromCharCode(0x039a);
          case '&Lambda;': return String.fromCharCode(0x039b);
          case '&Mu;': return String.fromCharCode(0x039c);
          case '&Nu;': return String.fromCharCode(0x039d);
          case '&Xi;': return String.fromCharCode(0x039e);
          case '&Omicron;': return String.fromCharCode(0x039f);
          case '&Pi;': return String.fromCharCode(0x03a0);
          case '& Rho ;': return String.fromCharCode(0x03a1);
          case '&Sigma;': return String.fromCharCode(0x03a3);
          case '&Tau;': return String.fromCharCode(0x03a4);
          case '&Upsilon;': return String.fromCharCode(0x03a5);
          case '&Phi;': return String.fromCharCode(0x03a6);
          case '&Chi;': return String.fromCharCode(0x03a7);
          case '&Psi;': return String.fromCharCode(0x03a8);
          case '&Omega;': return String.fromCharCode(0x03a9);
          case '&alpha;': return String.fromCharCode(0x03b1);
          case '&beta;': return String.fromCharCode(0x03b2);
          case '&gamma;': return String.fromCharCode(0x03b3);
          case '&delta;': return String.fromCharCode(0x03b4);
          case '&epsilon;': return String.fromCharCode(0x03b5);
          case '&zeta;': return String.fromCharCode(0x03b6);
          case '&eta;': return String.fromCharCode(0x03b7);
          case '&theta;': return String.fromCharCode(0x03b8);
          case '&iota;': return String.fromCharCode(0x03b9);
          case '&kappa;': return String.fromCharCode(0x03ba);
          case '&lambda;': return String.fromCharCode(0x03bb);
          case '&mu;': return String.fromCharCode(0x03bc);
          case '&nu;': return String.fromCharCode(0x03bd);
          case '&xi;': return String.fromCharCode(0x03be);
          case '&omicron;': return String.fromCharCode(0x03bf);
          case '&pi;': return String.fromCharCode(0x03c0);
          case '&rho;': return String.fromCharCode(0x03c1);
          case '&sigmaf;': return String.fromCharCode(0x03c2);
          case '&sigma;': return String.fromCharCode(0x03c3);
          case '&tau;': return String.fromCharCode(0x03c4);
          case '&upsilon;': return String.fromCharCode(0x03c5);
          case '&phi;': return String.fromCharCode(0x03c6);
          case '&chi;': return String.fromCharCode(0x03c7);
          case '&psi;': return String.fromCharCode(0x03c8);
          case '&omega;': return String.fromCharCode(0x03c9);
          case '&thetasym;': return String.fromCharCode(0x03d1);
          case '&upsih;': return String.fromCharCode(0x03d2);
          case '&piv;': return String.fromCharCode(0x03d6);
          case '&ensp;': return String.fromCharCode(0x2002);
          case '&emsp;': return String.fromCharCode(0x2003);
          case '&thinsp;': return String.fromCharCode(0x2009);
          case '&zwnj;': return String.fromCharCode(0x200c);
          case '&zwj;': return String.fromCharCode(0x200d);
          case '&lrm;': return String.fromCharCode(0x200e);
          case '&rlm;': return String.fromCharCode(0x200f);
          case '&ndash;': return String.fromCharCode(0x2013);
          case '&mdash;': return String.fromCharCode(0x2014);
          case '&lsquo;': return String.fromCharCode(0x2018);
          case '&rsquo;': return String.fromCharCode(0x2019);
          case '&#8217;': return String.fromCharCode(0x2019);
          case '&sbquo;': return String.fromCharCode(0x201a);
          case '&ldquo;': return String.fromCharCode(0x201c);
          case '&rdquo;': return String.fromCharCode(0x201d);
          case '&bdquo;': return String.fromCharCode(0x201e);
          case '&dagger;': return String.fromCharCode(0x2020);
          case '&Dagger;': return String.fromCharCode(0x2021);
          case '&bull;': return String.fromCharCode(0x2022);
          case '&hellip;': return String.fromCharCode(0x2026);
          case '&permil;': return String.fromCharCode(0x2030);
          case '&prime;': return String.fromCharCode(0x2032);
          case '&Prime;': return String.fromCharCode(0x2033);
          case '&lsaquo;': return String.fromCharCode(0x2039);
          case '&rsaquo;': return String.fromCharCode(0x203a);
          case '&oline;': return String.fromCharCode(0x203e);
          case '&frasl;': return String.fromCharCode(0x2044);
          case '&euro;': return String.fromCharCode(0x20ac);
          case '&image;': return String.fromCharCode(0x2111);
          case '&weierp;': return String.fromCharCode(0x2118);
          case '&real;': return String.fromCharCode(0x211c);
          case '&trade;': return String.fromCharCode(0x2122);
          case '&alefsym;': return String.fromCharCode(0x2135);
          case '&larr;': return String.fromCharCode(0x2190);
          case '&uarr;': return String.fromCharCode(0x2191);
          case '&rarr;': return String.fromCharCode(0x2192);
          case '&darr;': return String.fromCharCode(0x2193);
          case '&harr;': return String.fromCharCode(0x2194);
          case '&crarr;': return String.fromCharCode(0x21b5);
          case '&lArr;': return String.fromCharCode(0x21d0);
          case '&uArr;': return String.fromCharCode(0x21d1);
          case '&rArr;': return String.fromCharCode(0x21d2);
          case '&dArr;': return String.fromCharCode(0x21d3);
          case '&hArr;': return String.fromCharCode(0x21d4);
          case '&forall;': return String.fromCharCode(0x2200);
          case '&part;': return String.fromCharCode(0x2202);
          case '&exist;': return String.fromCharCode(0x2203);
          case '&empty;': return String.fromCharCode(0x2205);
          case '&nabla;': return String.fromCharCode(0x2207);
          case '&isin;': return String.fromCharCode(0x2208);
          case '&notin;': return String.fromCharCode(0x2209);
          case '&ni;': return String.fromCharCode(0x220b);
          case '&prod;': return String.fromCharCode(0x220f);
          case '&sum;': return String.fromCharCode(0x2211);
          case '&minus;': return String.fromCharCode(0x2212);
          case '&lowast;': return String.fromCharCode(0x2217);
          case '&radic;': return String.fromCharCode(0x221a);
          case '&prop;': return String.fromCharCode(0x221d);
          case '&infin;': return String.fromCharCode(0x221e);
          case '&ang;': return String.fromCharCode(0x2220);
          case '&and;': return String.fromCharCode(0x2227);
          case '&or;': return String.fromCharCode(0x2228);
          case '&cap;': return String.fromCharCode(0x2229);
          case '&cup;': return String.fromCharCode(0x222a);
          case '&int;': return String.fromCharCode(0x222b);
          case '&there4;': return String.fromCharCode(0x2234);
          case '&sim;': return String.fromCharCode(0x223c);
          case '&cong;': return String.fromCharCode(0x2245);
          case '&asymp;': return String.fromCharCode(0x2248);
          case '&ne;': return String.fromCharCode(0x2260);
          case '&equiv;': return String.fromCharCode(0x2261);
          case '&le;': return String.fromCharCode(0x2264);
          case '&ge;': return String.fromCharCode(0x2265);
          case '&sub;': return String.fromCharCode(0x2282);
          case '&sup;': return String.fromCharCode(0x2283);
          case '&nsub;': return String.fromCharCode(0x2284);
          case '&sube;': return String.fromCharCode(0x2286);
          case '&supe;': return String.fromCharCode(0x2287);
          case '&oplus;': return String.fromCharCode(0x2295);
          case '&otimes;': return String.fromCharCode(0x2297);
          case '&perp;': return String.fromCharCode(0x22a5);
          case '&sdot;': return String.fromCharCode(0x22c5);
          case '&lceil;': return String.fromCharCode(0x2308);
          case '&rceil;': return String.fromCharCode(0x2309);
          case '&lfloor;': return String.fromCharCode(0x230a);
          case '&rfloor;': return String.fromCharCode(0x230b);
          case '&lang;': return String.fromCharCode(0x2329);
          case '&rang;': return String.fromCharCode(0x232a);
          case '&loz;': return String.fromCharCode(0x25ca);
          case '&spades;': return String.fromCharCode(0x2660);
          case '&clubs;': return String.fromCharCode(0x2663);
          case '&hearts;': return String.fromCharCode(0x2665);
          case '&diams;': return String.fromCharCode(0x2666);
          default: return '';
          }
         })

         html = html.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
                var num = parseInt(numStr, 10); // read num as normal number
                return String.fromCharCode(num);
            });
        return html
    },

    parseJsonIfNecessary: function(jsonString) {

        var jsonObj = jsonString
        try {
            jsonObj = JSON.parse(jsonString);

            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns 'null', and typeof null === "object",
            // so we must check for that, too.
            if (jsonObj && typeof jsonObj === "object" && jsonObj !== null) {
                return jsonObj;
            }
        }
        catch (e) { }

        return jsonObj;
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
    },
    
    luhnCheck: function(value) {
      // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) return false;

        // The Luhn Algorithm. It's so pretty.
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
