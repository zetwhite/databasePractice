create database market; 
use market; 

create table Customer(
    name varchar(30) not null primary key, 
    phone varchar(20) , 
    address varchar(30) , 
    gender char(1) not null
); 

create table Product(
    name varchar(30) not null, 
    productid varchar(10) primary key, 
    suppliername varchar(30) not null 
); 

create table Transition(
    transitionid varchar(30) primary key, 
    productid varchar(10) not null, 
    price real not null, 
    date date not null, 
    customername varchar(30) not null
); 