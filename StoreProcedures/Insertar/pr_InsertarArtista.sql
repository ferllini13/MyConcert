CREATE PROCEDURE pr_InsertarArtista	
	@bandaID int,
	@artistas StringList readonly

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarArtista

    Begin Try
		
		insert into artista(nombre, bandaID)
			select A.item, @bandaID
			from @artistas as A
			group by A.item

        COMMIT TRAN insertarArtista

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarArtista

    End Catch

END
GO