import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.messages.update((prev) => [
      ...prev,
      { isGpt: false, text: prompt,   },
    ]);

    this.isLoading.set(true);
    this.openAiService.prosConsDicusser(prompt).subscribe((response) => {

      this.messages.update((prev) => [
        ...prev,
        { text: response.content, isGpt: true,  },
      ]);
      this.isLoading.set(false);
    });
  }
}
