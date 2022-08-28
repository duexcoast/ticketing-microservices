import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/users/currentuser', (req, res) => {
  res.send('hi there');
});

app.listen(3000, () => {
  console.log(`
  🔑 Auth Service
  📡 listening on port 3000
  `);
});
