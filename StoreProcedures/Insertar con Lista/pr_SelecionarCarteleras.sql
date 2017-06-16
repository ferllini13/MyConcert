CREATE PROCEDURE pr_SelecionarCarteleras

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarCarteleras

    Begin Try
		
		select C.id, C.nombre, C.foto, P.nombre 
		from Cartelera as C inner join Pais as P on P.id = C.paisID
		group by C.id, C.nombre, C.foto, P.nombre 

        COMMIT TRAN SelecionarCarteleras

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarCarteleras

    End Catch

END
GO


