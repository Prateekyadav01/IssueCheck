const url=`https://api.cloudinary.com/v1_1/dujjvqorv/image/upload`
const uploadImage = async(image) => {
const formData=new FormData();
formData.append("file" , image)
formData.append("upload_preset", "mern-zsshop")
const dataResponse=await fetch(url ,{
  method: 'POST',
  body: formData
} )
return dataResponse.json()
}
export default uploadImage
