import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../data/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public size = 36;

  @Input()
  public fontSize = 1;

  @Input()
  public enableProfileLink: boolean = true;

  public initials: string;
  public circleColor: string;

  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
  ];

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initials = this.user.name
      .trim()
      .split(/[ ,]+/) // split on whitespace
      .map((part) => part[0])
      .slice(0, 2)
      .join('');

    const color = this.initials.charCodeAt(0) % this.colors.length;
    this.circleColor = this.colors[color];
  }

  onClick() {
    if (this.enableProfileLink) {
      this.router.navigate(['profiles', this.user.id]);
    }
  }
}
