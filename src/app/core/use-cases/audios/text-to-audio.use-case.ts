import type { OrthographyResponse } from "@interfaces/orthography.response";
import { environment } from "environments/environment.development";

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {

    const resp = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt, voice}),
    });

    if (!resp.ok) {
      throw new Error('Error en la petición');
    }

    const audioFile = await resp.blob(); // This is the audio file
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl,
    }

  } catch (error) {
    console.error(error);
    return {
      ok : false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la corrección',
    }
  }
}

