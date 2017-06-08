CREATE PROCEDURE pr_SelecionarArtistaBanda
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarArtistaBanda

    Begin Try
		
		select A.nombre from artista as A where A.bandaID = @bandaID

        COMMIT TRAN SelecionarArtistaBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarArtistaBanda

    End Catch

END
GO


