import {Component, OnInit} from '@angular/core';
import {BundleService} from '../../../logic/services/bundle.service';
import {ActivatedRoute} from '@angular/router';
import {FileFormat} from '../../../data/enums/FileFormat.enum';
import {MessageService} from '../../../logic/services/message.service';
import {BaseComponent} from '../../helpers/BaseComponent';

@Component({
  selector: 'app-project-exports',
  templateUrl: './project-exports.component.html',
  styleUrls: ['./project-exports.component.scss']
})
export class ProjectExportsComponent extends BaseComponent implements OnInit {

  projectId: string;

  constructor(
    private route: ActivatedRoute,
    private bundleService: BundleService,
    private messageService: MessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.projectId = params.get('projectId');
      })
      .addTo(this.disposeBag);
  }

  getAndroidBundle() {
    this.bundleService
      .get(this.projectId, FileFormat.ANDROID)
      .subscribe((data) => {
        this.download(data);
      })
      .addTo(this.disposeBag);
  }

  getIOSBundle() {
    this.bundleService
      .get(this.projectId, FileFormat.IOS)
      .subscribe((data) => {
        this.download(data);
      })
      .addTo(this.disposeBag);
  }

  download(data: any) {
    if (undefined === data) {
      return;
    }

    const blob = new Blob([data], { type: 'application/zip'});
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
      return alert('Please disable your Pop-up blocker and try again.');
    }
    this.messageService.log(`Downloading your bundle...`);
  }
}
