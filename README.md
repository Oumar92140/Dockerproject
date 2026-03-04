# Livre d'Or

Application web de livre d'or permettant aux visiteurs de laisser des messages. Elle est composée d'un frontend PHP, d'un backend Node.js et d'une base de données MariaDB, orchestrés avec Docker.

---

## Architecture Docker

### Services

| Service    | Image                          | Rôle                              | Port exposé |
|------------|--------------------------------|-----------------------------------|-------------|
| `frontend` | `jmlk/livre-d-or-frontend`     | Interface web PHP                 | 8080        |
| `backend`  | `jmlk/livre-d-or-backend`      | API Node.js                       | 3000        |
| `db`       | `mariadb:11`                   | Base de données MariaDB           | aucun       |

### Réseaux

| Réseau        | Type              | Rôle                                                                 |
|---------------|-------------------|----------------------------------------------------------------------|
| `public_net`  | bridge            | Relie le frontend et le backend. Accessible depuis l'hôte.           |
| `private_net` | bridge (internal) | Relie le backend et la base de données. Inaccessible depuis l'hôte. |

La base de données est **complètement isolée** : seul le backend peut lui parler, via `private_net`. Le frontend ne peut jamais atteindre la base directement.

```
Internet
   │
   ▼
[ Frontend :8080 ] ──── public_net ──── [ Backend :3000 ]
                                               │
                                         private_net
                                               │
                                         [ MariaDB ]
```

### Volumes

| Volume    | Monté sur                | Rôle                                          |
|-----------|--------------------------|-----------------------------------------------|
| `db_data` | `/var/lib/mysql`         | Persiste les données même après `docker compose down` |

### Variables d'environnement

Les secrets (identifiants de base de données) sont chargés depuis `secret/.env` et ne sont jamais écrits en dur dans `docker-compose.yml`.

---

## Installation et lancement

### Prérequis

Installer Docker et Docker Compose :

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
```

### 1. Cloner le dépôt

```bash
git clone https://github.com/KLM-m/dockertest.git
cd dockertest
```

### 2. Rendre le script exécutable

```bash
chmod +x start.sh
```

### 3. Lancer l'application

```bash
sudo ./start.sh
```

Docker télécharge les images automatiquement puis démarre les trois conteneurs.

### 4. Accéder à l'application

👉 **http://localhost:8080**

---

## Commandes utiles

Arrêter l'application :
```bash
sudo docker compose down
```

Voir les logs en temps réel :
```bash
sudo docker compose logs -f
```

Vérifier l'état des conteneurs :
```bash
sudo docker compose ps
```

Supprimer toutes les images Docker :
```bash
sudo docker rmi $(docker images -q)
```

---

## Tests

### Tester la base de données

Vérifier que la table existe :
```bash
sudo docker exec -it app_db mariadb -uappuser -papppass appdb -e "SHOW TABLES;"
```

Insérer une ligne de test :
```bash
sudo docker exec -it app_db mariadb -uappuser -papppass appdb -e "INSERT INTO messages(author,content) VALUES ('Test','Hello');"
```

Lire les données :
```bash
sudo docker exec -it app_db mariadb -uappuser -papppass appdb -e "SELECT * FROM messages;"
```

### Tester la persistance des données

Arrêter et relancer les conteneurs :
```bash
sudo docker compose down
sudo docker compose up -d
```

Vérifier que les données sont toujours présentes :
```bash
sudo docker exec -it app_db mariadb -uappuser -papppass appdb -e "SELECT * FROM messages;"
```

Si la ligne insérée précédemment est toujours là → la persistance fonctionne via le volume `db_data`.

### Tester la communication backend → base de données

```bash
sudo docker exec -it app_backend curl -s http://localhost:3000
```

### Tester la communication frontend → backend

```bash
sudo docker exec -it app_frontend curl -s http://app_backend:3000
```

### Vérifier l'isolation réseau

Lister les réseaux actifs :
```bash
sudo docker network ls
```

Inspecter les conteneurs sur `public_net` (frontend + backend uniquement) :
```bash
sudo docker network inspect dockertest_public_net
```

Inspecter les conteneurs sur `private_net` (backend + db uniquement) :
```bash
sudo docker network inspect dockertest_private_net
```

---

## Dépannage

**La page ne s'affiche pas** — attendez 30 secondes, la base de données démarre en dernier.

**Permission refusée sur start.sh** — lancez `chmod +x start.sh`

**Port 8080 déjà utilisé** — remplacez `"8080:80"` par `"8181:80"` dans `docker-compose.yml` et accédez à http://localhost:8181
