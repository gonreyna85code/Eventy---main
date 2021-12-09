import axios from "axios";

const useImage = () => {

    const uploadImage = async (file) =>{
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'e2dcxjtm');
        formData.append("api_key", "228598698159782");
        formData.append("api_secret", "oHVjRT-xz5T6GP7Uq-82NaW1Ybc");

        let dataimg = await axios.post( 'https://api.cloudinary.com/v1_1/dbzyomisc/image/upload', formData );
        return dataimg.data.url;
    }

    return uploadImage;

}

export default useImage;

