CREATE PROCEDURE pr_InsertarCartelera
	@nombre varchar(15),
	@pais int,
	@ubicacion varchar(100),
	@diaFinalVotaciones varchar(10),
	@diaDeInicio varchar(10),
	@diaFinal varchar(10),
	@foto varchar(150)

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarCartelera

    Begin Try
		
		insert into cartelera(nombre,paisID,ubicacion, diaFinalVotaciones, diaDeInicio, diaFinal, foto)
		values(@nombre, @pais, @ubicacion, @diaFinalVotaciones, @diaDeInicio, @diaFinal, @foto)

        COMMIT TRAN insertarCartelera

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarCartelera

    End Catch

END
GO
