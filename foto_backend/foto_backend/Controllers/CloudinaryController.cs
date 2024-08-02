using foto_backend.Dtos;
using foto_backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace foto_backend.Controllers
{
    [Route("api/imagen")]
    [ApiController]
    public class CloudinaryController : Controller
    {
        private readonly ICloudinaryService _cloudinaryService;

        public CloudinaryController(ICloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
        }

        //metodo para subir una imagen a cloudinary
        [HttpPost]
        //se establece el tipo de archivo que se va a subir
        //el fromform es para que se pueda subir un archivo
        public async Task<IActionResult> UpImageAsync([FromForm] UpImageDto model)
        {
            //valida si el archivo es nulo
            if (model.File == null || model.File.Length == 0)
            {
                return BadRequest("No se ha seleccionado un archivo");
            }

            //-----se sube la imagen a cloudinary-----
            var response = await _cloudinaryService.UpImageAsync(model);

            //validar si la respuesta es correcta
            if (!response.Status)
            {
                return StatusCode(response.StatusCode, response.Message);
            }

            //se envia created at action para que se pueda obtener la url de la imagen
            return CreatedAtAction(nameof(GetImageUrl), new {publicId = response.Data.PublicId}, response.Data);
            
        }

        //metodo para obtener todas las imagenes
        [HttpGet]
        public async Task<IActionResult> GetAllImageAsync()
        {
            var images = await _cloudinaryService.GetAllImageAsync();

            //validar si no hay imagenes
            if (images == null)
            {
                return NotFound("No se encontraron imagenes");
            }

            return Ok(images);
        }

        //metodo para obtener la url de la imagen / metodo obligatorio para obtener la url de la imagen
        [HttpGet("{publicId}")]
        public async Task<IActionResult> GetImageUrl(string publicId)
        {
            var url = await _cloudinaryService.GetImageUrl(publicId);

            //validar si la url es nula
            if (string.IsNullOrEmpty(url))
            {
                return NotFound("No se encontro la imagen");
            }

            return Ok(new {Url = url});
        }
    }
}
