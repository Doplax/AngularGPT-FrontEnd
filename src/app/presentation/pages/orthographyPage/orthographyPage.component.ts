import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessaageBoxComponent } from '@components/text-boxes/textMessaageBox/textMessaageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessaageBoxComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {


  handleMessage(prompt: string) {
    console.log({ prompt });
  }
 }
