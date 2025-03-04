import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsUseCase,
  prosConsStreamUseCase,
  translateTextUseCase,
} from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  checkOrtography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDicusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStreamDicusser(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translateText(prompt: string, lang: string) {
    return from(translateTextUseCase(prompt, lang));
  }
}
