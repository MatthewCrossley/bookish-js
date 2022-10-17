use bookish
go

create table Checkouts(
    ISBN int IDENTITY(1,1) not null primary key,
    UserId int null,
    CheckoutDate date not null,
    DueDate date not null,
    ReturnDate date null
)
go

create table Books(
    BookId int IDENTITY(1,1) not null primary key,
    Title varchar(255) not null,
    Author varchar(255) not null,
    ISBN varchar(14)
)

create table Users(
    UserId int IDENTITY(1,1) not null primary key,
    Username varchar(128) not null,
    Pass varchar(512) not null,
    Salt varchar(256) not null
)

go