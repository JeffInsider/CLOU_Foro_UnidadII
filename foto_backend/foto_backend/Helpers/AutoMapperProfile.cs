using AutoMapper;
using foto_backend.Dtos;
using foto_backend.Entities;

namespace foto_backend.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ImageEntity, ImageDto>();
            CreateMap<ImageDto, ImageEntity>();
        }
    }
}
