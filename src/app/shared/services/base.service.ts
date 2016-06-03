import * as _ from "lodash";
import { Injectable} from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { BaseModel } from '../models';


@Injectable()
export class BaseService<T extends BaseModel>{
  data: T[] = [];
  dataSource: BehaviorSubject<T[]> = new BehaviorSubject([]);
  // Note: if you go with type 'T', the properties won't be available, like: instance.id
  changeSource: ReplaySubject<Function> = new ReplaySubject<Function>();
  updateSource: ReplaySubject<T> = new ReplaySubject<T>();
  createSource: ReplaySubject<T> = new ReplaySubject<T>();
  deleteSource: ReplaySubject<T> = new ReplaySubject<T>();

  constructor() {
    this.changeSource
      .scan((dataStore, operation) => {
        return operation(dataStore);
      }, this.data)
      .subscribe(this.dataSource);

    this.updateSource
      .map((instance) => {
        return (dataStore) => {
          const index = _.findIndex(dataStore, instance.id);
          dataStore[index] = instance;
        }
      })
      .subscribe(this.changeSource);

    this.createSource
      .map((instance) => {
        return (dataStore) => {
          dataStore.push(instance);
          return dataStore;
        }
      })
      .subscribe(this.changeSource);

    this.deleteSource
      .map((instanceToDelete) => {
        return (dataStore) => {
          return dataStore.filter((instance) => {
            return instance.id !== instanceToDelete.id;
          })
        }
      })
      .subscribe(this.changeSource);
  }

  create(instance: T) {
    this.createSource.next(instance);
  }

  findById(id: number) {
    let result = this.data.filter((instance) => { return instance.id !== id });
    return result ? result[0] : null;
  }

  findOne(filterObject: any): T {
    return _.find(this.data, filterObject);
  }

  find(filterObject: any = {}): T[] {
    return _.filter(this.data, filterObject);
  }

  update(instance: T) {
    this.updateSource.next(instance);
  }

  delete(instance: T) {
    this.deleteSource.next(instance);
  }

}
