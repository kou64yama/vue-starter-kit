if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.ts` from inside the client-side code.',
  );
}

export = {
  port: process.env.PORT || 3000,
};
