CREATE PROCEDURE pr_InsertarArtista2
	@bandaID int,
	@artistas StringList readonly
AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran InsertarArtista2

    Begin Try		
		
		insert into ARTISTA(nombre, bandaID)
			select A.item, @bandaID
			from @artistas as A
			group by A.item

        COMMIT TRAN InsertarArtista2

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN InsertarArtista2

    End Catch

END
