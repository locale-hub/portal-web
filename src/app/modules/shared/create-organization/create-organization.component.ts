import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../logic/services/message.service';
import {Organization} from '../../../data/models/organization.model';
import {OrganizationService} from '../../../logic/services/organization.service';
import {PlansType} from '../../../data/enums/PlansType.enum';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent {
  organizationFrom: FormGroup;
  organization: Organization = {
    id: '',
    name: '',
    createdAt: '',
    isMonthlyPlan: false,
    plan: PlansType.FREE,
    stripeCustomerId: '',
    paymentMethodId: null,
    subscriptionId: '',
    owner: '',
    users: [],
  };

  constructor(
    public dialogRef: MatDialogRef<CreateOrganizationComponent>,
    private organizationsService: OrganizationService,
    private messageService: MessageService
  ) {
    this.organizationFrom = new FormGroup({
      name: new FormControl(this.organization.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  create() {
    this.organizationsService.create(this.organization)
      .subscribe((data) => {
        if (undefined === data) {
          return;
        }

        const organization = data.organization;
        this.messageService.log(`Organization ${organization.name} created!`);
        this.dialogRef.close(organization);
      });
  }

  close() {
    this.dialogRef.close(undefined);
  }
}
