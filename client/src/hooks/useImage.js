import axios from "axios";

const useImage = () => {

    const uploadImage = async (file) =>{

        let img = {};
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'pb6t9xfh');
        formData.append("api_key", '228598698159782');
        formData.append("timestamp", (Date.now() / 1000) | 0);
        formData.append("skipAuthorization", true);
        
        console.log(file)
        if(file.size > 4093047){

            img.error = 'La imagen debe pesar menos de 4MB'

        } else {

            let dataimg = await axios.post( 'https://api.cloudinary.com/v1_1/dbzyomisc/image/upload', formData, {
                withCredentials: false,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "X-Requested-With": "XMLHttpRequest",

                }
            });

            img.url = dataimg.data.url;
        }
        
       
        return img;
    }

    return uploadImage;

}

export default useImage;

