using System.ComponentModel.DataAnnotations;

namespace foto_backend.Entities
{
    //despues se creo todo para la base de datos
    public class ImageEntity
    {
        [Key]
        public int Id { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }

    }
}
