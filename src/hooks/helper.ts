export const wrapServiceWithCatch = (service: Promise<any>) => {
  return service.catch((e) => Promise.reject(e.errors));
};
