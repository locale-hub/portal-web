import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../logic/services/organization.service';
import {Organization} from '../../data/models/organization.model';
import {AuthService} from '../../logic/services/auth.service';
import {User} from '../../data/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {BaseComponent} from '../helpers/BaseComponent';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent extends BaseComponent implements OnInit {
  organization: Organization;
  user: User;

  isReducedMenu: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private organizationService: OrganizationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.authService.user();

    this.route.paramMap
      .pipe(
        mergeMap((params) => this.organizationService.get(params.get('organizationId')))
      ).subscribe(async (data) => {
        if (undefined === data) {
          return await this.router.navigate(['/']);
        }
        this.organization = data.organization;
      })
      .addTo(this.disposeBag);
  }

}
