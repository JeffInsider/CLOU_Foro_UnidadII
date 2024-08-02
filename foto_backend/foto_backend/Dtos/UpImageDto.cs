namespace foto_backend.Dtos
{
    //este dto es para subir una imagen
    public class UpImageDto
    {
        //aqui es donde se carga la imagen para subirla
        public IFormFile File { get; set; }
    }
}
