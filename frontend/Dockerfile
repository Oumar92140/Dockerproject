FROM node:18-alpine

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du reste du code
COPY . .

# Construction de l'application
RUN npm run build

EXPOSE 3000

# Next.js tourne sur le port 3000 par défaut
CMD ["npm", "start"]