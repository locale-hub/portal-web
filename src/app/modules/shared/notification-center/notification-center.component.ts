import {Component, OnInit} from '@angular/core';
import {Notification} from '../../../data/models/notification.model';
import {NotificationService} from '../../../logic/services/notification.service';
import {NavigationEnd, Router} from '@angular/router';
import {NotificationStatus} from '../../../data/enums/notification-status.enum';
import {CreateAppComponent} from '../create-app/create-app.component';
import {ModalComponent} from '../modal/modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent implements OnInit {
  opened = false;
  showStatus = NotificationStatus.UNREAD;
  notificationStatus = NotificationStatus;

  allNotifications: Notification[];

  constructor(
    private notificationsService: NotificationService,
    private router: Router,
    public dialog: MatDialog
  ) {
    router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        this.notificationsService.list().subscribe(data => {
          if (undefined === data) {
            return;
          }
          this.allNotifications = data.notifications;
        });
      }
    });
  }

  ngOnInit(): void {
    this.notificationsService.list().subscribe(data => {
      if (undefined === data) {
        return;
      }
      this.allNotifications = data.notifications;
    });
  }

  newNotificationsCount() {
    return this.listByStatus(NotificationStatus.UNREAD).length;
  }

  toggleNotification() {
    this.opened = !this.opened;
  }

  discard(id: string) {
    this.notificationsService.discard(id).subscribe(() => {
      this.allNotifications = this.allNotifications.map((notification) => {
        if (id === notification.id) {
          notification.status = NotificationStatus.READ;
        }
        return notification;
      });
    });
  }

  listByStatus(status: NotificationStatus): Notification[] {
    return this.allNotifications
      .filter((n) => status === n.status)
      ?? [];
  }

  clearText(text: string) {
    return text.replace(/<[^>]*>/g, ' ');
  }

  show(notification: Notification) {
    this.dialog
      .open(ModalComponent, {
        data: {
          title: notification.title,
          text: notification.text,
        }
      })
      .afterClosed()
      .subscribe(() => this.opened = true);
  }
}
