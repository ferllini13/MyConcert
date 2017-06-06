CREATE PROCEDURE pr_InsertarArtista	
	@bandaID int,
	@nombre varchar(100)

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarArtista

    Begin Try
		
		insert into artista(nombre, bandaID)
		values(@nombre, @bandaID)

        COMMIT TRAN insertarArtista

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarArtista

    End Catch

END
GO