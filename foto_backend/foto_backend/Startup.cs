using foto_backend.DataBase;
using foto_backend.Services;
using foto_backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace foto_backend
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            //para acceder al sqllite
            services.AddDbContext<ImageDbContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            //costum services
            services.AddTransient<ICloudinaryService, CloudinaryService>();

            //automapper
            services.AddAutoMapper(typeof(Startup));

            //para acceder a la petición http
            services.AddHttpContextAccessor();

            //para usar cors
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", builder => builder
                    // .WithOrigins(Configuration["FrontendUrlTesting"]!, Configuration["FrontendUrlProduction"]!, "http://localhost:5088")
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
                // .AllowCredentials());
            });

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // esto es para que se pueda acceder a la api desde cualquier origen
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            //para rutas mas rapidas
            app.UseRouting();

            //para usar cors
            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
