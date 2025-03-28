import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsUseCase,
  prosConsStreamUseCase,
  translateTextUseCase,
  textToAudioUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
} from '@use-cases/index';
import { from } from 'rxjs';
import { audioToTextUseCase } from '../../core/use-cases/audios/audio-to-text.use-case';

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

  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }
  audioToText(file: File, prompt?: string) {
    return from(audioToTextUseCase(file, prompt));
  }

  imageGeneration(prompt: string, originalImage?: string, maskImage?: string) {
    return from(imageGenerationUseCase(prompt, originalImage, maskImage));
  }

  imageVariation(originalImage: string) {
    return from(imageVariationUseCase(originalImage));
  }
}
