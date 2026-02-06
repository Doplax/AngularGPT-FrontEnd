import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMessageEvent } from '../textMessageBoxFile/textMessageBoxFile.component';

interface Option {
  id: string;
  text:string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOption: string
}

@Component({
  selector: 'app-text-message-box-select',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './textMessageBoxSelect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {

      @Input()  placeHolder: string = '';
      @Input()  disableCorrections: boolean = false;
      @Input({required: true})  options!: Option[];
      @Output() onMessage = new EventEmitter<TextMessageBoxEvent>();

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
