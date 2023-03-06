import type {} from 'semver';
import { inc } from 'semver';
import type { publishType } from '../type/index';

function getNewVersion(oldVersion: string, type: publishType) {
  const newVersion: Record<publishType, string | null> = {
    major: inc(oldVersion, 'major'),
    minor: inc(oldVersion, 'minor'),
    patch: inc(oldVersion, 'patch'),
    // premajor: inc(oldVersion, 'premajor'),
    // preminor: inc(oldVersion, 'preminor'),
    // prepatch: inc(oldVersion, 'prepatch'),
    // prerelease: inc(oldVersion, 'prerelease'),
  };
  return newVersion[type];
}

export default getNewVersion;
