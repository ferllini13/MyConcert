CREATE PROCEDURE pr_InsertarCancion
	@nombre varchar(30),
	@bandaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarCancion

    Begin Try
		
		insert into cancion(nombre, bandaID)
		values(@nombre, @bandaID)

        COMMIT TRAN insertarCancion

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarCancion

    End Catch

END
GO
