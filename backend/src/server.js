import app from './app';

const port = process.env.PORT || 3003;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log('API is running on port', port);
});
