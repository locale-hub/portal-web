import {StripePaymentMethod} from '../models/StripePaymentMethod';

export interface OrganizationsPaymentMethodsGetResponse {
  paymentMethods: StripePaymentMethod[];
}
