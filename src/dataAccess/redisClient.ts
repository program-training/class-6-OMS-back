import Redis from 'ioredis'
const DEFAULT_EXPIRATION = 3600
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    
    password: "mendi1234",
    
  });
  export default redis

export const getOrSetCache = async <T>(key: string ,cb:() => T) => {
    try{
        const data = await redis.get(key);
        if (data !== null) {
            return JSON.parse(data)
        }
        const freshData = await cb()
        await redis.set(key, JSON.stringify(freshData));
        await redis.expire(key, DEFAULT_EXPIRATION)
        return freshData
    }
    catch (error){
        return error
    }
}
export const getOrSetCacheWithArgument = async <T>(key: string ,cb:(arg: T) => any, arg: T) => {
    try{
        const data = await redis.get(key);
        if (data !== null) {
            return JSON.parse(data)
        }
        const freshData = await cb(arg)
        await redis.set(key, JSON.stringify(freshData));
        await redis.expire(key, DEFAULT_EXPIRATION)
        return freshData
    }
    catch (error){
        return error
    }
}
