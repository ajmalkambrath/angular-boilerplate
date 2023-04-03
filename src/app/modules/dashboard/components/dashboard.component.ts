import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DataObject } from 'src/app/common/models/worker-response.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  additionalIds: string = '';
  interval = this.dashboardService.interval;
  size = this.dashboardService.size;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.startWorker()
    this.onAdditionalArrayIdsChange(this.additionalIds); // Initializing additionalIds in case of first call
  }

  get data() {
    return this.dashboardService.getData();
  }

  /**
   * used to start worker
   * @param none
   * @returns none
   */
  startWorker(): void {
    this.dashboardService.init(this.interval, this.size);
  }
  /**
   * used to stop worker
   * @param none
   * @returns none
   */
  stopWorker(): void {
    this.dashboardService?.stopWorker();
  }
  /**
   * used to set additional array  value chnage
   * @param additionalArrayIds: string
   * @returns none
   */
  onAdditionalArrayIdsChange(additionalArrayIds: string) {
    this.dashboardService.setAdditionalArrayIds(additionalArrayIds);
  }

  trackByFn(index: number, item: DataObject): string {
    return item.id;
  }

  ngOnDestroy() {
    // Terminate the web-worker when the component is destroyed
    this.stopWorker();
  }
}
