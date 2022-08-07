"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioredisStore = void 0;
class IORedisStore {
    constructor({ redis, ttl = 5 }) {
        this.name = 'ioredis';
        this.redis = redis;
        this.ttlValue = ttl;
    }
    static isCachableValue(value) {
        return value !== undefined && value !== null;
    }
    getClient() {
        return this.redis;
    }
    async set(key, value, options, cb) {
        let ttl = this.ttlValue;
        if (typeof options === 'function') {
            cb = options;
        }
        else if (typeof options === 'object' &&
            (options.ttl || options.ttl === 0)) {
            ttl = options.ttl;
        }
        else if (typeof options === 'number') {
            ttl = options;
        }
        return new Promise((resolve, reject) => {
            var _a;
            if (!cb)
                cb = (error, result) => (error ? reject(error) : resolve(result));
            if (!IORedisStore.isCachableValue(value)) {
                return cb(new Error(`"${value}" is not a cacheable value`));
            }
            const val = (_a = JSON.stringify(value)) !== null && _a !== void 0 ? _a : '"undefined"';
            if (ttl) {
                this.redis.setex(key, ttl, val, cb);
            }
            else {
                this.redis.set(key, val, cb);
            }
        });
    }
    get(key, cb) {
        return new Promise((resolve, reject) => {
            if (!cb)
                cb = (error, result) => (error ? reject(error) : resolve(result));
            this.redis
                .get(key)
                .then((val) => {
                try {
                    const value = JSON.parse(val);
                    cb(null, value);
                }
                catch (e) {
                    cb(e);
                }
            })
                .catch((e) => cb(e));
        });
    }
    del(key, cb) {
        return new Promise((resolve, reject) => {
            if (!cb)
                cb = (error, result) => (error ? reject(error) : resolve(result));
            this.redis.del(key, cb);
        });
    }
    keys(pattern, cb) {
        if (typeof pattern === 'function') {
            cb = pattern;
            pattern = '*';
        }
        return new Promise((resolve, reject) => {
            if (!cb)
                cb = (error, result) => (error ? reject(error) : resolve(result));
            this.redis.keys(pattern, cb);
        });
    }
    reset(cb) {
        return new Promise((resolve, reject) => {
            if (!cb)
                cb = (error, result) => (error ? reject(error) : resolve(result));
            this.redis.flushdb(cb);
        });
    }
    ttl(key, cb) {
        return new Promise((resolve, reject) => {
            if (!cb)
                cb = (error, result) => (error ? reject(error) : resolve(result));
            this.redis.ttl(key, cb);
        });
    }
}
exports.ioredisStore = {
    create: (args) => new IORedisStore(args),
};
//# sourceMappingURL=ioredis.store.js.map