import { inspect } from 'util';
import logger from 'vuex/dist/logger';

const createLogger: typeof logger = _ => store => {
  store.subscribe(mutation => {
    console.info(
      '*',
      mutation.type,
      inspect(mutation.payload, { colors: true, compact: true }),
    );
  });
};

export default createLogger;
