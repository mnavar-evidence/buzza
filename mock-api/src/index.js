const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const insightsRouter = require('./routes/insights');
const campaignsRouter = require('./routes/campaigns');
const conversationRouter = require('./routes/conversation');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/insights', insightsRouter);
app.use('/campaigns', campaignsRouter);
app.use('/conversation', conversationRouter);

const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));

app.use((req, res) => {
  res.status(404).json({ error: 'not_found', message: 'Route not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Buzza mock API running on port ${PORT}`);
});
