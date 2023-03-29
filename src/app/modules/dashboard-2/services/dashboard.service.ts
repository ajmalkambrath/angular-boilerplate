import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { DataObject } from 'src/app/common/models/worker-response.model';
import { DEFAULT_DATA_UI_SIZE, DEFAULT_INTERVAL, DEFAULT_SIZE } from '../../../common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private worker: Worker;
  interval: number = DEFAULT_INTERVAL;
  size: number = DEFAULT_SIZE;
  dataSizeUI: number = DEFAULT_DATA_UI_SIZE;
  additionalArrayIds: string[] = [];
  data$ = new BehaviorSubject<DataObject[]>([]);

  init(interval = this.interval, size = this.size) {
    if (typeof Worker !== 'undefined') {
      if (this.worker) {
        this.stopWorker();
      }
      this.worker = new Worker(new URL('../../../common/worker/dashboard.worker', import.meta.url), { type: 'module' });
      this.worker.postMessage({ interval, size });
      this.worker.onmessage = ({ data }) => {
        this.data$.next(data);
      };
    }
  }

  /**
   * used to handle data from worker, get last ten elements and validate additional array Ids
   * @param DataObject[]
   * @returns DataObject[]
   */
  handleWorkerMessage(data: DataObject[]): DataObject[] {
    const lastTenElements = data.length > this.dataSizeUI ? data.slice(-this.dataSizeUI) : data;
    if (this.additionalArrayIds.length > 0) {
      for (let i = 0; i < this.additionalArrayIds.length; i++) {
        const element = lastTenElements[i];
        // Check if the array contains the element's ID and there are no duplicates in the last ten elements
        if (element && this.additionalArrayIds[i] && !this.additionalArrayIds.includes(element.id)) {
          lastTenElements[i].id = this.additionalArrayIds[i]; // Change the ID to the corresponding ID in the additionalArrayIds array
        }
      }
    }
    return plainToInstance(DataObject, lastTenElements);
  }

  /**
   * used to get subscription data from worker
   * @param none
   * @returns Observable<DataObject[]>
   */
  getData(): Observable<DataObject[]> {
    return this.data$.pipe(map((response) => this.handleWorkerMessage(response)))
  }

  /**
   * used to set additional array Ids from UI
   * @param additionalArrayIds: string
   * @returns none
   */
  setAdditionalArrayIds(additionalArrayIds: string): void {
    this.additionalArrayIds = additionalArrayIds?.split(',').map(id => id.trim()) || [];
  }

  /**
   * used to get updated interval | size from UI
   * @param interval: string, size: string
   * @returns none;
   */
  updateInterval(interval = this.interval, size = this.size): void {
    this.init(interval, size)
  }

  /**
   * used to terminate worker
   * @param none
   * @returns none
   */
  stopWorker(): void {
    this.worker?.terminate();
  }

}