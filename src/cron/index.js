const { startCleanupDeletedUsersJob } = require('./jobs/cleanupDeletedUsers.job');

function startCronJobs() {
  if (process.env.CRON_ENABLED === 'false') {
    console.log('Cron jobs disabled (CRON_ENABLED=false)');
    return;
  }

  startCleanupDeletedUsersJob();
  console.log('Cron jobs started');
}

module.exports = { startCronJobs };
