import { ContactStore, datastore } from './model'

const kind = "testContact";

const contactStore = new ContactStore(kind);

async function clearAll() {
  const query = datastore.createQuery([kind])
                      .limit(100)
                      .select("__key__");
  const [results, _] = await datastore.runQuery(query);
  datastore.delete(results.map((r) => r[datastore.KEY]));
}

test("Check can add to database", async () => {
  await clearAll();
  await contactStore.add({email: "bob@gmail.com"});
  await contactStore.add({email: "sam@gmail.com", name: "Sam"});

  const query = datastore.createQuery([kind])
                      .limit(100)
                      .order("email");

  const [results, _] = await datastore.runQuery(query);

  expect(results[0].email).toEqual("bob@gmail.com");
  expect(results[1].email).toEqual("sam@gmail.com");
  expect(results[1].name).toEqual("Sam");
});
