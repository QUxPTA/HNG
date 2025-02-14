// Image upload utility using ImgBB API
export async function uploadImage(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
  if (!apiKey) {
    throw new Error('ImgBB API key not found in environment variables');
  }

  // Convert file to base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(reader.error);
  });

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', base64);

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('ImgBB API Error:', errorData);
      throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.data.display_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
