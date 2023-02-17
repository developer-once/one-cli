export type developerOnceNpmName = `@developer-once/${string}`;
export type templateInfo = {
  name: string;
  npmName: developerOnceNpmName;
  version: string;
  framework: string | null;
  language: string;
};
