const Bull = require('bull')


const csvQueue = new Bull('csvQueue',{
    redis :{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})


module.exports = csvQueue