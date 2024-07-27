import Axios_API from "Qui/utils/axiosAPI"

   export async function postImages(cloudName, formData) {
       const apiKey = '191671421757731'; // Replace with your actual API key
       const apiSecret = "rw-OZGywqJ1bazbjorxHIW0Rc-M"; // Replace with your actual API secret
       const credentials = `${apiKey}:${apiSecret}`;
       const encodedCredentials = btoa(credentials); // Base64 encode the credentials

       const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
           method: "POST",
           body: formData,
           headers: {
               Authorization: `Basic ${encodedCredentials}`
           }
       });

       const data = await res.json();
       const imageUrl = data["secure_url"];
       return imageUrl;
   }

   export async function createNewListing(data, imageUrls) {
       const { data: newListing } = await Axios_API.post('/listingS', { ...data, imageUrls });
       console.log(newListing);
       return newListing;
   }