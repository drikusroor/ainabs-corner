---
title: "Test multiple SQL Server connection strings in a dotnet console app"
date: "2021-12-09"
categories: 
  - "notebook"
  - "tips-tricks"
tags: 
  - "dotnet"
  - "sql"
---

As I have explained how to create some new logins and users in my [previous post](https://ainab.site/2021/12/08/create-an-azure-sql-server-login-and-connect-a-user-to-it/), I now had to create some connection strings for those logins. To check if all logins were created successfully, I have created a small dotnet console application to test out the connection strings associated with these logins:

```csharp
using System.Data.SqlClient;

class Credentials
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Server { get; set; }

    public Credentials(string username, string password, string server = "sql-server.example.com") {
        Username = username;
        Password = password;
        Server = server;
    }

    public string GenerateConnectionString()
    {
        return $"Server=tcp:{Server},1433;Initial Catalog=defaultDatabase;Persist Security Info=False;User ID={Username};Password={Password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
    }
}

class Program
{
    static void Main(string\[\] args)
    {
        List<Credentials> credentialsCollection = new List<Credentials>
        {
            new Credentials("login-one", "complex-password"),
            new Credentials("login-two", "complex-password"),
            new Credentials("login-three", "complex-password")
        };

        foreach (var credentials in credentialsCollection)
        {
            TestConnectionString(credentials);
        }
    }

    //Source: https://stackoverflow.com/a/1497110/4496102
    static void TestConnectionString(Credentials credentials)
    {
        SqlConnection? conn = null;
        var connectionString = credentials.GenerateConnectionString();

        try
        {
            conn = new SqlConnection(connectionString);
            conn.Open();
            Console.WriteLine("good connection string");
        }
        catch (SqlException sqlE)
        {
            Console.WriteLine($"bad connection string: {credentials.Username}");
        }
        finally
        {
            if (conn != null) conn.Dispose();
        }
    }
}
```
