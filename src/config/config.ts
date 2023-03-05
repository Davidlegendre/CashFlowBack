export const Config = () =>{
  return {
    port: process.env.PORT,
    database: {
      host: process.env.MONGODB_URI,
    },
    apikey: process.env.APIKEY,
    cloudinaryAPI: process.env.CLOUDINARY_URL,
    emailOwner: {
      email: process.env.Email_Owner,
      password: process.env.Password_Email_Owner
    }
  }
}