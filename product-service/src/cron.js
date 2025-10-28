const cron = require('node-cron');
const { ingestAll } = require('./services/ingest');

function scheduleIngest(env) {
  const cronExpr = process.env.INGEST_CRON || env.INGEST_CRON || '*/15 * * * *';
  cron.schedule(cronExpr, async () => {
    try {
      console.log('[cron] starting ingestion');
      const count = await ingestAll({
        base: process.env.WOO_BASE,
        key: process.env.WOO_CONSUMER_KEY,
        secret: process.env.WOO_CONSUMER_SECRET
      });
      console.log(`[cron] ingestion completed: ${count} items processed`);
    } catch (err) {
      console.error('[cron] ingestion error', err);
    }
  });
}

module.exports = scheduleIngest;
