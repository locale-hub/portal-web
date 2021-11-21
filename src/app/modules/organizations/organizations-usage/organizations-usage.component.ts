import { Component, OnInit } from '@angular/core';
import {OrganizationUsage} from '../../../data/models/usage.model';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from '../../../logic/services/organization.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-organizations-usage',
  templateUrl: './organizations-usage.component.html',
  styleUrls: ['./organizations-usage.component.scss']
})
export class OrganizationsUsageComponent implements OnInit {
  sdkFeatureEnabled = environment.features.sdk;
  usage: OrganizationUsage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const organizationId = params.get('organizationId');
      this.organizationService.get(organizationId).subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }
      });

      this.organizationService.usage(organizationId).subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }

        this.usage = data.usage;
      });
    });
  }
}
