import {UserRoles} from '../enums/UserRoles.enum';

export interface UserGroupEntry {
  id: string;
  role: UserRoles;
}
