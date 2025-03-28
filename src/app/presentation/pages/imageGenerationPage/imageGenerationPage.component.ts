import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
@Component({
  selector: 'app-image-generation-page',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './imageGenerationPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent {
    public messages = signal<Message[]>([]);
    public isLoading = signal<boolean>(false);
    public openAiService = inject(OpenAiService);

    handleMessage(prompt: string) {
      this.isLoading.set(true);
      this.messages.update(prev => [...prev, { isGpt: false, text: prompt }]);

      this.openAiService.imageGeneration(prompt).subscribe( resp => {
        this.isLoading.set(false);
        if (!resp) return

        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text:resp.alt,
            imageInfo: resp
          }
        ]);
      })
    }



 }
