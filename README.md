# secure-authentication-system
using Spring Boot, React, JWT, BCrypt encryption, and OTP-based password reset.


Tech Stack:

Backend:
Java
Spring Boot
JWT Authentication

Frontend:
React.js
CSS

Database:
MySQL


libraries need to install in Frontend:

npm install axios
npm install react-router-dom


if you want to create a new App

npx create-react-app frontend

after creating replace the src folder and install above libraries


Configure application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/reglogin
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=Your_mailid
spring.mail.password=Goggle Pass key
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true


Database:

CREATE DATABASE reglogin;

Table:

create table users(
    id integer auto_increment primary key,
    name varchar(100) not null,
    email varchar(150) unique not null,
    phone varchar(15) unique not null,
    password varchar(10) not null,
    otp varchar(10),
    otp_expiry datetime
);


Backend :

generate spring boot file using spring initializer.

add all the dependencies shown in pom.xml file.

To run the backend:

mvn clean install
mvn spring-boot:run