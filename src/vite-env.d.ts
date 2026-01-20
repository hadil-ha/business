/// <reference types="vite/client" />

/**
 * Environment variables type definitions
 */
interface ImportMetaEnv {
  /** Google Apps Script Web App URL for lead form submission */
  readonly VITE_GAS_WEBAPP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
