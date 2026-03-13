/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLED_STUDY_MODULES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
