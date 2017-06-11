CREATE PROCEDURE pr_insertarBanda
	@nombre varchar(30),
	@popularidad int,
	@seguidores int, 
	@pais varchar(30),
	@foto varchar(150)

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarBanda

    Begin Try
		
		insert into BANDA(nombre, calificacion, foto, seguidores, popularidad, pais)
		values(@nombre, 0, @foto, @seguidores, @popularidad, @pais)

		insert into CATALOGO_BANDA(bandaID, catalogoID)
		values((select id from banda where banda.nombre = @nombre), (select id from catalogo))

        COMMIT TRAN insertarBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarBanda

    End Catch

END
GO
