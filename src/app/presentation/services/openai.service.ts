import { Injectable } from '@angular/core';
import { orthographyUseCase,prosConsUseCase, prosConsStreamUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  checkOrtography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDicusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStreamDicusser(prompt: string) {
    return prosConsStreamUseCase(prompt);
  }
}
