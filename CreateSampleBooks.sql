use [bookish];
go

drop procedure dbo.AddBook;
go

CREATE PROCEDURE [dbo].[AddBook]
    @title VARCHAR(255) = NULL,
    @author VARCHAR(255) = NULL,
    @isbn varchar(14) = NULL
AS
    declare @recordCount int
    set @recordCount = (select count(*) from Books where [Title]=@title AND [Author]=@author AND [ISBN]=@isbn)

    IF @recordCount < 1
    begin
        INSERT INTO dbo.Books ([Title], [Author], [ISBN])
        VALUES (@title, @author, @isbn);
    end

    declare @bookId int
    select @bookId=BookId from Books where [Title]=@title AND [Author]=@author AND [ISBN]=@isbn;

    INSERT INTO dbo.Copies ([BookId]) values (@bookId)

go

exec AddBook @title='The Lord of the Rings Illustrated', @author='J.R.R Tolkien', @isbn='9780358653035';
exec AddBook @title='Animal Farm', @author='George Orwell', @isbn='9789176379035';
exec AddBook @title='Scorpia (Alex Rider)', @author='Anthony Horowitz', @isbn='9780142405789';
exec AddBook @title='The Lord of the Rings Illustrated', @author='J.R.R Tolkien', @isbn='9780358653035';
go

