CREATE PROCEDURE pr_SelecionarCarteleraCategorias
	@carteleraID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarCarteleraCategorias

    Begin Try
		
		select cat.id, cat.nombre
		from cartelera_categoria_banda as CCB inner join categoria as cat on cat.id = CCB.categoriaID
		where CCB.carteleraID = @carteleraID
		group by cat.id, cat.nombre 

        COMMIT TRAN SelecionarCarteleraCategorias

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarCarteleraCategorias

    End Catch

END
GO