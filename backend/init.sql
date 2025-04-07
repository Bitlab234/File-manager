CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin'
);

INSERT INTO admins (username, password)
VALUES 
  ('admin1', 'password1'),
  ('admin2', 'password2')
ON CONFLICT (username) DO NOTHING;

CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) CHECK (type IN ('text', 'image', 'pdf', 'video', 'audio', 'other', 'folder')) NOT NULL,
  url VARCHAR(255),
  parentId INT,
  FOREIGN KEY (parentId) REFERENCES files(id) ON DELETE CASCADE
);

INSERT INTO files (name, type, url, parentId)
VALUES 
  ('Документы', 'folder', NULL, NULL),
  ('Видео', 'folder', NULL, NULL),
  ('Изображения', 'folder', NULL, NULL),
  ('Аудио', 'folder', NULL, NULL),
  ('comands.txt', 'text', '/uploads/documents/comands.txt', 1),
  ('Rick Astley - Never Gonna Give You Up (Official Music Video).mp4', 'video', '/uploads/videos/Rick Astley - Never Gonna Give You Up (Official Music Video).mp4', 2),
  ('Котики', 'folder', NULL, 3),
  ('Песики', 'folder', NULL, 3),
  ('cat1.jpg', 'image', '/uploads/images/cat1.jpg', 7),
  ('cat2.jpg', 'image', '/uploads/images/cat2.jpg', 7),
  ('cat3.jpg', 'image', '/uploads/images/cat3.jpg', 7),
  ('dog1.jpg', 'image', '/uploads/images/dog1.jpg', 8),
  ('dog2.jpg', 'image', '/uploads/images/dog2.jpg', 8),
  ('land.jpg', 'image', '/uploads/images/land.jpg', 3)
ON CONFLICT DO NOTHING;