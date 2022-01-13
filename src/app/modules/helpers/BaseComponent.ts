import {Project} from '../../data/models/project.model';
import {Organization} from '../../data/models/organization.model';
import {User} from '../../data/models/user.model';
import {ProjectUsage} from '../../data/models/usage.model';
import {App} from '../../data/models/app.model';

export abstract class BaseComponent {

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
