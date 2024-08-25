# Étape 1: Construire l'application
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les sources de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape 2: Serveur statique
FROM nginx:alpine

# Copier les fichiers de construction dans le répertoire Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]

