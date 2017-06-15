CREATE PROCEDURE pr_SelecionarBandaAlbum
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarBandaAlbum

    Begin Try
		
		select A.nombre, A.foto
		from album as A inner join banda as B on B.id = A.bandaID 
		where B.id = @bandaID

        COMMIT TRAN SelecionarBandaAlbum

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarBandaAlbum

    End Catch

END
GO
