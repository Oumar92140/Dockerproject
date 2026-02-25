# Dockerproject

Base de données, volume et réseau

Le service db utilise l’image officielle mariadb:11.

La base est initialisée automatiquement via le script db/init.sql monté dans /docker-entrypoint-initdb.d/.

La persistance est assurée par un volume Docker nommé db_data monté sur /var/lib/mysql.

La base n’est pas exposée sur l’hôte (aucun ports: sur db) : elle est accessible uniquement depuis le réseau Docker privé.

Un réseau private_net (avec internal: true) isole la communication entre backend et db.

Tests effectués

Test de création

SHOW TABLES; retourne messages.

Test de persistance

Insertion d’une ligne dans messages.

docker compose down puis docker compose up -d db

La ligne est toujours présente → les données persistent via db_data.

Commandes de test 
docker compose up -d db

docker exec -it app_db mariadb -uappuser -papppass appdb -e "SHOW TABLES;"

docker exec -it app_db mariadb -uappuser -papppass appdb -e "SELECT * FROM messages;"

docker exec -it app_db mariadb -uappuser -papppass appdb -e "INSERT INTO messages(author,content) VALUES ('Test','Persistance OK');"

docker compose down

docker compose up -d db

docker exec -it app_db mariadb -uappuser -papppass appdb -e "SELECT * FROM messages;"
