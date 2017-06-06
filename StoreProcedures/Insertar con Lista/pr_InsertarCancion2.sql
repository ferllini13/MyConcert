CREATE PROCEDURE pr_InsertarCancion2
	@canciones StringList readonly,
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarCancion2

    Begin Try
		
		insert into CANCION(nombre, bandaID)
			select C.item, @bandaID
			from @canciones as C
			group by C.item

        COMMIT TRAN insertarCancion2

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarCancion2

    End Catch

END
GO