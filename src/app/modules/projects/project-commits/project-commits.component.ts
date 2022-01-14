import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import _mapValues from 'lodash-es/mapValues';
import _groupBy from 'lodash-es/groupBy';
import _sortBy from 'lodash-es/sortBy';
import _toPairs from 'lodash-es/toPairs';
import * as moment from 'moment';

import {CommitService} from 'src/app/logic/services/commit.service';
import {Commit} from 'src/app/data/models/commit.model';
import {MatDialog} from '@angular/material/dialog';
import {PublishCommitComponent} from '../../shared/publish-commit/publish-commit.component';
import {MessageService} from '../../../logic/services/message.service';
import {OrganizationService} from '../../../logic/services/organization.service';
import {ProjectService} from '../../../logic/services/project.service';
import {User} from '../../../data/models/user.model';
import {Clipboard} from '@angular/cdk/clipboard';
import {BaseComponent} from '../../helpers/BaseComponent';
import {filter, map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-project-commits',
  templateUrl: './project-commits.component.html',
  styleUrls: ['./project-commits.component.scss']
})
export class ProjectCommitsComponent extends BaseComponent implements OnInit {
  projectId: string;
  commits: Commit[];
  users: User[];

  selectedBranch = 'master';

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private organizationService: OrganizationService,
    private commitsService: CommitService,
    private messageService: MessageService,
    private clipboard: Clipboard
  ) {
    super();
  }

  ngOnInit(): void {
    const projectId$ = this.route.paramMap
      .pipe(
        map((params) => params.get('projectId')),
        tap(projectId => this.projectId = projectId)
      );

    projectId$
      .pipe(
        mergeMap(projectId => this.commitsService.list(projectId)),
        filter(data => undefined !== data),
      )
      .subscribe(data => {
        this.commits = data.commits;
      })
      .addTo(this.disposeBag);

    projectId$
      .pipe(
        mergeMap(projectId => this.projectService.get(projectId)),
        filter(data => undefined !== data),
        map(data => data.project),
        mergeMap(project => this.organizationService.users(project.organizationId)),
        filter(data => undefined !== data),
      )
      .subscribe(data => {
        this.users = data.users;
      })
      .addTo(this.disposeBag);
  }

  publishCommit(id: string) {
    this.dialog
      .open(PublishCommitComponent, {
        data: {
          projectId: this.projectId,
          commitId: id,
        },
      })
      .afterClosed()
      .subscribe((published: boolean) => {
        if (undefined === published || false === published) {
          return;
        }
        this.messageService.log('Your content has been published');
        this.ngOnInit();
      })
      .addTo(this.disposeBag);
  }

  async showCommitDetails(id: string) {
    await this.router.navigate([id], {relativeTo: this.route});
  }

  commitsPerDate = () => {
    const result = _mapValues(
      _groupBy(this.commits, (commit: Commit) => {
        const date = new Date(commit.createdAt);
        return `${date.getFullYear()}-${String((date.getMonth() + 1)).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      }),
      commits => commits.map(commit => commit)
    );

    return _sortBy(_toPairs(result), 0).reverse();
  };

  formatCommitDate = (commit: Commit): string => {
    const date = new Date(commit.createdAt);
    return moment(date).format('YYYY-MM-DD [at] HH:mm');
  };

  getCommitAuthor(commit: Commit): User {
    return this.users.filter((u) => u.id === commit.authorId)[0] ?? null;
  }

  copyToClipboard(content) {
    this.clipboard.copy(content);
    this.messageService.log('Commit id copied in clipboard');
  }

  displayDeployedCommitTooltip() {
    this.messageService.log('This commit is already deployed');
  }
}
