# Server-Testing

## Project Set Up

Follow these steps to setup your git _fork_ and _branch_.

- [ ] Fork this repository.
- [ ] Use GitHub's website to add your project manager as collaborator on **your fork**.
- [ ] **Clone your forked version** of the repository (**Not Lambda's**!).
- [ ] Create a new branch: `git checkout -b <firstName-lastName>`.
- [ ] Commit changes to your `<firstName-lastName>` branch.
- [ ] Push often to your branch: `git push origin <firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge the `<firstName-lastName>` branch into the master branch on your fork. **Please don't merge your own pull request**
- [ ] Use GitHub's webiste to add your project manager as a reviewer on the pull-request.
- [ ] Your project manager will count the project as complete by merging the branch back into the master branch of your forked repository.

## Topics

- automated testing.
- jest testing framework.
- supertest module.

## Assignment

For this project you will use `Test Driven Development` to create a RESTful API using `Node.js` and `Express` that publishes a set of endpoints to manage a _resource_ of your choosing. Data can be stored in memory, adding a **test database is optional**.

## Download Project and Install Dependencies

1.  fork and clone this repository.
1.  **CD into the folder** where you downloaded the repository.
1.  run `yarn` or `npm i` to download all dependencies.
1.  type `yarn test` or `npm test` to run the tests. The `test` script is already configured.

## Requirements

1.  use `jest` and `supertest` to write the tests.
1.  Your API must be able to **create** and **delete** a _resource_ of your choosing.
1.  Write a minimum of two tests per route handler.
1.  Add tests to verify that the endpoints return the correct HTTP status codes.
1.  Write the **tests BEFORE** writing the route handlers.
