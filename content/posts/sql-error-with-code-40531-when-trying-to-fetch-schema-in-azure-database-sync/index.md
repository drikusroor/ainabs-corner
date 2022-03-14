---
title: "SQL error with code 40531 when trying to fetch schema in Azure Database Sync"
date: "2021-12-20"
categories: 
  - "notebook"
  - "problems-solutions"
tags: 
  - "azure"
  - "sql"
---

As I was trying to sync my Hub database to my Member database in Azure Database Sync, I got this error when trying to fetch the schema of the Hub database:

```generic
Getting schema information for the database failed with the exception "Failed to connect to server databasename-0182730712073.database.windows.net.Inner exception: SqlException ID: {someGuid}, Error Code: -2146232060 - SqlError Number:40531, Message: SQL error with code 40531  For more information, provide tracing ID ‘{someGuid}’ to customer support."
```

Apparently, the problem was gone once I (re-)entered the SQL Server credentials for the Hub database. Click Databases:

![](images/image-1.png)

Click Databases

Then, select your Hub Database:

![](images/image-3.png)

Select the Hub Database

Correctly (re-)enter your credentials and hit OK:

![](images/image-4.png)

Correctly (re-)enter your credentials and hit OK
