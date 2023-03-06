export type developerOnceNpmName = `@developer-once/${string}`;
export type templateInfo = {
  name: string;
  npmName: developerOnceNpmName;
  version: string;
  framework: string | null;
  language: string;
};
export enum publishType {
  PATCH = 'patch',
  MINOR = 'minor',
  MAJOR = 'major',
  // BETA = 'beta',
}
