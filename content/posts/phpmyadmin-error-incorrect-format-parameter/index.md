---
title: "phpMyAdmin - Error | Incorrect format parameter"
date: "2021-08-15"
categories: 
  - "problems-solutions"
tags: 
  - "docker"
  - "php"
  - "phpmyadmin"
featured_image: "images/afbeelding.png"
---

If you are ever trying to import a (large) existing database through phpMyAdmin and you are getting the following error, you might want to check your `php.ini` file.

```ini
\# File: php.ini

memory\_limit = 256M
post\_max\_size = 128M
upload\_max\_filesize = 128M
max\_execution\_time = 600
max\_input\_time = 600
```

[Try increasing the values](https://stackoverflow.com/questions/3958615/import-file-size-limit-in-phpmyadmin) of the configuration variables until you get successful results.

If you are using Docker to boot up your phpMyAdmin instance, you might also want to check the `UPLOAD_LIMIT` environment variable in your `docker-compose.yml` file:

```yaml
\# File: docker-compose.yml

services:
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    environment:
      UPLOAD\_LIMIT: 100000000
```
