---
title: "Behat: context class not found and can not be used."
date: "2021-12-15"
categories: 
  - "notebook"
  - "problems-solutions"
tags: 
  - "behat"
  - "php"
---

If you are using Behat for testing your PHP application and you encounter the following error after trying to run your tests:

```generic
In UninitializedContextEnvironment.php line 44:
                                                                                                         
  Tests\\Feature\\Behat\\Context\\Account\\MyOldContext\\ context class not found and can not be used.
```

Do not forget to remove your obsolete Behat Context file (MyOldContext in this case) from your `behat.yml` configuration file:

```yaml
default:
  suites:
    default:
      paths:
        - '%paths.base%/tests/Feature/Behat/features'
      contexts:
        - Tests\\Feature\\Behat\\Context\\ApplicationContext
        # Remove the old context file
        - Tests\\Feature\\Behat\\Context\\MyOldContext
        - Tests\\Feature\\Behat\\Context\\EmailContext
        - Behat\\MinkExtension\\Context\\MinkContext
        - behatch:context:browser
        - behatch:context:debug
        - behatch:context:system
        - behatch:context:json
        - behatch:context:rest

```
