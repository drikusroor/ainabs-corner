---
title: "How to mock a GuzzleHttp client that makes a request to a third-party API in a Laravel feature test?"
date: "2022-06-27"
categories: 
  - "tips-tricks"
tags: 
  - "php"
  - "laravel"
  - "testing"
---

In a Laravel project I have a feature test in which I test an internal endpoint. The endpoint has a Controller calls a method on a Service. The Service then tries to call a third-party endpoint. It is this third-party endpoint that I would like to mock.

I have looked at Guzzle's documentation, but it [seems like][1] the `MockHandler` strategy requires you to execute the http request inside of the test, which is not wat I want in my test. I want Guzzle's http client to be mocked and to return a custom http response that I can specify in my test.

I have also considered and tried to use [Http Fake][[2](https://laravel.com/docs/9.x/http-client#faking-responses)], but it didn't work and I assume Guzzle's http client does not extend Laravel's http client.

What would be the best way to approach this problem and mock the third-party endpoint?

Inspired by [this StackOverflow question][3], I [have managed to solve this problem][4] by injecting a Guzzle client with mocked responses into my service. The difference to the aforementioned StackOverflow question is that I had to use `$this->app->singleton` instead of `$this->app->bind` because my DI was configured differently:

### Internal Endpoint Feature Test
```php
public function testStoreInternalEndpointSuccessful(): void
{

    // depending on your DI configuration,
    // this could be ->bind or ->singleton
    $this->app->singleton(InternalService::class, function($app) {
        $mockResponse = json_encode([
            'data' => [
                'id' => 0,
                'name' => 'Jane Doe',
                'type' => 'External',
                'description' => 'Etc. you know the drill',
            ]
        ]);

        $mock = new GuzzleHttp\Handler\MockHandler([
            new GuzzleHttp\Psr7\Response(200, [], $mockResponse),
        ]);

        $handlerStack = GuzzleHttp\HandlerStack::create($mock);
        $client = new GuzzleHttp\Client(['handler' => $handlerStack]);

        return new InternalService($client);
    });

    // arrange, params & headers are not important in this problem
    $params = [];
    $headers = [];

    // act
    $response = $this->json('POST', '/v1/internal-endpoint', $params, $headers);

    // assert
    $response->assertResponseStatus(Response::HTTP_OK);
}
```

### AppServiceProvider.php
```php
namespace App\Providers;

use App\Service\InternalService;
use GuzzleHttp\Client;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // my app uses ->singleton instead of ->bind
        $this->app->singleton(InternalService::class, function () {
            return new InternalService(new Client([
                'base_uri' => config('app.internal.base_url'),
            ]));
        });

    }
}
```

### Internal Endpoint Controller
```php
class InternalEndpointController extends Controller
{

    public function __construct(protected InternalService $internalService)
    {
    }

    public function store(Request $request): InternalResource
    {
        $data = $this.internalService->fetchExternalData();

        return new InternalResource($data); // etc.
    }
}
```

### Internal Service
```php
use GuzzleHttp\ClientInterface;

class InternalService
{
    public function __construct(protected ClientInterface $client)
    {
    }
    
    public function fetchExternalData()
    {
        $response = $this->httpClient->request('GET', 'v1/external-data');
        $body = json_decode($response->getBody()->getContents(), false, 512, JSON_THROW_ON_ERROR);

        return $body;
    }
}
```

See also my [StackOverflow post](https://stackoverflow.com/q/72774431/4496102)

  [1]: https://docs.guzzlephp.org/en/stable/testing.html#mock-handler
  [2]: https://laravel.com/docs/9.x/http-client#faking-responses
  [3]: https://stackoverflow.com/questions/33162281/unit-testing-guzzle-inside-of-laravel-controller-with-phpunit
  [4]: https://stackoverflow.com/a/72774432/4496102
