import {DisposeBag} from './app/modules/helpers/dispose-bag';
import {Subscription} from 'rxjs';

// Create an augmentation for "rxjs"
declare module 'rxjs' {
  // Augment the 'Subscription' class definition with interface merging
  interface Subscription {
    addTo(disposeBag: DisposeBag): void;
  }
}

Subscription.prototype.addTo = (disposeBag: DisposeBag) => {
  disposeBag.add(this);
}
