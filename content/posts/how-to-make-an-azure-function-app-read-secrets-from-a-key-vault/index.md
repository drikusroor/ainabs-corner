---
title: "How to make an Azure Function App read Secrets from a Key Vault"
date: "2021-07-14"
categories: 
  - "tips-tricks"
tags: 
  - "azure"
  - "function-app"
  - "key-vault"
---

## 1\. Make sure the function app has a managed identity

Go to your Azure Function App and then go to Settings > Identity. Switch the status from `off` to `on`.

![](images/image-860x1024.png)

Enabling System assigned managed identity in the Azure Function App

## 2\. Create a Secret in the Azure Key Vault

Go to your Azure Key Vault and then go to Settings > Secrets. Click `+ Generate/Import`.

![](images/image-2-1024x699.png)

Navigating towards Secrets in the Azure Key Vault

Then, give your Secret a name and a value and click the `Create` button. Remember the name of the Secret, we will need it later.

![](images/image-3-1024x893.png)

Configuring the Secret

## 3\. Give the Function App access to the Key Vault

Go to your Azure Key vault, navigate to Settings > Access policies and click `+ Add Access Policy`.

![](images/image-4-1024x714.png)

Navigating towards Access policies

On the `Add access policy` page, configure the following values:

- Configure from template (optional) > Secret management
- Key permissions > 0 selected
- Secret permissions >
    - Secret Management Operations > Get & List
- Certificate permissions > 0 selected

![](images/image-5-1024x767.png)

Configuring the secret permissions of the access policy

Under `Select principal *`, click on `None selected`. A side menu appears. In this side menu search for the managed identity you have created earlier in Step 1. It should have the same name as your function app. When you have found it in the list of search results, click it to select it. Then, click the `Select` button on the bottom.

![](images/image-6-1024x737.png)

Adding the principal in the `Add access policy` configuration

Then, repeat the exact same steps for the `Authorized application`: Under `Authorized application`, click `None Selected`. Now search for your function app. Click on your function app in the search results to select it. Click the `Select` button to finalize the selection.

![](images/image-7-1024x739.png)

Adding the Authorized application in the `Add access policy` configuration

Finally, click the `Add` button to finalize adding the access policy.

![](images/image-8-1024x732.png)

Finalizing adding the access policy

Once finished adding, it should like in the image below:

![](images/image-9-1024x535.png)

## 4\. Adding the Key Vault Secret as a Function App Configuration Variable

We will now import the Secret into a Configuration Variable in the Function App so it can be used from within the app.

First, go to the Secret we created in step 2. and click on the Secret to view its configuration details.

![](images/image-11-1024x625.png)

Navigating to the newly created Secret

Click on the current version.

![](images/image-13-1024x375.png)

Going to the current version

Click on the `Copy to clipboard` icon to copy the `Secret Identifier` to the clipboard.

![](images/image-14-911x1024.png)

Copying the `Secret Identifier`

Go back to your Function App, go to Settings > Configuration and click on `+ New application setting`.

![](images/image-15-1024x1021.png)

Now comes the tricky part. The `Secret Identifier` we have just copied to the clipboard must placed in the following string at the place of the `{secret identifier}` placeholder:

```generic
@Microsoft.KeyVault(SecretUri={secret identifier})
```

Which then should look something like this:

```generic
 @Microsoft.KeyVault(SecretUri=https://my-function-app.vault.azure.net/secrets/ClientSecret/59e4d9a120ea4b1cad7158925fd913d3})
```

![](images/image-16-1024x540.png)

## 5\. Using the Secret in your Function App

In your Function App you can now get the value of the Secret by using the following line of code:

```csharp
var mySecret = Environment.GetEnvironmentVariable("MySecret", EnvironmentVariableTarget.Process);
```

I hope this helped you, it certainly helped my memory!
