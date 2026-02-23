CREATE TABLE IF.NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (author, content)
VALUES ('Admin', 'Bienvenue sur le livre d\'or !');