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
  TextMessageBoxSelectComponent,
  TextMessageBoxEvent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { TextMessageBoxComponent } from '../../components/text-boxes/textMessageBox/textMessageBox.component';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  public voices = signal([
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ]);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    const message = `${selectedOption} - ${prompt}`;


    this.messages.update(prev => [...prev, { text: message, isGpt: false }]);
    this.isLoading.set(true);

    this.openAiService.textToAudio(message, selectedOption)
      .subscribe(({message,audioUrl}) => {
        this.messages.update(prev => [...prev,
          {
            text: message,
            isGpt: true,
            audioUrl
          }]);
        this.isLoading.set(false);
      })};
}
