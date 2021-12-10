import axios from "axios";

const useImage = () => {

    const uploadImage = async (file) =>{
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'pb6t9xfh');
        formData.append("api_key", "228598698159782");
        formData.append("api_secret", "oHVjRT-xz5T6GP7Uq-82NaW1Ybc");

        //let dataimg = await axios.post( 'https://api.cloudinary.com/v1_1/dbzyomisc/image/upload', formData, {headers: { 'Content-Type': 'multipart/formdata', 'Access-Control-Allow-Origin': '*' }} );
        
        let url = 'https://api.cloudinary.com/v1_1/dbzyomisc/image/upload';
        const image = await fetch(url, { method: "POST", body: formData });
        const result = await image.json();
        console.log('Response', result);
        
        return result.url;
    }

    return uploadImage;

}

export default useImage;

