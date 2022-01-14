import {Component, OnInit} from '@angular/core';
import {OrganizationUsage} from '../../../data/models/usage.model';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from '../../../logic/services/organization.service';
import {environment} from '../../../../environments/environment';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizations-usage',
  templateUrl: './organizations-usage.component.html',
  styleUrls: ['./organizations-usage.component.scss']
})
export class OrganizationsUsageComponent extends BaseComponent implements OnInit {
  sdkFeatureEnabled = environment.features.sdk;
  usage: OrganizationUsage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
  ) {
    super();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('organizationId')),
        mergeMap(organizationId => this.organizationService.usage(organizationId)),
        filter(data => undefined !== data),
      )
      .subscribe(data => {
        this.usage = data.usage;
      })
      .addTo(this.disposeBag);
  }
}
