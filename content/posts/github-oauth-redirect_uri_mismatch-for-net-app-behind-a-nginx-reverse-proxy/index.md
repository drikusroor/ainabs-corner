---
title: "Github OAuth redirect_uri_mismatch for .NET App behind a Nginx Reverse Proxy"
date: "2021-11-11"
categories: 
  - "problems-solutions"
tags: 
  - "dotnet"
  - "nginx"
---

Let's say we have a .NET app running on an virtual machine. The app uses Github OAuth for authentication. Inside the virtual machine, the app runs on `http://127.0.0.1:5000`. The app should be available on `https://example.com`, so I have created an entry in nginx to send all requests towards `https://example.com` to `http://127.0.0.1:5000`:

```nginx
server {
    server\_name example.org www.example.org;
    listen 80;
    listen 443;

    location / {
        proxy\_pass https://127.0.0.1:5001/;
    }
}
```

So this works. My website can be reached from `https://example.com`. However, when I try to log in to the website using Github OAuth, I get an error from Github:

```json
{
    "error": "redirect\_uri\_mismatch",
    "error\_description": "The redirect\_uri MUST match the registered callback URL for this application.",
    "error\_uri": "https://developer.github.com/v3/oauth/#redirect-uri-mismatch",
    "state": "12345678901234567890"
}
```

This is odd, since my `Authorization callback URL` is correctly set in Github, and the `redirect_uri` is also set correctly in my app.

After closer inspection, I see that the `redirect_uri` sent to Github in the URL parameters does not contain the `https://example.com` domain. Instead, it is incorrectly set to `https://127.0.0.1:5001`. Apparently, the app does not realize it is being accessed through the domain.

To fix this, we need to add some parameters to our nginx configuration to ensure the app knows it is being accessed from `https://example.com`:

```nginx
server {
    server\_name example.org www.example.org;
    listen 80;
    listen 443;

    location / {
        proxy\_pass https://127.0.0.1:5001/;
        proxy\_set\_header X-Forwarded-Host $host:$server\_port;
        proxy\_set\_header X-Forwarded-Server $host;
        proxy\_set\_header X-Forwarded-For $proxy\_add\_x\_forwarded\_for;
        proxy\_set\_header X-Forwarded-Proto $scheme;
        proxy\_set\_header Host $host;
    }
}
```

Now the `redirect_uri` sent to Github in the URL parameters should contain the correct domain and Github should not throw an error.
