# Loan Application Exercise

## Overview

The application is a web-based platform that approximates the process of applying for loans by submitting personal and loan details and reviewing lender offers.

## Architecture

- **Backend**: The backend is built using Java and Spring Boot. It handles the business logic, data persistence, and provides RESTful APIs for the frontend.
- **Frontend**: The frontend is built using React and TypeScript. It provides an interface for users to submit personal & loan details and review offers.

### Backend
The backend architecture follows a typical Controller-Service-Repository architecture with the following components:
- **Controller**: Handles incoming HTTP requests, delegates to the service layer, and returns the response.
- **Service**: Contains the business logic and interacts with the repository layer.
- **Repository**: Handles data persistence and retrieval using JPA.
- **Model**: Represents the data entities used in the application.

The backend provides RESTful APIs for the frontend.
On submission of the  personal & loan details the backend calculates the loan offers based on the loan details provided by the user. 
The personal details, loan details, and offers are then persisted in the database, and the offers are returned for display.

The persistence layer uses an embedded H2 database. It is initialized with some lender data on application startup (see [data.sql](src/main/resources/data.sql)).
The tables are automatically created based on the entity classes.
The database is configured to run in-memory and is reset on application restart.

The h2 console is enabled for database querying. It can be accessed at `http://localhost:8080/h2-console` using the JDBC URL `jdbc:h2:mem:driva` and the username `sa`.

### Frontend
The frontend is a single-page app built using React and TypeScript. It uses React Hook Form for form management and Zod for form validation.
The form state is managed through a shared context facilitate communication between components, including the form and the progress tracker.
Form state is persisted in session storage to allow for form data to be retained on page refresh.

The process of applying for a loan involves the following steps:
1. **Personal Details**: The user enters their personal details, including name, email, and phone number.
2. **Loan Details**: The user enters the loan amount and term.
3. **Review**: The user submits the application and receives a summary of the offers from available lenders.

The frontend is packaged with the backend into a single jar file and served as a resource. 
This is done using `frontend-maven-plugin` to build the app and `maven-resources-plugin` to copy it to the resources directory.

## Technologies Used

- **Backend**:
    - Java 17
    - Spring Boot
    - Maven
    - Java Validation API (for request validation)
    - JPA (Jakarta Persistence API)
    - H2 In-memory Database
- **Frontend**:
    - React 19
    - TypeScript
    - Vite (for build)
    - React Hook Forms
    - Zod (for form validation)
    - Tailwind CSS (for styling, if you can call it that)
    - Yarn
    - NPM
- **Testing**:
    - **Backend**:
        - JUnit
        - Mockito
        - [RestAssured](https://rest-assured.io/) (for API testing)
        - [Instantio](https://www.instancio.org/) (for test data generation)
    - **Frontend**:  
       - Cypress
      - [faker.js](https://fakerjs.dev/) (for test data generation)

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js
- Yarn or NPM
- Maven
- IDE (IntelliJ IDEA Highly recommended)

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Daekard/sample-loan-application.git
    cd driva-loan-application
    ```

2. **App Setup**:
The following command will package the frontend and backend into a single jar file which can be run using `java -jar .\target\driva-loan-application-0.0.1-SNAPSHOT.jar`.
The frontend will be served on `http://localhost:8080` and the backend APIs will be served on `http://localhost:8080/api`.
    ```sh
    mvn clean install
    ```
3. **Backend Setup**:
The application can be run using the following maven command:
    ```sh
    mvn spring-boot:run
    ```

3. **Frontend Setup**:
    ```sh
    cd driva-frontend
    yarn install
    yarn dev
    ```

## Running Tests

1. **Backend Tests (Unit and Integration)**:
    ```sh
    mvn test
    ```
2. **Frontend Tests (E2E and Integration)**:
    ```sh
    cd driva-frontend
    yarn cypress run
    ```
Note: Frontend e2e tests require the backend to be running.
3. **Frontend Tests (Component)**:
    ```sh
    cd driva-frontend
    yarn cypress run --component
    ```

## Project Structure

The project structure consist of the following modules:
- **root**: Contains the backend code, frontend code, and maven configuration files.
    - **src/main/java**: Contains the backend code including the application entry point, controllers, services, repositories, and models.
    - **src/main/resources**: Contains the backend resources including the application properties and data.sql.
    - **src/test/java**: Contains the backend tests.
    - **driva-frontend**: Contains the frontend code including the React application, tests, and configuration files.


## Testing Details

### Backend Tests
Backend tests include unit tests for the service layer and integration tests for the service and controller layer.
RESTful API tests are implemented using RestAssured to cover form submission and offer retrieval, as well as validation tests for the request payloads.

### Frontend Tests
Frontend tests include end-to-end tests using Cypress to cover the user journey of applying for a loan.
e2e/integration tests are also included to cover the form validation.
Component tests are implemented using Cypress to cover the form components and their interactions.
