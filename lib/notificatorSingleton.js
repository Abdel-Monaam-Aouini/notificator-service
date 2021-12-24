const { pubsub: {endpoint, login, password} } = require("../etc/config");
const PubSub = require("./PubSub");
const Notificator = require("./Notificator");
const RabbitDriver = require("./drivers/Rabbit");

const rabbitDriver = new RabbitDriver({ endpoint, login, password });

const notificator = new Notificator({
  pubsub: new PubSub({
    driver: rabbitDriver,
  }),
});

module.exports = notificator;
