
using foto_backend.Dtos;

namespace foto_backend.Services.Interfaces
{
    public interface ICloudinaryService
    {
        Task<IEnumerable<ImageDto>> GetAllImageAsync();
        Task<string> GetImageUrl(string publicId);
        Task<ResponseDto<ImageDto>> UpImageAsync(UpImageDto model);
    }
}
