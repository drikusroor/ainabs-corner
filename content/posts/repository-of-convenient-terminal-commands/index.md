---
title: "Repository of convenient terminal commands"
date: "2021-11-12"
categories: 
  - "notebook"
tags: 
  - "commands"
  - "terminal"
---

This article will be filled with convenient terminal commands for my own reference.

## Logs

#### Check latest logs in linux

## Navigation

```shell
journalctl -xe
```

#### Go back to previous location

```generic
cd -
```

## Other

#### List all services

```generic
service  --status-all
```

## Permissions

#### Show read / write permissions as numbers

```shell
find . -maxdepth 1 -printf "%m %f\\n"
```

## Services

#### See under which user a service is running

```generic
ps -ef
```
