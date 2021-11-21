
export interface Manifest {
  locales: string[];
  keys: string[];
  manifest: { [locale: string]: { [key: string]: string } };
}
