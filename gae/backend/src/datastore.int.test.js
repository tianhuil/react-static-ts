
const { Datastore } = require('@google-cloud/datastore')

const datastore = new Datastore({apiEndpoint: process.env.DATABASE_HOST})
const kind = 'Task'
const pageSize = 1

async function runPageQuery(pageCursor) {
  // Testing pagination code here from
  // https://cloud.google.com/datastore/docs/concepts/queries#datastore-datastore-inequality-range-nodejs
  let query = datastore.createQuery('Task').limit(pageSize);

  if (pageCursor) {
    query = query.start(pageCursor);
  }
  const results = await datastore.runQuery(query);
  const entities = results[0];
  const info = results[1];

  if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
    // If there are more results to retrieve, the end cursor is
    // automatically set on `info`. To get this value directly, access
    // the `endCursor` property.
    const results = await runPageQuery(info.endCursor);

    // Concatenate entities
    results[0] = entities.concat(results[0]);
    return results;
  }

  return [entities, info];
}

async function runPageQuery2(pageCursor) {
  // Testing pagination code here from
  // https://cloud.google.com/datastore/docs/concepts/queries#datastore-datastore-inequality-range-nodejs
  let query = datastore.createQuery('Task').limit(pageSize);

  if (pageCursor) {
    query = query.start(pageCursor);
  }
  const results = await datastore.runQuery(query);
  const entities = results[0];
  const info = results[1];

  if (info.moreResults !== Datastore.NO_MORE_RESULTS && entities.length > 0) {
    // If there are more results to retrieve, the end cursor is
    // automatically set on `info`. To get this value directly, access
    // the `endCursor` property.
    const results = await runPageQuery2(info.endCursor);

    // Concatenate entities
    results[0] = entities.concat(results[0]);
    return results;
  }

  return [entities, info];
}

test('test datastore', async () => {
  await Promise.all(['a', 'b', 'c'].map((c, i) => datastore.save({
    data: { c },
    key: datastore.key([kind, i+1]),
  })))

  const [res, info] = await runPageQuery2(null)
  expect(res.length).toBe(3)
  expect(info).toBeTruthy()
})
