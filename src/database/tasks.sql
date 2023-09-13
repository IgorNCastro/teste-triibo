CREATE DATABASE IF NOT EXISTS tasks;

USE tasks;

CREATE TABLE IF NOT EXISTS tasklist (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(256) NOT NULL,
  description VARCHAR(256) NOT NULL,
  status VARCHAR(256) NOT NULL
  );


INSERT INTO tasklist 
    (title, description, status) 
VALUES
    ('Acordar as 08:00hrs', 'Em casa', 'Concluída'),
    ('Tomar o café da manhã', 'Em casa', 'Concluída'),
    ('Almoço no restaurante', 'Prime Restaurante', 'Em andamento'),
    ('Academia', 'Smart Fit', 'Pendente'),
    ('Reunião as 16:00hrs', 'Condomínio', 'Pendente'),
    ('Pedir jantar no Ifood', 'Em casa', 'Pendente');