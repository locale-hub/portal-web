import {Commit} from '../models/commit.model';
import {ManifestEntry} from '../models/manifestEntry.model';

export interface CommitsGetResponse {
  commit: Commit;
}
