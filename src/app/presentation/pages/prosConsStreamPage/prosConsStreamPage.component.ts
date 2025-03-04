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

  public abortSignal = new AbortController();

  async handleMessage(prompt: string) {

    this.abortSignal.abort(); // Se aborta la señal anterior
    this.abortSignal = new AbortController(); // Se crea una nueva señal

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      },
      {
        isGpt: true,
        text: '...',
      },

    ]);

    this.isLoading.set(true);

    const stream = this.openAiService.prosConsStreamDicusser(prompt, this.abortSignal.signal);

    this.isLoading.set(false);

    for await (const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(response: string) {
    this.messages().pop()
    const messages = this.messages();
    this.messages.set([...messages, { isGpt: true, text: response }]);
  }
 }
