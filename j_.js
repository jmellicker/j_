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
        var i = -1,
            test = ''
        while (test !== value && i < arr.length - 1) {
            i++
            test = arr[i][key]
        }

        if (test !== value && i == arr.length - 1) i = -1
        return i
    },
    
    sortArrayBy: function(arr, key2sortBy) {
        
       function dynamicSort(key2sortBy) {
            var sortOrder = 1;
            if(key2sortBy[0] === "-") {
                sortOrder = -1;
                key2sortBy = key2sortBy.substr(1);
            }
            return function (a,b) {
                var result = (a[key2sortBy] < b[key2sortBy]) ? -1 : (a[key2sortBy] > b[key2sortBy]) ? 1 : 0;
                return result * sortOrder;
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
    convertObj2array: function(obj) {
    
    var arr = []
    
    Object.keys(obj).forEach(function(key) {
        arr.push(obj[key])
    })
    
    return arr
    
    },
    uaid: function(firstLetter) {
        return firstLetter + Date.now() + '-' + this.randomAnimal()
    },
    randomAnimal: function() {
        var animals = ["aardvark","alligator","alpaca","antelope","ape","armadillo","baboon","badger","bat","bear","beaver","bison","boar","buffalo","bull","camel","canary","capybara","cat","chameleon","cheetah","chimpanzee","chinchilla","chipmunk","cougar","cow","coyote","crocodile","crow","deer","dingo","dog","donkey","dromedary","elephant","elk","ewe","ferret","finch","fish","fox","frog","gazelle","gilaMonster","giraffe","gnu","goat","gopher","gorilla","grizzlyBear","groundHog","guineaPig","hamster","hedgehog","hippopotamus","hog","horse","hyena","ibex","iguana","impala","jackal","jaguar","kangaroo","koala","lamb","lemur","leopard","lion","lizard","llama","lynx","mandrill","marmoset","mink","mole","mongoose","monkey","moose","mountainGoat","mouse","mule","muskrat","mustang","mynahBird","newt","ocelot","opossum","orangutan","oryx","otter","ox","panda","panther","parakeet","parrot","pig","platypus","polarBear","porcupine","porpoise","prairieDog","puma","rabbit","raccoon","ram","rat","reindeer","reptile","rhinoceros","salamander","seal","sheep","shrew","silverFox","skunk","sloth","snake","squirrel","tapir","tiger","toad","turtle","walrus","warthog","weasel","whale","wildcat","wolf","wolverine","wombat","woodchuck","yak","zebra"]
        return animals[Math.floor(Math.random() * animals.length)]
        
    },
    openCleanWindow: function(url) {
        var w = window.open(url, 'name', 'width=800,height=800,toolbar=0,menubar=0,location=-100,status=1,scrollbars=1,resizable=1')
        w.focus()
    },
    randomInteger: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    decodeHTML: function(html) {
        return html.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        })
    }
}
