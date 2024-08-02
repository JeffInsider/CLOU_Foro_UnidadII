using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using foto_backend.DataBase;
using foto_backend.Dtos;
using foto_backend.Entities;
using foto_backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace foto_backend.Services
{
    //Primero se creo el servicio para poder subir una imagen a cloudinary
    //despues de crear la base de datos ahora se actualiza el servicio
    public class CloudinaryService : ICloudinaryService
    {
        //se crea una instancia de cloudinary
        private readonly Cloudinary _cloudinary;
        private readonly ImageDbContext _context;
        private readonly IMapper _mapper;

        //metodo constructor
        public CloudinaryService(IConfiguration configuration, ImageDbContext context, IMapper mapper)
        {
            //se obtiene la url de cloudinary
            _cloudinary = new Cloudinary (Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
            _cloudinary.Api.Secure = true;

            _context = context;
            _mapper = mapper;

        }

        //metodo para subir una imagen a cloudinary

        public async Task<ResponseDto<ImageDto>> UpImageAsync(UpImageDto model)
        {
            try
            {
                //se crea un stream para la imagen
                //ahora se usa el model ya que se creo un dto para subir la imagen y ahi tiene el archivo
                using var stream = model.File.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    //se establece el archivo
                    File = new FileDescription(model.File.FileName, stream),
                    //se establece el tamaño de la imagen
                    Transformation = new Transformation().Width(500).Height(500).Crop("fill")
                };

                //-----se sube la imagen a cloudinary----
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                //ahora se guarda la imagen en la base de datos
                var image = new ImageEntity
                {
                    PublicId = uploadResult.PublicId,
                    //se obtiene la url de la imagen y se guarda en la base de datos
                    Url = uploadResult.SecureUrl.ToString()
                };

                //se guarda la imagen en la base de datos
                _context.Images.Add(image);
                await _context.SaveChangesAsync();

                //se mapea la imagen
                var imageDto = _mapper.Map<ImageDto>(image);

                return new ResponseDto<ImageDto>
                {
                    Data = imageDto,
                    Message = "Imagen subida correctamente",
                    Status = true,
                    StatusCode = 200
                };
            }
            catch (Exception e)
            {
                return new ResponseDto<ImageDto>
                {
                    Data = null,
                    Message = e.Message,
                    Status = false,
                    StatusCode = 500
                };
            }
        }

        //obtener todas las imagenes
        public async Task<IEnumerable<ImageDto>> GetAllImageAsync()
        {
            var images = await _context.Images.ToListAsync();
            return _mapper.Map<List<ImageDto>>(images);
        }

        //metodo para obtener la url de la imagen / este metodo es obligatorio
        public Task<string> GetImageUrl(string publicId)
        {
            return Task.FromResult(_cloudinary.Api.UrlImgUp.BuildUrl(publicId));
        }
    }
}
