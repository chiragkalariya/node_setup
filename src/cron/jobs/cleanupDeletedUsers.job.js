const cron = require('node-cron');
const userServices = require('../../services/user.services');

const DEFAULT_SCHEDULE = '0 2 * * *'; // daily at 2:00 AM

function startCleanupDeletedUsersJob() {
  const schedule = process.env.CRON_CLEANUP_DELETED_USERS || DEFAULT_SCHEDULE;
  const timezone = process.env.CRON_TIMEZONE;

  cron.schedule(
    schedule,
    async () => {
      try {
        const result = await userServices.purgeOldDeletedUsers();
        console.log(`[cron] cleanupDeletedUsers: removed ${result.deletedCount} user(s)`);
      } catch (error) {
        console.error('[cron] cleanupDeletedUsers failed:', error?.message || error);
      }
    },
    timezone ? { timezone } : undefined,
  );

  console.log(`[cron] cleanupDeletedUsers scheduled (${schedule})`);
}

module.exports = { startCleanupDeletedUsersJob };
