import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITextMessageEvent } from '../textMessageBoxFile/textMessageBoxFile.component';

interface IOption {
  id: string;
  text:string;
}

export interface ITextMessageBoxEvent {
  prompt: string;
  selectedOption: string
}

@Component({
  selector: 'app-text-message-box-select',
  imports: [ReactiveFormsModule],
  templateUrl: './textMessageBoxSelect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {

      @Input()  placeHolder: string = '';
      @Input()  disableCorrections: boolean = false;
      @Input({required: true})  options!: IOption[];
      @Output() onMessage = new EventEmitter<ITextMessageBoxEvent>();

      public fb = inject(FormBuilder);

      public form = this.fb.group({
        prompt:  ["", Validators.required],
        selectedOption: ["", Validators.required],

      });
      public file: File | undefined


      handleSubmit() {
        if (this.form.invalid) return;

        const { prompt , selectedOption } = this.form.value;
        this.onMessage.emit({prompt: prompt! , selectedOption: selectedOption! });
        this.form.reset(); // Limpia la caja de texto
      }
}
