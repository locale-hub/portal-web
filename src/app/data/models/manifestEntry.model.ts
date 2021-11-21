import {KeyStatus} from '../enums/keyStatus.enum';

export interface ManifestEntry {
  key: string;
  locale: string;
  value: string;
  translatable: boolean;
  status: KeyStatus;
}
