# Shopping Cart DDD Example

A basic Node/TypeScript application that demonstrates principles of Domain-Driven Design (DDD). The example implements a shopping cart in the form of a REST API.

### Table of Contents

  + [Quick Links](#quick-links)
  + [Getting Started](#getting-started)
    - [Building the API Application](#building-the-api-application)
    - [Testing the API](#testing-the-api)
  + [Project Structure](#project-structure)
    - [NestJS & Domain-Driven Development](#nestjs---domain-driven-development)

## Quick Links

[Martin Fowler Articles](https://martinfowler.com/tags/domain%20driven%20design.html) | [DDD w/ TypeScript](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/) | [NestJS](https://docs.nestjs.com/) | [Google TypeScript Styleguide](https://github.com/google/gts)

## Getting Started

### Building the API Application

You'll need a recent version of Node v8.0.0 or higher.

#### Step 1. Fork the repo

"A fork is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project." - [GitHub](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo)

Forking the repository--as opposed to creating a separate branch--will allow you to make larger scale changes and maintain autonomy from the source project.

To learn how to form a repository in GitHub, navigate to the [GitHub Docs Quick Start guide](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo)

#### Step 2. Clone Your Forked Repository

Create a local instance of the forked repsoitory on your machine by cloning your fork.

``` bash
git clone https://github.com/<your-username>/shopping-cart-domain-example.git
```

#### Step 2. Install Dependencies

``` bash
npm ci
```

#### Step 3. Start a Local Server

``` bash
npm run dev
```

#### Step 4. Preview the API in Postman or Your Application of Choice

Open `http://localhost:8000/api` to view the api locally.
Changes or updates to `src/` will rebuild the api.

### Testing the API

Automated testing is incorporated into the build scripts through use of the [Jest testing framework](https://jestjs.io/). 

| Command            | Description                                                                                 |   |   |   |
|--------------------|---------------------------------------------------------------------------------------------|---|---|---|
| npm run test       | Executes the Jest command, running all test suites once.                                    |   |   |   |
| npm run test:watch | Starts the Jest test runner in watch mode, which re-runs tests whenever a file has changed. |   |   |   |
| npm run test:cov   | Runs Jest using the `--coverage` flag. Used to generate testing reports.                    |   |   |   |

## Project Structure

The layout of files and folders witin this project are meant to follow a domain-driven mindset. This means that models and logic are grouped together--often in the same folder--based on their "domain" purpose.

The NestJS framework refers to these groupings as "modules, " which form the basis of a single feature. 

> "A feature module simply organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries. This helps us manage complexity and develop with SOLID principles, especially as the size of the application and/or team grow. 
>
> [NestJS Documentation](https://docs.nestjs.com/modules#modules)

Within a `Produce` module, to take an example from this project, everything related to the given "Produce" domain would be located within the same directory. Here is how that structure would look: 

``` 

produce/
├── dto
│   ├── create-produce.dto.ts
│   └── update-produce.dto.ts
├── interfaces
│   └── produce.interface.ts
├── produce.controller.spec.ts
├── produce.controller.ts
├── produce.service.spec.ts
└── produce.service.ts
```

* `dto/`: Defines data-transfer interfaces, or the shape of data transfered between the client and the API. Note that DTOs do not contain any logic; they purely model state. NestJS prefers to implent DTO "interfaces" via the class keyword as such: 

``` typescript
export class CreateProduceDto {
  readonly name: string;
  readonly cost: number;
  readonly type: 'fruit' | 'vegitable';
}
```

* `interfaces/`: Contains definitions of objects internal to the back-end implementation; this includes interfaces for Data Access Objects, Repositories, and Domain "Value" models. Interfaces in this folder are meant to be simple, straightforward, and reinforce [SOLID](https://en.wikipedia.org/wiki/SOLID) principles. 
* `produce.controller.ts`: Should be responsible for handling incoming produce requests and returning responses to the client. A controller should be "dumb, " meaning it does not have any "business" logic incorporated; business logic belongs in the service.
* `produce.service.ts`: A service file provides the core logic of a feature. Often a service is divided into multiple services, each handling a separate core responsibility. For instance, the responsibility of fetching data from a database may belong to a `ProduceRepository` service, while the work of re-stocking fresh produce may belong to a `ProduceRestocking` service.
* `**/*.spec.ts`: The spec files found within the `produce/` directory are soley responsible for testing Produce functionality. The use of the "spec" keyword helps identifies these tests as "unit tests, " as opposed to end-to-end tests (e2e) which are often located at the root level in a `__tests__` folder.

### NestJS & Domain-Driven Development
