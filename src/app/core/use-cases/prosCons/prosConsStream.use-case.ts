import type { OrthographyResponse } from "@interfaces/orthography.response";
import { environment } from "environments/environment.development";

export async function* prosConsStreamUseCase(prompt: string, abortSignal:AbortSignal ) {
  try {
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt}),
      signal: abortSignal
    });

    if (!resp.ok) {
      throw new Error('Error en la petición');
    }

    const reader = resp.body?.getReader(); // En vez de un Json usamos un Reader
    if (!reader) {
      throw new Error('No se pugo generar el reader');
    }

    const decoder = new TextDecoder();// Usamos un Decoder
    let text = ''; // El texto que vamos a ir contruyendo
    while (true) {
      const {value, done} = await reader.read(); // Leemos el valor
      if (done) { break; }

      const decodedChunk = decoder.decode(value, {stream: true}); // Decodificamos el valor
      text += decodedChunk; // Lo añadimos al texto
      yield text; // Lo devolvemos
    }

    return null

  } catch (error) {
    console.error(error);
    return null
  }
}

