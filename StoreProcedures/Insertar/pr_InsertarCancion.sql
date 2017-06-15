CREATE PROCEDURE pr_InsertarCancion
	@canciones_links StringList2 readonly,
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarCancion

    Begin Try
		
		declare @tmpTable as table (nombre varchar(30), bandaID int, link varchar(200))
		insert into CANCION(nombre, bandaID, link)
			select CL.item, @bandaID, CL.item2
			from @canciones_links as CL
			group by CL.item, CL.item2

        COMMIT TRAN insertarCancion

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarCancion

    End Catch

END
GO
