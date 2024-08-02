namespace foto_backend.Dtos
{
    public class ImageDto
    {
        //el public id es el id que nos da cloudinary
        public string PublicId { get; set; }
        public string Url { get; set; }

    }
}
