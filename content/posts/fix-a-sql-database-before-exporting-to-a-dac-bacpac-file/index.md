---
title: "Fix a SQL database before exporting to a DAC .bacpac file"
date: "2021-12-01"
categories: 
  - "notebook"
  - "problems-solutions"
tags: 
  - "azure"
  - "bacpac"
  - "sql"
---

When you want to migrate an old (on-premise) SQL database to an Azure SQL database, you need to export the database to a DAC `.bacpac` file. Such an export also includes schemas, views and users/logins. It is easy to receive errors when attempting to make a `.bacpac` export. In this post, I sum up the errors I received and a way to fix them.

### 1\. Drop Windows users

In my case, the database that I wanted to migrate contained references to Windows users. Azure SQL databases do not support Windows users, so we need to fix this. When you do not do this, you might encounter the following error:

```raw
Error SQL71564: The element User: \[windows\_user\] has property AuthenticationType set to a value that is not supported in Microsoft Azure SQL Database v12.
```

We therefore have to remove all Windows users from the database. In my case, the Windows users were also dependent on schemas, and these dependencies were no longer needed:

```sql
USE \[db\_name\]

--DROP SCHEMAS ON WHICH THE WINDOWS USERS ARE DEPENDENT
DROP SCHEMA IF EXISTS \[schema\_name\];

--DROP WINDOWS USERS
DROP USER IF EXISTS \[windows\_user\_name\];
```

### 2\. Remove stored procedures and views with unresolved dependencies

Furthermore, the database I wanted to migrate was not maintained properly and contained views and stored procedures dependent on tables and views that did not exist anymore. These missing dependencies generated errors such as the following:

```raw
Error SQL71501: Error validating element \[dbo\].\[proc\_name\]: Procedure: \[dbo\].\[proc\_name\] has an unresolved reference to object \[dbo\].\[db\_name\].\[table\_name\].

Error SQL71501: Error validating element \[dbo\].\[view\_name\]: View: \[dbo\].\[view\_name\] has an unresolved reference to object \[dbo\].\[db\_name\].\[table\_name\].
```

Simply drop all the views and stored procedures mentioned in the list of errors:

```sql
\--DROP VIEWS THAT ARE DEPENDENT ON NON-EXISTING TABLES
DROP VIEW IF EXISTS \[dbo\].\[view\_name\];

--DROP PROCEDURES THAT ARE DEPENDENT ON NON-EXISTING VIEWS OR TABLES
DROP PROCEDURE IF EXISTS \[dbo\].\[proc\_name\];
```

### 3\. Resolve orphans

After fixing the abovementioned errors, I still received some errors after exporting to `.bacpac`:

```raw
One or more unsupported elements were found in the schema used as part of a data package. Error SQL71564: Error validating element \[develop\]: The element \[develop\] has been orphaned from its login and cannot be deployed. (Microsoft.SqlServer.Dac)
```

Luckily, a quick Google search found me this [script on Stackoverflow](https://stackoverflow.com/a/45005153/4496102) which resolves this orphaned logins error.

SET NOCOUNT ON
USE \[db\_name\]
GO
DECLARE @loop INT
DECLARE @USER sysname
DECLARE @sqlcmd NVARCHAR(500) = ''
 
IF OBJECT\_ID('tempdb..#Orphaned') IS NOT NULL 
 BEGIN
  DROP TABLE #orphaned
 END
 
CREATE TABLE #Orphaned (UserName sysname,IDENT INT IDENTITY(1,1))
 
INSERT INTO #Orphaned (UserName)
SELECT \[name\] FROM sys.database\_principals WHERE \[type\] IN ('U','S') AND is\_fixed\_role = 0 AND \[Name\] NOT IN ('dbo','guest','sys','INFORMATION\_SCHEMA')
 
IF(SELECT COUNT(\*) FROM #Orphaned) > 0
BEGIN
 SET @loop = 1
 WHILE @loop <= (SELECT MAX(IDENT) FROM #Orphaned)
  BEGIN
    SET @USER = (SELECT UserName FROM #Orphaned WHERE IDENT = @loop)
    IF(SELECT COUNT(\*) FROM sys.server\_principals WHERE \[Name\] = @USER) <= 0
     BEGIN
        IF EXISTS(SELECT 1 FROM sys.database\_principals WHERE \[Name\] = @USER AND type\_desc = 'WINDOWS\_USER')
         BEGIN
            SET @sqlcmd = 'CREATE LOGIN \[' + @USER + '\] FROM WINDOWS'
            Exec(@sqlcmd)
            PRINT @sqlcmd
         END
        IF EXISTS(SELECT 1 FROM sys.database\_principals WHERE \[Name\] = @USER AND type\_desc = 'SQL\_USER')
         BEGIN
            SET @sqlcmd = 'CREATE LOGIN \[' + @USER + '\] WITH PASSWORD = N''password'''
            Exec(@sqlcmd)
            PRINT @sqlcmd
         END
     END
     
    SET @sqlcmd = 'ALTER USER \[' + @USER + '\] WITH LOGIN = \[' + @USER + '\]'
    Exec(@sqlcmd)
    PRINT @USER + ' link to DB user reset';
    SET @loop = @loop + 1
  END
END
SET NOCOUNT OFF

### 4\. Result

When we combine all these fixes, we end up with the following SQL script:

USE \[db\_name\]

--DROP SCHEMAS ON WHICH THE WINDOWS USERS ARE DEPENDENT
DROP SCHEMA IF EXISTS \[schema\_name\];

--DROP WINDOWS USERS
DROP USER IF EXISTS \[windows\_user\_name\];

--DROP VIEWS THAT ARE DEPENDENT ON NON-EXISTING TABLES
DROP VIEW IF EXISTS \[dbo\].\[view\_name\];

--DROP PROCEDURES THAT ARE DEPENDENT ON NON-EXISTING VIEWS OR TABLES
DROP PROCEDURE IF EXISTS \[dbo\].\[proc\_name\];

--FIX ORPHANED USERS
--Source: https://stackoverflow.com/a/45005153/4496102
SET NOCOUNT ON
GO

DECLARE @loop INT
DECLARE @USER sysname
DECLARE @sqlcmd NVARCHAR(500) = ''
 
IF OBJECT\_ID('tempdb..#Orphaned') IS NOT NULL 
 BEGIN
  DROP TABLE #orphaned
 END
 
CREATE TABLE #Orphaned (UserName sysname,IDENT INT IDENTITY(1,1))
 
INSERT INTO #Orphaned (UserName)
SELECT \[name\] FROM sys.database\_principals WHERE \[type\] IN ('U','S') AND is\_fixed\_role = 0 AND \[Name\] NOT IN ('dbo','guest','sys','INFORMATION\_SCHEMA')
 
IF(SELECT COUNT(\*) FROM #Orphaned) > 0
BEGIN
 SET @loop = 1
 WHILE @loop <= (SELECT MAX(IDENT) FROM #Orphaned)
  BEGIN
    SET @USER = (SELECT UserName FROM #Orphaned WHERE IDENT = @loop)
    IF(SELECT COUNT(\*) FROM sys.server\_principals WHERE \[Name\] = @USER) <= 0
     BEGIN
        IF EXISTS(SELECT 1 FROM sys.database\_principals WHERE \[Name\] = @USER AND type\_desc = 'WINDOWS\_USER')
         BEGIN
            SET @sqlcmd = 'CREATE LOGIN \[' + @USER + '\] FROM WINDOWS'
            Exec(@sqlcmd)
            PRINT @sqlcmd
         END
        IF EXISTS(SELECT 1 FROM sys.database\_principals WHERE \[Name\] = @USER AND type\_desc = 'SQL\_USER')
         BEGIN
            SET @sqlcmd = 'CREATE LOGIN \[' + @USER + '\] WITH PASSWORD = N''password'''
            Exec(@sqlcmd)
            PRINT @sqlcmd
         END
     END
     
    SET @sqlcmd = 'ALTER USER \[' + @USER + '\] WITH LOGIN = \[' + @USER + '\]'
    Exec(@sqlcmd)
    PRINT @USER + ' link to DB user reset';
    SET @loop = @loop + 1
  END
END
SET NOCOUNT OFF
