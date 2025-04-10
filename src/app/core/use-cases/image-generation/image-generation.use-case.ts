import { environment } from "environments/environment"

type GeneratedImage = Image | null

interface Image {
  url: string;
  alt: string;
}

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string,
) => {
  try {
    const resp = await fetch(`${environment.backendApi}/image-generation`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        prompt,
        originalImage,
        maskImage,
      })
    })

    const {url, revised_prompt: alt} = await resp.json()
    return {url, alt}

  } catch (error) {
    console.error(error)
    return null
  }
}