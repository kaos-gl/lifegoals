# ETAPA 1: Construcción (Usamos Node 20.x)
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
# Instalamos dependencias igual que lo hiciste en local
RUN npm install --legacy-peer-deps
COPY . .
# Compilamos el proyecto de Angular para producción
RUN npm run build --configuration=production

# ETAPA 2: Servidor Web (Usamos Nginx)
FROM nginx:alpine
# Copiamos los archivos compilados de la etapa 1 al servidor
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html
# Exponemos el puerto 80 para que Render lo detecte
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# ETAPA 1: Compilación con Node 20.x
FROM node:20 AS build
WORKDIR /app

# Copiamos los archivos de dependencias y las instalamos
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiamos todo el código fuente y lo compilamos para producción
COPY . .
RUN npm run build --configuration=production

# ETAPA 2: Servidor Web con Nginx
FROM nginx:alpine
# Copiamos el resultado de la etapa 1 a la carpeta pública de Nginx
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
