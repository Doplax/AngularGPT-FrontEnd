import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { ITextMessageEvent, TextMessageBoxFileComponent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { ITextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    //TextMessageBoxComponent,
    //TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([ { text: 'Hola, ¿en qué puedo ayudarte?', isGpt: true } ]);
  public isLoading = signal<boolean>(false);

  handleMessage({prompt , file}: ITextMessageEvent) {
    console.log({ prompt ,file });
  }

  handleMessageWithFile({prompt , file}: ITextMessageEvent) {
    console.log({ prompt ,file });
  }

  handleMessageWithSelect({ prompt, selectedOption }: ITextMessageBoxEvent) {
    console.log({ prompt ,selectedOption });
  }
 }
