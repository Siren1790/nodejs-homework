async function tryCatchHandler(fn) {
  try {
    await fn;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = tryCatchHandler;
