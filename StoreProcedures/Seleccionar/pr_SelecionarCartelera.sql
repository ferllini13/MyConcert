CREATE PROCEDURE pr_SelecionarCartelera
	@carteleraID int
AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarCartelera

    Begin Try
		
		select C.id, C.nombre, P.nombre, C.ubicacion, C.diaFinalVotaciones, C.diaDeInicio, C.diaFinal, C.foto 
		from Cartelera as C inner join Pais as P on P.id = C.paisID
		where C.id = @carteleraID
		group by C.id, C.nombre, P.nombre, C.ubicacion, C.diaFinalVotaciones, C.diaDeInicio, C.diaFinal, C.foto 

        COMMIT TRAN SelecionarCartelera

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarCartelera

    End Catch

END
GO


