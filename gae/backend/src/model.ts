import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({apiEndpoint: process.env.DATABASE_HOST});

export interface IContact {
  email: string;
  name?: string;
}

const kind = "Contact";

export const ContactStore = {
  async add<T extends IContact>(contact: T): Promise<string> {
    const key = datastore.key([kind, Date.now()]);
    await datastore.save({
      data: contact,
      key,
    });
    if (!key.id) {
      throw Error("Invalid Key at Contact Add");
    }
    return key.id;
  },
  async list<T extends IContact>(token: string, limit: number): Promise<[T[], string | undefined]> {
    const query = datastore.creaeQuery([kind])
      .limit(limit)
      .start(token);

    const [results, info] = await datastore.runQuery(query);
    const nextCursor = (info.moreResults !== Datastore.NO_MORE_RESULTS) ? info.endCursor : undefined;
    return [results as T[], nextCursor];
  },
};
