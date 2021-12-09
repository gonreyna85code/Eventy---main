import axios from "axios";

const useImage = () => {

    const uploadImage = async (file) =>{
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'e2dcxjtm');
        formData.append("api_key", "228598698159782");

        /*    formData.append("file", file);
    
    formData.append("eager", "w_400,h_300,c_pad|w_260,h_200,c_crop");
    formData.append("public_id", "sample_image");
    formData.append("timestamp", "1315060510");
    formData.append("signature", "bfd09f95f331f558cbd1320e67aa8d488770583e"); */

        let dataimg = await axios.post( 'https://api.cloudinary.com/v1_1/dbzyomisc/image/upload', formData );
        return dataimg.data.url;
    }

    return uploadImage;

}

export default useImage;

