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

    // misc
    uaid: function(firstLetter) {
        return firstLetter + '_' + Date.now() + '_' + this.randomAnimal()
    },

    randomAnimal: function() {
        var animals = ["aardvark","alligator","alpaca","antelope","ape","armadillo","baboon","badger","bat","bear","beaver","bison","boar","buffalo","bull","camel","canary","capybara","cat","chameleon","cheetah","chimpanzee","chinchilla","chipmunk","cougar","cow","coyote","crocodile","crow","deer","dingo","dog","donkey","dromedary","elephant","elk","ewe","ferret","finch","fish","fox","frog","gazelle","gilaMonster","giraffe","gnu","goat","gopher","gorilla","grizzlyBear","groundHog","guineaPig","hamster","hedgehog","hippopotamus","hog","horse","hyena","ibex","iguana","impala","jackal","jaguar","kangaroo","koala","lamb","lemur","leopard","lion","lizard","llama","lynx","mandrill","marmoset","mink","mole","mongoose","monkey","moose","mountainGoat","mouse","mule","muskrat","mustang","mynahBird","newt","ocelot","opossum","orangutan","oryx","otter","ox","panda","panther","parakeet","parrot","pig","platypus","polarBear","porcupine","porpoise","prairieDog","puma","rabbit","raccoon","ram","rat","reindeer","reptile","rhinoceros","salamander","seal","sheep","shrew","silverFox","skunk","sloth","snake","squirrel","tapir","tiger","toad","turtle","walrus","warthog","weasel","whale","wildcat","wolf","wolverine","wombat","woodchuck","yak","zebra"]
        return animals[Math.floor(Math.random() * animals.length)]
    },

    ucid: function(firstLetter) {
        return firstLetter + '_' + Date.now() + '_' + this.randomCrayolaColor()
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

    dashify: function(str) {
        str = str.replace(/([a-z])([A-Z])/g, '$1-$2')
        str = str.replace(/[ \t\W]/g, '-')
        str = str.replace(/^-+|-+$/g, '')
        return str.toLowerCase()
    },

    validEmailAddress: function(string) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(string)
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
