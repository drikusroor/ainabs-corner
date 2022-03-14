---
title: "Create an Azure SQL Server login and connect a user to it"
date: "2021-12-08"
categories: 
  - "notebook"
  - "problems-solutions"
tags: 
  - "azure"
  - "sql"
---

In my [previous post](https://ainab.site/2021/12/01/fix-a-sql-database-before-exporting-to-a-dac-bacpac-file/) I showed how you can convert a `.bak` file to a `DAC` file and how to fix any errors that may appear. For the same job, I had to add some new SQL logins and users after the migration of the database. This post serves as a notebook for how to do that.

\-- Execute this query in the "master" database

-- Create new login
CREATE LOGIN \[new-login\]
    WITH PASSWORD = 'complex-password'
GO

-- Execute these queries in the target database

-- Create a user and connect it to the login
CREATE USER \[new-user\] FOR LOGIN \[new-login\]

-- Create a role to execute stored procedures
CREATE ROLE \[db\_executor\] AUTHORIZATION \[dbo\]
GO

GRANT EXECUTE TO \[db\_executor\]
GO

-- Give the user read/write/execute rights
sp\_addrolemember @rolename = 'tc\_execute', @membername = 'new-user'
GO
sp\_addrolemember @rolename = 'db\_datareader', @membername = 'new-user'
GO
sp\_addrolemember @rolename = 'db\_datawriter', @membername = 'new-user'
GO

-- Check if roles have been assigned to the user correctly
    SELECT 
    UserType='Role', 
    DatabaseUserName = '{Role Members}',
    LoginName = DP2.name,
    Role = DP1.name,
    'SELECT' AS \[PermissionType\] ,
    \[PermissionState\]  = 'GRANT',
    \[ObjectType\] = 'Table',
    \[Schema\] = 'dbo',
    \[ObjectName\] = 'All Tables',
    \[ColumnName\] = NULL
FROM sys.database\_role\_members AS DRM  
RIGHT OUTER JOIN sys.database\_principals AS DP1  
    ON DRM.role\_principal\_id = DP1.principal\_id  
LEFT OUTER JOIN sys.database\_principals AS DP2  
    ON DRM.member\_principal\_id = DP2.principal\_id  
WHERE DP1.type = 'R'
AND DP2.name IS NOT NULL

Now, we have created some logins and users. But to validate the logins and its connection strings, I'd suggest you take a look at [this dotnet console application that tests connection strings.](https://ainab.site/2021/12/09/test-multiple-sql-server-connection-strings-in-a-dotnet-console-app/)
