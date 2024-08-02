using dotenv.net;
using foto_backend;
using Microsoft.AspNetCore.Identity;
using System.Xml;

var builder = WebApplication.CreateBuilder(args);

//hay que extraer del metodo constructor
var startup = new Startup(builder.Configuration);

startup.ConfigureServices(builder.Services);

var app = builder.Build();

startup.Configure(app, builder.Environment);

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
}

//PASO 1: Crear un archivo .env en la raiz del proyecto
DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));

app.Run();