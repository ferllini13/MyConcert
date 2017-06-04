CREATE PROCEDURE pr_InsertarCategoria
	@nombre varchar(15),
	@descripcion varchar(100)

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarCategoria

    Begin Try
		
		insert into categoria(nombre,descripcion)
		values(@nombre,@descripcion)

        COMMIT TRAN insertarCategoria

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarCategoria

    End Catch

END
GO
