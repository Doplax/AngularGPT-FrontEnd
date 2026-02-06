import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="path"
      routerLinkActive="bg-white/10"
      class="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group"
    >
      <div class="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center mt-0.5">
        <i class="{{ icon }} text-lg text-indigo-400 group-hover:text-indigo-300 transition-colors"></i>
      </div>
      <div class="flex flex-col flex-grow min-w-0">
        <span class="text-white text-sm font-medium">{{ title }}</span>
        <span class="text-gray-500 text-xs truncate">{{ description }}</span>
      </div>
    </a>
  `,
})
export class SidebarMenuItemComponent implements OnInit {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) path!: string;

  ngOnInit() {
  }
}
