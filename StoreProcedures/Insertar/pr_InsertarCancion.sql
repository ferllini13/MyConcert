CREATE PROCEDURE pr_InsertarCancion
	@canciones StringList readonly,
	@links StringList readonly,
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarCancion

    Begin Try
		
		insert into CANCION(nombre, bandaID, link)
			select C.item, @bandaID, L.item
			from @canciones as C, @links as L
			group by C.item, L.item

        COMMIT TRAN insertarCancion

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarCancion

    End Catch

END
GO
