# Data + External Integrations
- MySQL is expected via env vars in `src/main/resources/application.yaml` (`MYSQL_URL`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`); JPA uses `ddl-auto: none`.
- Local DB bootstrap uses `docker-compose.yml` (MySQL exposed on `3307`) and auto-runs SQL from `database/init.sql` and `database/insert_data.sql`.
- Image storage is Cloudinary-backed (`configs/cloudinary/CloudinaryConfig.java`, `configs/cloudinary/CloudinaryService.java`); perfume create/update flows upload/delete remote files.

