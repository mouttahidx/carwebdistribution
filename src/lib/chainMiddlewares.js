

// Function to apply middlewares sequentially
export function applyMiddlewares(req, middlewares) {
  return middlewares.reduce(
    async (prevResponse, nextMiddleware) => {
      const res = await prevResponse;
      return res ? res : nextMiddleware(req);
    },
    Promise.resolve(null)
  );
}
