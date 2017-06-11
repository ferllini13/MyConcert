CREATE PROCEDURE pr_InsertarGeneroBanda
	@generos intList readonly,
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran InsertarGeneroBanda

    Begin Try
		
		insert into BANDA_GENERO(generoID, bandaID)
			select G.id, @bandaID
			from Genero as G
			where G.id in (select item from @generos)
			group by G.id

        COMMIT TRAN InsertarGeneroBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN InsertarGeneroBanda

    End Catch

END
GO
