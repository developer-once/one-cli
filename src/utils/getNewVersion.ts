import type {} from 'semver';
import { inc } from 'semver';
import type { publishType } from '../type/index';

function getNewVersion(oldVersion: string, type: publishType) {
  const newVersion: Record<publishType, string | null> = {
    major: inc(oldVersion, 'major'),
    minor: inc(oldVersion, 'minor'),
    patch: inc(oldVersion, 'patch'),
    premajor: inc(oldVersion, 'premajor', 'beta'),
    preminor: inc(oldVersion, 'preminor', 'beta'),
    prepatch: inc(oldVersion, 'prepatch', 'beta'),
    prerelease: inc(oldVersion, 'prerelease', 'beta'),
  };
  return newVersion[type];
}

export default getNewVersion;
