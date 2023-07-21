### Philosophy of UTL

- [TDD]
  - red-green testing : red test -> green test
- [Why TDD]
  - part of the coding process
  - more efficient : re run test for free after changes
- [React Testing Library] : Creates virtual DOM for testing
- [Types of Tests]
  - Unit tests : Test one unit of code in isolation
  - Integration tests : How mulitple units work together
  - Functional Tests : Tests a paricular function of software. (not code but behavior)
  - Acceptance /End-to-end(E2E) Tests : Use actual browser and server (Cypress, Selenium)

### Functional Testing

- [Unit Testing]
  - isolated : mock dependencies, test internals
  - very easy to pinpoint failures
  - further from how users interact with software
  - more likely to break with refactoring
- [Functional Testing]
  - include all relevant units, test behavior
  - close to how users interact with software
  - robust tests : validate refactoring
  - more difficult to debug failing tests

### TDD vs BDD

- [BDD] : Behavior-Driven Development -> defines process for different groups to interact (developers, QA, business partner, etc)

### Accessibility and Finding Elements

- [Testing Library](https://testing-library.com/docs/queries/about/#priority)
- [Role Documentaion](https://www.w3.org/TR/wai-aria/#role_definitions)
  - e.g. button, a
