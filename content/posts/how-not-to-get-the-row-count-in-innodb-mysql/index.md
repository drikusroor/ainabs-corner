---
title: "How not to get the row count in InnoDB MySQL"
date: "2022-02-15"
categories: 
  - "notebook"
  - "tips-tricks"
tags: 
  - "mysql"
---

Yesterday I had to migrate a MySQL schema to a new server. Fun times. After I had finished the migration, I wanted to compare whether no data was lost. So I turned to Stackoverflow to find me a good MySQL command that would give me the row count of all tables in the schema so I could compare it to the schema on the old server. The command I used was:

```sql
SELECT SUM(TABLE\_ROWS) 
     FROM INFORMATION\_SCHEMA.TABLES 
     WHERE TABLE\_SCHEMA = '{your\_db}';
```

Do not use this command to get the exact row count of tables!

I got the command from [here](https://stackoverflow.com/a/286048/4496102). If I had taken the time and effort to actually read the text and comments below it, I would have known that this command only returns a _rough estimate of the row count_.

In the end I was better off just using good ole' `SELECT COUNT(id)` from each table:

```sql
SELECT COUNT(id) FROM table1;
SELECT COUNT(id) FROM table2;
SELECT COUNT(id) FROM table3;
-- etc.
```
