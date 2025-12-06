module.exports = {
    openCleanWindow: function(url) {
        if (typeof window === 'object' && typeof url === 'string') { // fix for ssr
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            var w = window.open(url, 'name', 'width=800,height=800,toolbar=0,menubar=0,location=-100,status=1,scrollbars=1,resizable=1')
            w.focus()
        }
    },

    fillCleanWindowWithHTML: function(name) {
        if (typeof window === 'object' && typeof url === 'string') { // fix for ssr
            var w = window.open('', name || '', 'width=800,height=800,toolbar=0,menubar=0,location=-100,status=1,scrollbars=1,resizable=1')
            w.focus()
            return w
        }
    },

    secondsToHms: function(pSeconds) {
        var pSeconds = Number(pSeconds)
        var h = Math.floor(pSeconds / 3600)
        var m = Math.floor(pSeconds % 3600 / 60)
        var s = Math.floor(pSeconds % 3600 % 60)
        return (h > 0 ? (h < 10 ? '0' + h : h) + ':' : '') + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
    },

    hmsToSeconds: function(pHms) {
        var tt = pHms.split(":");
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

    decodeHTML: function (html) {
        return html.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        })
    },

    naturalSorter: function(as, bs){
        if ((!as || !bs) || (!as && !bs)) return void 0
        var a, b, a1, b1, i= 0, n, L,
        // eslint-disable-next-line security/detect-unsafe-regex
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

    tf: function(val) {
      return this.trueFalse(val)
    },

    trueFalse: function(val) {
      return !(!val || typeof val === 'object' && !Object.keys(val).length)
    },

    sleep: function(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}

