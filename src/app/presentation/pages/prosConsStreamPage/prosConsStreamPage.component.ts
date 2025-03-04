import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  async handleMessage(prompt: string) {

    this.isLoading.set(true);

    const stream = this.openAiService.prosConsStreamDicusser(prompt);

    this.isLoading.set(false);

    for await (const text of stream) {
      console.log(text);
    }
  }
 }
