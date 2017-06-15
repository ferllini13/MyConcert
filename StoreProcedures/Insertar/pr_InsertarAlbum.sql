CREATE PROCEDURE pr_InsertarAlbum
	@albums_fotos StringList2 readonly,
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran InsertarAlbum

    Begin Try
		
		insert into ALBUM(nombre, foto, bandaID)
			select AF.item, AF.item2, @bandaID
			from @albums_fotos as AF
			group by AF.item, AF.item2
		set @msg = '0'
		select @msg
        COMMIT TRAN InsertarAlbum

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
		select @msg
        Rollback TRAN InsertarAlbum

    End Catch

END
GO
