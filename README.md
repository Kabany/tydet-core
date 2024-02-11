# TyDeT Core
> A Typescript & Javascript library with reusable components for a backend web server.

TyDeT (Typescript Developer Tools) Core is a set of components for handling the lifecycle of services like the Express Middleware, Databses and more.

## Installation

This is a Node.js module available through the npm registry. Installation is done using the npm install command:

```shell
npm install tydet-core
```

If you want to use a service, for example a MySQL connection, you can install the submodules using the npm install command:

```shell
npm install tydet-core-mysql
```

You can check the available modules in the following page (TBD).

## Usage

### Basic usage

```js
import { Context, Service } from 'tydet-core';

let app = new Context();
let parameters = new Map<string, any>(); // set args depending on the service
let service = new Service(parameters, app);
await app.mountService("service", Service);

// get a service
app.getService("service").doSomething();
```

<!--Check the [docs][docs] for all the available components. -->

## Changelog

[Learn about the latest improvements][changelog].

## License

[MIT License][license].

## Contributing

We'd love for you to contribute to TyAPI-Core and help make it even better than it is today! Find out how you can contribute [here][contribute].



<!-- Markdown link & img dfn's -->
[license]: ./LICENSE
[changelog]: ./CHANGELOG.md
[contribute]: ./CONTRIBUTING.md
<!--[docs]: ./docs/README.md -->