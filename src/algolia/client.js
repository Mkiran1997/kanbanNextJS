import algoliasearch from "algoliasearch";

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
console.log("ALGOLIA_APP_ID", ALGOLIA_APP_ID);
const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY;

const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);
export const algoliaIndex = algoliaClient.initIndex(process.env.ALGOLIA_INDEX);
