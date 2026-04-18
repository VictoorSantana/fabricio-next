import cron from 'node-cron';

export function startScheduledJobs() {
  cron.schedule('*/15 * * * *', () => {
    console.log('⏱️ Sincronizando dados a cada 15 minutos...');
    // Lógica de sincronização
  });
}