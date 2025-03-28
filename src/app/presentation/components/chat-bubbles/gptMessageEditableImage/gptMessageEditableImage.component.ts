import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gpt-message-editable-image',
  imports: [],
  templateUrl: './gptMessageEditableImage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageEditableImageComponent implements AfterViewInit{


  @Input({required: true}) public text!: string;
  @Input({required: true}) public imageInfo!: { url: string; alt: string; };
  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;

  @Output() onSelectedImage = new EventEmitter<string>();

  public originalImage =  signal<HTMLImageElement| null>(null);

  ngAfterViewInit(): void {
  if ( !this.canvasElement?.nativeElement) return;

  const canvas = this.canvasElement.nativeElement;
  const ctx = canvas.getContext('2d');

  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = this.imageInfo.url;

  this.originalImage.set(image);

  image.onload = () => {
    ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

  }

  }

  handleClick() {
    this.onSelectedImage.emit(this.imageInfo.url);
  }


}
