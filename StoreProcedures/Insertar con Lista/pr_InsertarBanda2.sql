CREATE PROCEDURE pr_InsertarBanda2
	@bandaNombre varchar(30),
	@artistas StringList readonly,
	@canciones StringList readonly,
	@generos intList readonly

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarBanda2

    Begin Try

		insert into BANDA(nombre, calificacion)
		values(@bandaNombre, 0)

		declare @bandaID int

		set @bandaID = (select id from BANDA where BANDA.nombre = @bandaNombre)

		insert into artista(nombre, bandaID)
			select A.item, @bandaID
			from @artistas as A
			group by A.item

		
		insert into CANCION(nombre, bandaID)
			select C.item, @bandaID
			from @canciones as C
			group by C.item

		insert into BANDA_GENERO(generoID, bandaID)
			select G.id, @bandaID
			from Genero as G
			where G.id in (select item from @generos)
			group by G.id

        COMMIT TRAN insertarBanda2

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarBanda2

    End Catch

END
GO