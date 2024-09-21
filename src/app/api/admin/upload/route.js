import cloudinary from '../../../../utils/cloudinary';


export async function POST(req) {
  try {
    // Parse the request body to get the image data (Base64 or URL)
    const { image } = await req.json(); // Expecting image in Base64 format

    if (!image) {
      return new Response(JSON.stringify({ success: false, message: 'No image provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: 'tvemhtsa', // Ensure the preset is correctly configured
    });

    // Return the secure URL from Cloudinary
    return new Response(JSON.stringify({ success: true, url: uploadResponse.secure_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

