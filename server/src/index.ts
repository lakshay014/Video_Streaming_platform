import { httpServer } from './live-streaming/streamingApp';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

if (!process.env.USERNAME) {
  throw new Error('USERNAME ENV IS NOT DEFINED');
}

if (!process.env.PASSWORD) {
  throw new Error('PASSWORD ENV IS NOT DEFINED');
}

if (!process.env.DB_URI) {
  throw new Error('DB_URI ENV IS NOT DEFINED');
}

const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.DB_URI, {} )
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the application if unable to connect to MongoDB
});

httpServer.listen(port, function() {
  console.log('listening on port', port);
});
