In ASP.NET, the concept of named `HttpClient` instances allows you to configure and manage multiple instances of the `HttpClient` class with different configurations. This feature is useful when you need to communicate with different HTTP endpoints or when you want to apply different configurations (such as base URL, headers, timeouts) to different parts of your application.

In NestJS, there isn't a built-in feature that directly corresponds to ASP.NET's named `HttpClient`. However, you can achieve similar functionality by leveraging the NestJS dependency injection system and creating custom HTTP service classes.

Here's an example of how you can create named HTTP service classes in NestJS:

1. Define a base HTTP service class that encapsulates common functionality:

```typescript
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseHttpService {
  constructor(protected httpService: HttpService) {}

  protected async get(url: string): Promise<any> {
    const response = await this.httpService.get(url);
    return response.data;
  }

  // Add other common HTTP methods here
}
```

2. Create named HTTP service classes that extend the base class and provide specific configurations:

```typescript
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class NamedHttpService1 extends BaseHttpService {
  constructor(httpService: HttpService) {
    super(httpService.create({
      baseURL: 'https://api.example.com',
      timeout: 5000,
      // Other configuration options specific to this named service
    }));
  }
}

@Injectable()
export class NamedHttpService2 extends BaseHttpService {
  constructor(httpService: HttpService) {
    super(httpService.create({
      baseURL: 'https://api.anotherexample.com',
      timeout: 3000,
      // Other configuration options specific to this named service
    }));
  }
}
```

3. Use the named HTTP service classes in your controllers or other services:

```typescript
import { Controller, Get } from '@nestjs/common';
import { NamedHttpService1, NamedHttpService2 } from './named-http.service';

@Controller('example')
export class ExampleController {
  constructor(
    private readonly namedHttpService1: NamedHttpService1,
    private readonly namedHttpService2: NamedHttpService2,
  ) {}

  @Get('data1')
  async getDataFromService1(): Promise<any> {
    return this.namedHttpService1.get('/data');
  }

  @Get('data2')
  async getDataFromService2(): Promise<any> {
    return this.namedHttpService2.get('/data');
  }
}
```

In the example above, `NamedHttpService1` and `NamedHttpService2` are named HTTP service classes that extend the `BaseHttpService`. Each named service has its own configuration and can be injected into controllers or other services. You can then use these named services to make HTTP requests with specific configurations based on your needs.

Although NestJS doesn't provide a direct equivalent of ASP.NET's named `HttpClient`, this approach allows you to achieve similar functionality by utilizing custom HTTP service classes.
