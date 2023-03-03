export const Config = () =>{
  return {
    port: process.env.PORT || 3000,
    database: {
      host: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cashflowdb',
    },
    apikey: process.env.APIKEY,
    cloudinaryAPI: process.env.CLOUDINARY_URL,
  }
}