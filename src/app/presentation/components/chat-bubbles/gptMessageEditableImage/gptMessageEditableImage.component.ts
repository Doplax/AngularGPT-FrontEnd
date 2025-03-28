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
  public isDrawing = signal<boolean>(false);
  public coords = signal<{x: number, y: number}>({x: 0, y: 0});


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


  onMouseDown(event: MouseEvent) {
    if (!this.canvasElement?.nativeElement) return;
    this.isDrawing.set(true);

    // Obtain the coordinates of the mouse click
    const startX = event.clientX - this.canvasElement.nativeElement.getBoundingClientRect().left;
    const startY = event.clientY - this.canvasElement.nativeElement.getBoundingClientRect().top;

    // Update the coordinates
    this.coords.set({x: startX, y: startY});

  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing()) return;
    if (!this.canvasElement?.nativeElement) return;

    const canvasRef = this.canvasElement.nativeElement;

    const currentX = event.clientX - canvasRef.getBoundingClientRect().left;
    const currentY = event.clientY - canvasRef.getBoundingClientRect().top;

    // Calculate the width and height of the rectangle
    const width = currentX - this.coords().x;
    const height = currentY - this.coords().y;

    const canvasWidth = canvasRef.width;
    const canvasHeight = canvasRef.height;

    // Clear the canvas
    const ctx = canvasRef.getContext('2d')!;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas
    ctx.drawImage(this.originalImage()!, 0, 0, canvasWidth, canvasHeight); // Draw the original image


    //ctx.fillRect( this.coords().x, this.coords().y, width, height); // Draw a fill rectangle
    ctx.clearRect( this.coords().x, this.coords().y, width, height); // Erase the rectangle


  }

  onMouseUp(event: MouseEvent) {
    this.isDrawing.set(false);

    const canvas = this.canvasElement!.nativeElement; // Get the canvas element
    const url = canvas.toDataURL('image/png'); // Convert the canvas to a data URL

    console.log(url);

    this.onSelectedImage.emit(url);

  }

  handleClick() {
    this.onSelectedImage.emit(this.imageInfo.url);
  }


}
