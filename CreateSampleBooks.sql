use [bookish];
go

drop procedure dbo.AddBook;
go

CREATE PROCEDURE [dbo].[AddBook]
    -- @id int out,
    @title VARCHAR(255) = NULL,
    @author VARCHAR(255) = NULL,
    @isbn varchar(14) = NULL
AS

    INSERT INTO dbo.Books ([Title], [Author], [ISBN])
    VALUES (@title, @author, @isbn);

    declare @id int
    SET @id = SCOPE_IDENTITY();

    INSERT INTO dbo.Copies ([BookId]) values (@id)

go

exec AddBook @title='The Lord of the Rings Illustrated', @author='J.R.R Tolkien', @isbn='9780358653035';
exec AddBook @title='Animal Farm', @author='George Orwell', @isbn='9789176379035';
exec AddBook @title='Scorpia (Alex Rider)', @author='Anthony Horowitz', @isbn='9780142405789';
exec AddBook @title='The Lord of the Rings Illustrated', @author='J.R.R Tolkien', @isbn='9780358653035';
go

