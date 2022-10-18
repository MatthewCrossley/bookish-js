use bookish
go

drop table Checkouts
drop table Books
drop table Copies
drop table Users

create table Checkouts(
    CopyId int not null,
    UserId int null,
    CheckoutDate date not null,
    DueDate date not null,
    ReturnDate date null
);

create table Books(
    BookId int IDENTITY(1,1) not null primary key,
    Title varchar(255) not null,
    Author varchar(255) not null,
    ISBN varchar(14)
);

create table Copies(
    CopyId int IDENTITY(1,1) not null primary key,
    BookId int not null,
    constraint bk_group foreign key (BookId) references Books(BookId)
);

create table Users(
    UserId int IDENTITY(1,1) not null primary key,
    Username varchar(128) not null,
    Pass varchar(512) not null,
    Salt varchar(256) not null
)

go