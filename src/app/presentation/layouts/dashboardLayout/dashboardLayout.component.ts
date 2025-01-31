import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule],
  templateUrl: './dashboardLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush, //to work with signals
})
export class DashboardLayoutComponent { }
