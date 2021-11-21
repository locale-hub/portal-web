import {PlansType} from '../enums/PlansType.enum';

export interface Organization {
  id: string;
  owner: string;
  name: string;
  users: string[]; // user emails
  stripeCustomerId: string;
  plan: PlansType;
  subscriptionId: string | null;
  paymentMethodId: string | null;
  isMonthlyPlan: boolean;
  createdAt: string;
}
