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
  PREMAJOR = 'premajor',
  PREMINOR = 'preminor',
  PREPATCH = 'prepatch',
  PRERELEASE = 'prerelease',
}
