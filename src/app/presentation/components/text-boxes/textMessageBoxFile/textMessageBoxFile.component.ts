import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface TextMessageEvent {
  prompt?: string | null;
  file: File;
}


@Component({
  selector: 'app-text-message-box-file',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
    @Input()  placeHolder: string = '';
    @Input()  disableCorrections: boolean = false;
    @Output() onMessage = new EventEmitter<TextMessageEvent>();

    public fb = inject(FormBuilder);

    public form = this.fb.group({
      prompt: [],
      file: [null, Validators.required],

    });
    public file: File | undefined

    handleSelectedFile(event: any) {
      const file = event.target.files.item(0);

      this.form.controls.file.setValue(file);

      //if (file) {
      //  this.file = file;
      //  this.form.patchValue({ prompt: file.name });
      //}
    }

    handleSubmit() {
      if (this.form.invalid) return;

      const { prompt , file } = this.form.value;
      this.onMessage.emit({prompt, file: file!});
      this.form.reset(); // Limpia la caja de texto
    }
}
