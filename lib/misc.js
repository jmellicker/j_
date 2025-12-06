module.exports = {
    openCleanWindow: function(url) {
        if (typeof window === 'object' && typeof url === 'string') { // fix for ssr
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            var w = window.open(url, 'name', 'width=800,height=800,toolbar=0,menubar=0,location=-100,status=1,scrollbars=1,resizable=1')
            w.focus()
        }
    },

    fillCleanWindowWithHTML: function(name) {
        if (typeof window === 'object' && (typeof name === 'string' || typeof name === 'undefined')) { // fix for ssr
            var w = window.open('', name || '', 'width=800,height=800,toolbar=0,menubar=0,location=-100,status=1,scrollbars=1,resizable=1')
            w.focus()
            return w
        }
    },

    secondsToHms: function(pSeconds) {
        const seconds = Number(pSeconds)
        const h = Math.floor(seconds / 3600)
        const m = Math.floor(seconds % 3600 / 60)
        const s = Math.floor(seconds % 3600 % 60)
        return (h > 0 ? (h < 10 ? '0' + h : h) + ':' : '') + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
    },

    hmsToSeconds: function(pHms) {
        const tt = pHms.split(":");
        return (parseFloat(tt[0]) * 3600) + (parseFloat(tt[1]) * 60) + (parseFloat(tt[2]) * 1)
    },

    timeAgo: function(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000)
        const isFuture = seconds < 0
        const absSeconds = Math.abs(seconds)

        let interval = absSeconds / 31536000
        const prefix = isFuture ? '' : ''
        const suffix = isFuture ? ' from now' : ' ago'

        if (interval > 1) {
            return prefix + Math.floor(interval) + " years" + suffix
        }
        interval = absSeconds / 2592000
        if (interval > 1) {
            return prefix + Math.floor(interval) + " months" + suffix
        }
        interval = absSeconds / 86400
        if (interval > 1) {
            return prefix + Math.floor(interval) + " days" + suffix
        }
        interval = absSeconds / 3600
        if (interval > 1) {
            return prefix + Math.floor(interval) + " hours" + suffix
        }
        interval = absSeconds / 60
        if (interval > 1) {
            return prefix + Math.floor(interval) + " minutes" + suffix
        }

        if (absSeconds < 5) return 'just now'

        return prefix + Math.floor(absSeconds) + " seconds" + suffix
    },

    formatMonthYear: function(s) {
        if (!s) return s
        // Normalize separators (dash or space) to slash
        let clean = s.replace(/[\-\s]/g, '/')

        const parts = clean.split('/')
        if (parts.length === 2) {
            let month = parts[0]
            let year = parts[1]

            // Pad month to 2 digits
            if (month.length === 1) month = '0' + month

            // Truncate year to last 2 digits
            if (year.length === 4) year = year.slice(2)

            return month + '/' + year
        }
        return s
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
        if ((!as || !bs) || (!as && !bs)) return undefined
        const rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g
        if (as === bs) return 0
        const a = as.toLowerCase().match(rx)
        const b = bs.toLowerCase().match(rx)

        let i = 0
        const L = a.length
        while (i < L) {
            if (!b[i]) return 1
            const a1 = a[i]
            const b1 = b[i++]
            if (a1 !== b1) {
                const n = a1 - b1
                if (!isNaN(n)) return n
                return a1 > b1 ? 1 : -1
            }
        }
        return b[i] ? -1 : 0
    },

    tf: function(val) {
      return this.trueFalse(val)
    },

    trueFalse: function(val) {
      if (!val) return false
      if (typeof val === 'object' && Object.keys(val).length === 0) return false
      return true
    },

    sleep: function(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}
