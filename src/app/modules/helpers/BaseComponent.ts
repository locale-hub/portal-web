import {Project} from '../../data/models/project.model';
import {Organization} from '../../data/models/organization.model';
import {User} from '../../data/models/user.model';
import {ProjectUsage} from '../../data/models/usage.model';
import {App} from '../../data/models/app.model';
import {DisposeBag} from './dispose-bag';
import {Component, OnDestroy} from '@angular/core';


@Component({ template: '' })
export abstract class BaseComponent implements OnDestroy {
  protected disposeBag: DisposeBag;

  protected constructor() {
    this.disposeBag = new DisposeBag();
  }

  public ngOnDestroy(): void {
    this.disposeBag.unsubscribe();
  }

  public trackByOrganizationId(index: number, item: Organization) {
    return item.id;
  }

  public trackByProjectId(index: number, item: Project) {
    return item.id;
  }

  public trackByAppId(index: number, item: App) {
    return item.id;
  }

  public trackByProjectUsageName(index: number, item: ProjectUsage) {
    return item.name;
  }

  public trackByUserId(index: number, item: User) {
    return item.id;
  }

}
