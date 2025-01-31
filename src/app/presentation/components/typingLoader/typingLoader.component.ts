import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  imports: [],
  styleUrls: ['./typingLoader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="typing">
      <span class="circle scaling"></span>
      <span class="circle scaling"></span>
      <span class="circle scaling"></span>
    </div>
  `,
})
export class TypingLoaderComponent {}
