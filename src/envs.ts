/** biome-ignore-all lint/suspicious/noConsole: debugging consle */

import dotenv from "dotenv";
import env from "env-var";

dotenv.config();
const get = env.get;

export const envs = {
  PORT: get("PORT").required().asIntPositive(),
  NODE_ENV: get("NODE_ENV").default("development").asString(),
  PUBLIC_URL: get("PUBLIC_URL").default("http://localhost:3000").asString(),
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
};

// evaluar para devolver un array con los errores si faltan variables de entorno
const validateEnvs = () => {
  const errors: string[] = [];
  for (const key of Object.keys(envs)) {
    try {
      envs[key as keyof typeof envs];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      errors.push(`Error en ${key}: ${errorMessage}`);
    }
  }
  return errors;
};

export const ErrorMessages = {
  MISSING_ENVS: "Faltan variables de entorno necesarias.",
};

export const ShowErrors = () => {
  const errors = validateEnvs();
  if (errors.length > 0) {
    console.error(ErrorMessages.MISSING_ENVS);
    for (const error of errors) {
      console.error(` - ${error}`);
    }
  }
};
