import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { DataObject } from 'src/app/common/models/worker-response.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  dataForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.startWorker();
    this.loadComponentInitData();
  }

  get data() {
    return this.dashboardService.getData();
  }

  /**
   * used to load component initializing data
   * @param none
   * @returns none
   */
  loadComponentInitData(): void {
    this.createForm();
    this.handleFormChanges();
  }

  /**
   * used to create form elements
   * @param none
   * @returns none
   */
  createForm(): void {
    this.dataForm = this.fb.group({
      timer: [this.dashboardService.interval],
      arraySize: [this.dashboardService.size],
      additionalIds: ''
    });
  }

  /**
   * used to handle form changes for dataForm
   * @param none
   * @returns none
   */
  handleFormChanges(): void {
    const timerControl = this.dataForm.get('timer');
    const arraySizeControl = this.dataForm.get('arraySize');

    combineLatest([
      this.dataForm.get('timer')?.valueChanges
        .pipe(startWith(this.dashboardService.interval)),
      this.dataForm.get('arraySize')?.valueChanges
        .pipe(startWith(this.dashboardService.size))
    ])
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
      ).subscribe((response) => {
        this.dashboardService.startWorker(timerControl?.value, arraySizeControl?.value)
      });

    this.dataForm.get('additionalIds')?.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe((additionalIds) => this.dashboardService.setAdditionalArrayIds(additionalIds));
  }

  trackByFn(index: number, item: DataObject): string {
    return item.id;
  }

  ngOnDestroy() {
    // Terminate the web-worker when the component is destroyed
    this.dashboardService?.stopWorker();
  }
}
