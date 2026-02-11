import type { ProsConsResponse } from "@interfaces/index";
import { environment } from "environments/environment";

export const prosConsUseCase = async (prompt: string) => {
  try {

    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt}),
    });

    if (!resp.ok) {
      throw new Error('Error en la petición');
    }
    const data = await resp.json() as ProsConsResponse;
    console.log(data);
    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    console.error(error);
    return {
      ok : false,
      role: 'error',
      content: 'No se pudo realizar la Conexión',
    }
  }
}

