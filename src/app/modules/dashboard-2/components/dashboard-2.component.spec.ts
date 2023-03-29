import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../services/dashboard.service';

import { Dashboard2Component } from './dashboard-2.component';

describe('Dashboard2Component', () => {
  let component: Dashboard2Component;
  let fixture: ComponentFixture<Dashboard2Component>;
  let dashboardService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dashboard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    dashboardService = new DashboardService();
    fixture = TestBed.createComponent(Dashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
