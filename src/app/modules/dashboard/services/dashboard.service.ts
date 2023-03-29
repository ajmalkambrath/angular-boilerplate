import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';

import { DataObject } from 'src/app/common/models/worker-response.model';
import { DEFAULT_DATA_UI_SIZE, DEFAULT_INTERVAL, DEFAULT_SIZE } from '../../../common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private worker: Worker;
  private lastTenElements: any[] = [];
  interval: number = DEFAULT_INTERVAL;
  size: number = DEFAULT_SIZE;
  dataSizeUI: number = DEFAULT_DATA_UI_SIZE;
  additionalArrayIds: string[] = [];
  constructor() { }

  init(interval = this.interval, size = this.size) {
    if (typeof Worker !== 'undefined') {
      if (this.worker) {
        this.stopWorker();
      }
      this.worker = new Worker(new URL('../../../common/worker/dashboard.worker', import.meta.url), { type: 'module' });
      this.worker.postMessage({ interval, size });
      this.worker.addEventListener('message', this.handleWorkerMessage.bind(this));
    }
  }

  /**
   * used to handle data from worker, get last ten elements and validate additional array Ids
   * @param DataObject[]
   * @returns DataObject[]
   */
  handleWorkerMessage(event: MessageEvent<DataObject[]>): void {
    if (event) {
      this.lastTenElements = plainToInstance(DataObject, event.data).slice(-this.dataSizeUI);
      if (this.additionalArrayIds.length > 0) {
        for (let i = 0; i < this.additionalArrayIds.length; i++) {
          const element = this.lastTenElements[i];
          // Check if the array contains the element's ID and there are no duplicates in the last ten elements
          if (element && this.additionalArrayIds[i] && !this.additionalArrayIds.includes(element.id)) {
            this.lastTenElements[i].id = this.additionalArrayIds[i]; // Change the ID to the corresponding ID in the additionalArrayIds array
          }
        }
      }
    }
  }

  /**
   * used to return last ten elements
   * @param none
   * @returns Observable<DataObject[]>
   */
  getData(): DataObject[] {
    return this.lastTenElements;
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
   * used to terminate worker
   * @param none
   * @returns none
   */
  stopWorker(): void {
    this.worker?.terminate();
  }

}