import * as _ from "lodash";
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

import { BaseModel } from '../models';


@Injectable()
export class BaseService<T extends BaseModel> {
  dataSource: BehaviorSubject<T[]> = new BehaviorSubject([]);
  currentSource: BehaviorSubject<T> = new BehaviorSubject<T>(null);
  currentIdSource: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  // Note: if you go with type 'T', the properties won't be available, like: instance.id
  changeSource: ReplaySubject<Function> = new ReplaySubject<Function>();
  updateSource: ReplaySubject<T> = new ReplaySubject<T>();
  createSource: ReplaySubject<T> = new ReplaySubject<T>();
  deleteSource: ReplaySubject<T> = new ReplaySubject<T>();

  constructor(private entityType = null,
              private ClassT: any = null) {

    // localStorage READ & WRITE
    if (this.entityType) {
      // Load data from localStorage
      let storedData = JSON.parse(localStorage.getItem(this.entityType));
      if (storedData) {
        // Instantiate the elements
        storedData = plainToClass(ClassT, storedData as Object[]);
        // console.log(storedData);
        this.dataSource.next(storedData);
        // console.log('READ', this.entityType, storedData);
      }

      // Save data to localStorage on changes
      this.dataSource.subscribe((dataStore) => {
        localStorage.setItem(this.entityType, JSON.stringify(dataStore));
        // console.log('WRITE', this.entityType, JSON.stringify(dataStore));
      });
    }


    // Create the current instance stream
    Observable.combineLatest(this.dataSource, this.currentIdSource)
              .map((combinedData) => {
                let dataStore, currentId;
                [dataStore, currentId] = combinedData;
                return _.find(dataStore, { _id: currentId }) || _.get(dataStore, 0, null);
              })
              .subscribe(this.currentSource);

    this.changeSource
        .scan((dataStore, operation) => {
          return operation(dataStore);
        }, this.dataSource.getValue())
        .subscribe(this.dataSource);

    this.updateSource
        .map((instance) => {
          return (dataStore) => {
            const index = _.findIndex(dataStore, { _id: instance._id });
            dataStore[index] = instance;
            return dataStore;
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
              return instance._id !== instanceToDelete._id;
            })
          }
        })
        .subscribe(this.changeSource);
  }

  first(filter: (instance: T) => boolean): Observable<T[]> {
    return this.dataSource.map((instanceArray: T[]) => {
      return _.get(instanceArray.filter(filter), 0, null);
    });
  }

  setCurrentById(id: string) {
    this.currentIdSource.next(id);
  }

  create(instance: T) {
    this.createSource.next(instance);
  }

  filter(filter: (instance: T) => boolean): Observable<T[]> {
    return this.dataSource.map(instanceArray => instanceArray.filter(filter));
  }

  findById(id: string): T {
    let result = this.dataSource.getValue().filter((instance) => {
      return instance._id === id
    });
    return result ? result[0] : null;
  }

  findOne(filterObject: any) {
    return _.find(this.dataSource.getValue(), filterObject);
  }

  find(filterObject: any = {}) {
    return _.filter(this.dataSource.getValue(), filterObject);
  }

  update(instance: T) {
    this.updateSource.next(instance);
  }

  delete(instance: T) {
    this.deleteSource.next(instance);
  }

}
