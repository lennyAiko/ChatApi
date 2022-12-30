import memcache from 'memory-cache'

export const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url

        let cachedBody = memcache.get(key)

        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                memcache.put(key, body, duration * 1000)
                res.sendResponse(body)
            }
            next()
        }
    }
}

