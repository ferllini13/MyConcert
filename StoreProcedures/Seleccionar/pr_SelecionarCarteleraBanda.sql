CREATE PROCEDURE pr_SelecionarCarteleraBanda
	@carteleraID int,
	@categoriaID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran SelecionarCarteleraBanda

    Begin Try
		
		select B.id, B.nombre
		from cartelera_categoria_banda as CCB inner join banda as B on B.id = CCB.bandaID
		where CCB.carteleraID = @carteleraID and CCB.categoriaID = @categoriaID
		group by B.id, B.nombre 

        COMMIT TRAN SelecionarCarteleraBanda

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN SelecionarCarteleraBanda

    End Catch

END
GO