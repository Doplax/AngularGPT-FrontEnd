import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule],
  templateUrl: './dashboardLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush, //to work with signals
})
export class DashboardLayoutComponent { }
