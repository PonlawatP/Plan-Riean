export default async function uploadImageToImgbb(base64Image: string) {
  const formData = createFormData(base64Image);
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_SECERT}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    console.error('Image upload failed');
    return { data: { thumb: { url: '' } } };
  }

  const result = await response.json();
  return result;
}

function createFormData(base64Image: string) {
  const mime = 'image/jpeg'; // or the appropriate mime type
  const blob = base64ToBlob(base64Image, mime);
  const formData = new FormData();
  formData.append('image', blob, 'image.jpg');
  return formData;
}

function base64ToBlob(base64: string, mime: string) {
  let byteString = atob(base64.split(',')[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
}
