---
title: "Setup Gitlab token for private composer packages"
date: "2022-05-02"
categories: 
  - "problems-solutions"
tags: 
  - "gitlab"
---

Have you ever received the following error?
```
[Composer\Downloader\TransportException]                                                                                          
The "https://gitlab.my-gitlab-instance.com/api/v4/group/666/-/packages/composer/packages.json" file could not be downloaded (HTTP/2 404 ):  
{"message":"404 Group Not Found"}
```

I have, and it has kept me from doing my work several times. The readme files of several projects give some attention to this issue, but you might not be working in those specific projects when you encounter these terrible issues. This is why I wrote this short instructions post on Confluence; hopefully Confluence's search feature will find this post everytime I (or you) run into the same ol' story and forget how to solve it.

Below, some tips to fix this issue once and for all:

## 1. Make sure you have a Gitlab token

*  Login to [gitlab.my-gitlab-instance.com](http://gitlab.my-gitlab-instance.com/) (replace gitlab.my-gitlab-instance.com with your own url) and navigate towards Avatar \> Preferences \> Access Tokens:
* Create a personal access token with the following properties:
  * Token name (name it anything you like, I prefer to mention the name of my machine)
  * Expiration date (I typically do a few months)
  * Choose the `read_api` permission
  * Click `Create Personal Access Token`
* Now you should have received a personal access token. Store this token in a safe place, we will need it later on.

## 2. Configure composer.json

In the project you are currently working on, open up the `composer.json` file. We will configure some things here.

* Add the following repository to the repositories section of `composer.json`:

```json
"repositories": [
  {
    "type": "composer",
    "url": "https://gitlab.my-gitlab-instance.com/api/v4/group/10/-/packages/composer/packages.json"
  }
],
```

* Also add the following configuration to `composer.json` (this part is _**CRUCIAL!1!!**_):

```json
"config": {
  "process-timeout": 0,
  "gitlab-domains": [
    "gitlab.my-gitlab-instance.com"
  ]
},
```

## 3. Configure the gitlab token into composer for the current project

Execute the following command from the root of your project:
    
```sh
composer config gitlab-token.gitlab.my-gitlab-instance.com {YOUR_PERSONAL_ACCESS_TOKEN}
```

If successful, an `auth.json` file with the the entered token should have been created in the root of your project.
