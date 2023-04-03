import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DataObject } from 'src/app/common/models/worker-response.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-2',
  templateUrl: './dashboard-2.component.html',
  styleUrls: ['./dashboard-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard2Component implements OnInit, OnDestroy {
  additionalIds: string = '';
  interval = this.dashboardService.interval;
  size = this.dashboardService.size;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.init();
  }

  get data() {
    return this.dashboardService.getData();
  }

  /**
   * used to update worker when interval or size change
   * @param none
   * @returns none
   */
  updateWorker(): void {
    this.dashboardService.updateInterval(this.interval, this.size);
  }

  /**
   * used to stop worker from UI
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
  onAdditionalArrayIdsChange(additionalArrayIds: string): void {
    this.dashboardService.setAdditionalArrayIds(additionalArrayIds)
  }

  trackByFn(index: number, item: DataObject): string {
    return item.id;
  }

  ngOnDestroy() {
    // Terminate the web-worker when the component is destroyed
    this.stopWorker();
  }
}
