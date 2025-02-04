import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-messaage-box',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './textMessaageBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessaageBoxComponent {

  @Input()  placeHolder: string = '';
  @Input()  disableCorrections: boolean = false;
  @Output() onMessage = new EventEmitter<string>();



  public fb = inject(FormBuilder);

  public form = this.fb.group({
    prompt: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt } = this.form.value;
    //console.log({prompt});
    this.onMessage.emit(prompt ?? '');
    this.form.reset(); // Limpia la caja de texto
  }

}
