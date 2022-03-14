---
title: "Base table or view not found: 1146 Table doesn't exist"
date: "2021-05-25"
categories: 
  - "problems-solutions"
tags: 
  - "doctrine"
  - "filament"
  - "laravel"
coverImage: "Screenshot-2021-05-25-134026.png"
---

When trying to use a Filament resource while also using Doctrine as an ORM, one might encounter the following error:

```
Illuminate\Database\QueryException

SQLSTATE[42S02]: Base table or view not found: 1146 Table 'underhold.suppliers' doesn't exist (SQL: select * from `suppliers` where `id` = 8 limit 1)
http://localhost/admin/resources/suppliers/8/edit
```

In my case, the database table did not have a plural name and was simply named `supplier`. To let filament know what the correct table name is, I extended my model from Eloquent and specified the table name from within the model:

```
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{

    // ...
    
    protected $table = 'supplier';
    
    // ...
}
```

Another solution might be to run migrations and execute `php artisan migrate`, but this was not applicable to my situation since my database was already up-to-date.
