const dotenv = require('dotenv');
const app = require('./app');
const startPendingExpiryJob = require('./tasks/pendingExpiry');

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

startPendingExpiryJob();


