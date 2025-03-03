import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent
} from '@components/index';
import { ITextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { GptMessageOrthographyComponent } from "../../components/chat-bubbles/gptMessageOrthography/gptMessageOrthography.component";

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    ChatMessageComponent,
    GptMessageOrthographyComponent
],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string): any {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    this.openAiService.checkOrtography(prompt).subscribe((response) => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        { text: response.message, isGpt: true, info: response },
      ]);
    });
  }
}
