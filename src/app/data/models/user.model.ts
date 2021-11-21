import {Email} from './email.model';

export interface User {
  id: string;
  organizationId: string;
  name: string;
  primaryEmail: string;
  emails: Email[];
  password: string;
  role?: string;
  createdAt: string;
}
