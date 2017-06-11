CREATE PROCEDURE pr_InsertarAlbum
	@albums StringList readonly,
	@fotos StringList readonly,
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran InsertarAlbum

    Begin Try
		
		insert into ALBUM(nombre, foto, bandaID)
			select A.item, F.item, @bandaID
			from @albums as A, @fotos as F
			group by A.item, F.item

        COMMIT TRAN InsertarAlbum

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN InsertarAlbum

    End Catch

END
GO
