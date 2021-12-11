import axios from "axios";

const useImage = () => {

    const uploadImage = async (file) =>{
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'pb6t9xfh');
        formData.append("api_key", '228598698159782');
        formData.append("timestamp", (Date.now() / 1000) | 0);
        formData.append("skipAuthorization", true);
        

        let dataimg = await axios.post( 'https://api.cloudinary.com/v1_1/dbzyomisc/image/upload', formData, {
            withCredentials: false,
            headers: {
                'Content-Type': 'multipart/form-data',
                "X-Requested-With": "XMLHttpRequest",

              }
        });
        return dataimg.data.url;
    }

    return uploadImage;

}

export default useImage;

