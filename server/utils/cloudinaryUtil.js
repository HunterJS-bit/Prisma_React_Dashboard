const cloudinary = require('cloudinary').v2;


const cloudinaryUpload = async (image, prisma) => {

    const { createReadStream, filename, mimetype, encoding } = await image;

    const readStream = createReadStream();

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const streamLoad = cloudinary.uploader.upload_stream({ tags: 'post_image' }, async (error, result) => {
        // if all ok store image INFO in DB
        if (result) {
            console.log('PRismaaa ');
            console.log(result);
            await prisma.createFile({
                name: filename,
                size: result.bytes,
                contentType: result.format,
                url: result.url
            })
            return true;
        } else {
            return false;
        }
    });

    const file_reader = readStream.pipe(streamLoad);


};


module.exports = cloudinaryUpload;