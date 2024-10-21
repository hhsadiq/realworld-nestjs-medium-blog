# Medium backend clone

Implementing the [Realworld Medium Clone Specifications](https://realworld-docs.netlify.app/docs/implementation-creation/features) using TypeORM/Postgres and Hexagonal Architecture.

## Documentation <!-- omit in toc -->

[Full documentation here](/docs/readme.md)

## Roadmap

1. **Add Type and Example in Swagger APIProperty() Decorator**

   - Update the Swagger `APIProperty()` decorator to include type and example properties for better API documentation.

2. **Integrate with Real-World Open Source Third-Party APIs**

   - Build a solid architecture for interacting with third-party APIs to ensure seamless and reliable integrations.

3. **Implement the Remaining [RealWorld API Specifications](https://realworld-docs.netlify.app/specifications/backend/endpoints/)**

   - [Follow User](https://realworld-docs.netlify.app/specifications/backend/endpoints/#follow-user)
   - [Unfollow User](https://realworld-docs.netlify.app/specifications/backend/endpoints/#unfollow-user)
   - [Feed Articles](https://realworld-docs.netlify.app/specifications/backend/endpoints/#feed-articles)
   - [Favorite Article](https://realworld-docs.netlify.app/specifications/backend/endpoints/#favorite-article)
   - [Unfavorite Article](https://realworld-docs.netlify.app/specifications/backend/endpoints/#unfavorite-article)

4. **Add Unit Testing and E2E Testing**
   - Implement comprehensive unit and e2e tests to ensure code quality and functionality. Leverage Hygen templates to automate the creation of test files where possible, streamlining the testing process.

## Features

- [x] This project is using [TypeORM](https://www.npmjs.com/package/typeorm) along with [PostgreSQL](https://www.postgresql.org/).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] Internationalization/Translations (I18N) ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] Support E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).
