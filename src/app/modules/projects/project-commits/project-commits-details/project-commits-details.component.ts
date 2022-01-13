import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Commit} from '../../../../data/models/commit.model';
import {CommitService} from '../../../../logic/services/commit.service';
import {CommitsGetResponse} from '../../../../data/responses/commits-get.response';
import {KeyStatus} from '../../../../data/enums/keyStatus.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-project-commits-details',
  templateUrl: './project-commits-details.component.html',
  styleUrls: ['./project-commits-details.component.scss']
})
export class ProjectCommitsDetailsComponent implements OnInit {
  commit: Commit;
  private projectId: string;
  private commitId: string;

  constructor(
    private route: ActivatedRoute,
    private commitService: CommitService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
      this.commitId = params.get('commitId');
    });
  }

  ngOnInit(): void {
    this.commitService.get(this.projectId, this.commitId)
      .subscribe((response: CommitsGetResponse) => {
        this.commit = response.commit;
      });
  }

  formatCommitDate(createdAt: string) {
    const date = new Date(createdAt);

    return moment(date).format('YYYY-MM-DD [at] HH:mm');
  }

  entryStatus(status: number) {
    switch (status) {
      case KeyStatus.CREATED:
        return 'entry-created';
      case KeyStatus.EDITED:
        return 'entry-edited';
      case KeyStatus.DELETED:
        return 'entry-deleted';
    }

    return '';
  }

  getFlatManifest() {
    const flatten = [];
    for (const locale of Object.keys(this.commit.changeList.manifest)) {
      for (const key of Object.keys(this.commit.changeList.manifest[locale])) {
        flatten.push({
          locale,
          key,
          value: this.commit.changeList.manifest[locale][key],
        });
      }
    }
    return flatten;
  }
}
