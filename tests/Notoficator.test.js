const { pubsub: {endpoint, login, password} } = require("../etc/config");
const Notificator = require("../lib/Notificator");
const notificator = require("../lib/notificatorSingleton");
const PubSub = require("../lib/PubSub");
const RabbitDriver = require("../lib/drivers/Rabbit");

describe("Notificator tests", () => {
  test("positive: can notify/recieve messages", async () => {
    await notificator.init();
    setTimeout(() => {
      notificator.notify({ test: 1 });
    }, 100);
    const result = await new Promise((res) =>
      notificator.receive((msg) => res(msg))
    );
    expect(result.test).toBe(1);
  });

  test("positive: can notify/receive messages between different nodes", async () => {
    const notificatorOne = createNotificator();
    const notificatorTwo = createNotificator();

    await notificatorOne.init();
    await notificatorTwo.init();

    setTimeout(() => {
      notificatorOne.notify({ test: 1 });
    }, 100);
    const result = await new Promise((res) =>
      notificatorTwo.receive((msg) => res(msg))
    );

    expect(result.test).toBe(1);
  });
});

function createNotificator() {
  const rabbitDriver = new RabbitDriver({ endpoint, login, password, });
  const notificator = new Notificator({
    pubsub: new PubSub({
      driver: rabbitDriver,
    }),
  });

  return notificator;
}
