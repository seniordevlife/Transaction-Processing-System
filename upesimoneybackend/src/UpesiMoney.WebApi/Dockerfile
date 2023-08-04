#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/UpesiMoney.WebApi/UpesiMoney.WebApi.csproj", "src/UpesiMoney.WebApi/"]
COPY ["src/UpesiMoney.Core/UpesiMoney.Core.csproj", "src/UpesiMoney.Core/"]
COPY ["src/UpesiMoney.Infrastructure/UpesiMoney.Infrastructure.csproj", "src/UpesiMoney.Infrastructure/"]
RUN dotnet restore "src/UpesiMoney.WebApi/UpesiMoney.WebApi.csproj"
COPY . .
WORKDIR "/src/src/UpesiMoney.WebApi"
RUN dotnet build "UpesiMoney.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "UpesiMoney.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UpesiMoney.WebApi.dll"]