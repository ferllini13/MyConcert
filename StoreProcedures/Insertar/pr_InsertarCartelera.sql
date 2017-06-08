CREATE PROCEDURE pr_InsertarCartelera
	@nombre varchar(15),
	@pais int,
	@ubicacion varchar(100),
	@diaFinalVotaciones date,
	@diaDeInicio date,
	@diaFinal date

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarCartelera

    Begin Try
		
		insert into cartelera(nombre,paisID,ubicacion, diaFinalVotaciones, diaDeInicio, diaFinal)
		values(@nombre, @pais, @ubicacion, @diaFinalVotaciones, @diaDeInicio, @diaFinal)

        COMMIT TRAN insertarCartelera

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarCartelera

    End Catch

END
GO
