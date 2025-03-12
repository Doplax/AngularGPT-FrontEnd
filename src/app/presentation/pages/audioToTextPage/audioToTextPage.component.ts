import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TypingLoaderComponent,
  TextMessageBoxFileComponent,
  TextMessageEvent,
} from '@components/index';
import { AudioToTextResponse } from '@interfaces/audio-text.response';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    const text = prompt ?? file.name ?? 'Traduce el audio';

    this.isLoading.set(true);

    this.messages.update((prev) => [...prev, { text, isGpt: true }]);

    this.openAiService.audioToText(file, text)
      .subscribe((response) => this.handleResponse(response));
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!resp) return;

    const text = `## Transcripción del audio:
    __Duración:__${Math.round(resp.duration)} segundos

    ## El texto es:
    ${resp.text}

    `;

    this.messages.update((prev) => [...prev, { text, isGpt: false }]);

    for (const segment of resp.segments) {
      const segmentMessage = `
      __De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
      ${segment.text}`;
      this.messages.update((prev) => [...prev, { text: segmentMessage, isGpt: false }]);
    }
  }
}
