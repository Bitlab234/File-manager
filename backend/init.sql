CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin'
);

INSERT INTO admins (username, password)
VALUES 
  ('admin1@admin.admin', '$2b$10$NzLXwgCS4IwiYqufdfFReOk.whfB4povg4cImgy9uMaucPr8bzQOW'),
  ('admin2@admin.admin', '$2b$10$cSJZCkgacSSEq99TCA0mGuk1ZaafA/YU6T/iOsQb.KovwezUPmU.i')
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
  ('comands.txt', 'text', '/backend/uploads/documents/comands.txt', 1),
  ('Rick Astley - Never Gonna Give You Up (Official Music Video).mp4', 'video', '/backend/uploads/videos/Rick Astley - Never Gonna Give You Up (Official Music Video).mp4', 2),
  ('Котики', 'folder', NULL, 3),
  ('Песики', 'folder', NULL, 3),
  ('cat1.jpg', 'image', '/backend/uploads/images/cat1.jpg', 7),
  ('cat2.jpg', 'image', '/backend/uploads/images/cat2.jpg', 7),
  ('cat3.jpg', 'image', '/backend/uploads/images/cat3.jpg', 7),
  ('dog1.jpg', 'image', '/backend/uploads/images/dog1.jpg', 8),
  ('dog2.jpg', 'image', '/backend/uploads/images/dog2.jpg', 8),
  ('land.jpg', 'image', '/backend/uploads/images/land.jpg', 3),
  ('avidreaders.ru__sql-polnoe-rukovodstvo.pdf', 'pdf', '/backend/uploads/documents/avidreaders.ru__sql-polnoe-rukovodstvo.pdf', 1),
  ('Музыка90-е', 'folder', NULL, 4),
  ('Современное', 'folder', NULL, 4),
  ('Betsy_feat_Mariya_YAnkovskaya_-_Sigma_Bojj_79013997.mp3', 'audio', '/backend/uploads/audio/Betsy_feat_Mariya_YAnkovskaya_-_Sigma_Bojj_79013997.mp3', 4),
  ('Korol_i_SHut_-_Prygnu_so_skaly_62570549.mp3', 'audio', '/backend/uploads/audio/Korol_i_SHut_-_Prygnu_so_skaly_62570549.mp3', 16),
  ('Morgenshtern_-_Povod_79048690.mp3', 'audio', '/backend/uploads/audio/Morgenshtern_-_Povod_79048690.mp3', 17),
  ('Natasha_Koroleva_-_Malenkaya_strana_28567404.mp3', 'audio', '/backend/uploads/audio/Natasha_Koroleva_-_Malenkaya_strana_28567404.mp3', 16),
  ('Tatyana_Bulanova_-_YAsnyjj_mojj_svet_28567583.mp3', 'audio', '/backend/uploads/audio/Tatyana_Bulanova_-_YAsnyjj_mojj_svet_28567583.mp3', 16),
  ('Viktor_Cojj_-_Kukushka_28567717.mp3', 'audio', '/backend/uploads/audio/Viktor_Cojj_-_Kukushka_28567717.mp3', 16),
  ('ZHenya_Trofimov_i_Komnata_kultury_-_Poezda_78454233.mp3', 'audio', '/backend/uploads/audio/ZHenya_Trofimov_i_Komnata_kultury_-_Poezda_78454233.mp3', 17)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS file_actions (
  id SERIAL PRIMARY KEY,
  file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL, -- 'open', 'download', 'edit'
  action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);