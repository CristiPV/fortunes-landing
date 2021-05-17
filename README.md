# Fortune's Landing

Fortune's Landing is an online ***'Wheel of Fortune'*** / ***'Spin the Wheel'*** game.

It can be accessed at www.fortunes-landing.com or ran locally.

The user is presented a wheel with prizes and a button which can be clicked in order to make an indicator spin around the wheel until it reaches the winning prize.

Every time a prize has been won, a **Toast** notification pops up, notifying the user about the win.

The history of won prizes can also be seen on a secondary page.

---

The project consists of a frontend application written in **React** and an API written in **Java**, using Spring.

The API uses a **MySQL** database hosted on an
Amazon Web Services RDS Instance.

## Installation

### Frontend
Navigate to the frontend application's [directory](./frontend/fortunes-landing/): `ROOT/frontend/fortunes-landing/`.

Use the package manager [npm](https://www.npmjs.com) to install the project's dependencies:

```
npm install
```

The App is using an **environment variable**: `REACT_APP_API_URL` - it contains base URL to the API.

A `.env` file has to be created with all the **environment variables** specified in the [`.env-template`](./frontend/fortunes-landing/.env-template) in the root folder of the **React app**.

---

### Backend
The API is using an **environment variable**: `FORTUNES_LANDING_URL` - it contains the connection link to the database.\
It can either be set as a system environment variable or it can be replaced in the [`
application.properties`](./backend/api/src/main/resources/application.properties).

## Usage

In order to have a fully functioning frontend, the backend has to be running as well.

### Backend
The API can be launched from the [`ApiApplication`](./backend/api/src/main/java/com/fortuneslanding/api/ApiApplication.java) class located in [`ROOT\backend\api\src\main\java\com\fortuneslanding\api`](./backend/api/src/main/java/com/fortuneslanding/api) folder.

Alternatively, it can be launched by using the Maven files, from the [root directory](./backend/api), with the command: 
```
./mvnw spring-boot:run
``` 
or this for Windows:
```
mvn.cmd spring-boot:run
```

It will run on port `5000` by default and it can be changed by configuring the [`application.properties`](./backend/api/src/main/resources/application.properties) file.

---

### Frontend
Launch the frontend application by navigating to its [directory](./frontend/fortunes-landing/): `ROOT/frontend/fortunes-landing/`, and run the `start` script.

It will run on port `3000` by default and will be available at [http://localhost:3000](http://localhost:3000).
```
npm start
```

## Others

### Requirements

 - [Node](https://nodejs.org/en/) is required for running the  **React** application.

 - Java 11 is required for running the **Java** API.

### Technologies

 - [Node](https://nodejs.org/en/) - version: v14.16.0
 - NPM - version: 6.14.11 

 > The **dependencies** and their **versions** for the React app can be found in the [`package.json`](./frontend/fortunes-landing/package.json) file.
---
 - JDK - version: 11
 - Spring 
 - Maven - version: 4.0.0

> The **dependencies** for the Java API can be found in the [`pom.xml`](./backend/api/pom.xml) file.

### Frontend Application

The **scripts** used in the app can be found [here](./docs/frontend/scripts.md) or in the `/docs/frontend/scripts.md` file.

### API

The **endpoints** of the API can be found [here](./docs/backend/endpoints.md) or in the `/docs/backend/endpoints.md` file.

The creation and population **scripts** for the database can be found in the  [`/docs/backend`](./docs/backend/) folder, along with the **ERD** of the database.

### Development Tools Used

 - Visual Studio Code: used for developing the React Application
 - IntelliJ Idea Ultimate: used for developing the Java API
 - Postman: used testing the API endpoints

## License
[MIT](https://choosealicense.com/licenses/mit/)