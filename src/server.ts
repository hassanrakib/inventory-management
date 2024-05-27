import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    // connect to mongodb
    await mongoose.connect(config.db_uri as string);

    // start the server
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running in ${config.port} port...`);
    });
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.log((err as Error)?.message);
  }
}

main();
