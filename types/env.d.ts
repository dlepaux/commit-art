export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv { // eslint-disable-line @typescript-eslint/consistent-type-definitions
      DEPLOY_KEY_PRIVATE: string;
      DEPLOY_KEY_PUBLIC: string;
      GIT_SSH_CANVAS: string;
      GIT_CONFIG_NAME: string;
      GIT_CONFIG_USERNAME: string;
      GIT_CONFIG_EMAIL: string;
    }
  }
}
