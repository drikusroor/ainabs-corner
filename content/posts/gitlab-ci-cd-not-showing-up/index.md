
---
title: "Gitlab CI/CD job is not showing up"
date: "2022-08-31"
categories: 
  - "problems-solutions"
  - "notebook"
tags: 
  - "gitlab"
---

This happened to me today: A Gitlab CI/CD job in a valid stage without any dependencies or rules was not showing up in my Gitlab CI/CD pipeline. It looked like this:

```yaml
# Incorrect, job does NOT show up in pipeline as it is seen as a job template
.e2e:
  image: cypress/browsers:node12.14.1-chrome85-ff81
  stage: .post
  artifacts:
    when: always
    paths:
      - cypress/videos/**/*.mp4
      - cypress/screenshots/**/*.png
    expire_in: 3 day
  script:
    - npm ci
    - npm run test:e2e
```

After some experimenting I found out that the name of the job was the culprit. Once you prefix the job name with a dot `.{name}`, it will be seen as a job template that can be extended and then won't be executed. THe obvious solution is then of course to remove the prefix:

```yaml
# Correct, job DOES show up in pipeline with the correct naming
e2e:
  image: cypress/browsers:node12.14.1-chrome85-ff81
  stage: .post
  artifacts:
    when: always
    paths:
      - cypress/videos/**/*.mp4
      - cypress/screenshots/**/*.png
    expire_in: 3 day
  script:
    - npm ci
    - npm run test:e2e
```
