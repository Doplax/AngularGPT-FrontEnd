import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  imports: [],
  styleUrls: ['./typingLoader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full text-gray-100 border-b border-gray-800/50">
      <div class="flex gap-4 p-6 max-w-4xl mx-auto">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <div class="w-8 h-8 rounded-sm bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <i class="fa-solid fa-robot text-sm text-white"></i>
          </div>
        </div>

        <!-- Typing Animation -->
        <div class="flex-1">
          <div class="typing">
            <span class="circle scaling"></span>
            <span class="circle scaling"></span>
            <span class="circle scaling"></span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TypingLoaderComponent {}
