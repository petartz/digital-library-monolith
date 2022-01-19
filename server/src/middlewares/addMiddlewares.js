import addEnvironmentMiddlewares from "./addEnvironmentMiddlewares.js";
import addExpressSession from "./addExpressSession.js";
import addClientMiddlewares from "./addClientMiddlewares.js";

const addMiddlewares = async app => {
  addExpressSession(app);
  await addClientMiddlewares(app);
  await addEnvironmentMiddlewares(app);
};

export default addMiddlewares;
