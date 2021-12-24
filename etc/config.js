module.exports = {
    pubsub : {
        endpoint : process.env.PUBSUB_ENDPOINT || 'localhost',
        login    : process.env.PUBSUB_LOGIN || 'rabbitmq',
        password : process.env.PUBSUB_PASSWORD || 'rabbitmq'
    }
};