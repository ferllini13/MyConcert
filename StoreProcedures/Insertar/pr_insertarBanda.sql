CREATE PROCEDURE pr_insertarBanda
	@nombre varchar(30),
	@popularidad int,
	@seguidores int, 
	@pais varchar(30),
	@generos intList readonly,
	@foto varchar(150)

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarBanda

    Begin Try

		insert into BANDA(nombre, calificacion, foto, seguidores, popularidad, pais)
		values(@nombre, 0, @foto, @seguidores, @popularidad, @pais)

		declare @bandaID int
		declare @catalogoID int


		print(@bandaID)

		insert into CATALOGO_BANDA(bandaID, catalogoID)
		values(@bandaID, (select id from catalogo))		

		insert into BANDA_GENERO(generoID, bandaID)
			select G.id, @bandaID
			from Genero as G
			where G.id in (select item from @generos)
			group by G.id

        COMMIT TRAN insertarBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarBanda

    End Catch

END
GO
