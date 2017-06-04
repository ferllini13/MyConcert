CREATE PROCEDURE pr_ObtenerUsuario
	@nombreUsuario varchar(10)

AS
BEGIN

    SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran obtenerUsuario

    Begin Try	
		
		declare @tmpTable table(id int, rolID int)
		
		insert into @tmpTable(id, rolID)
			select UF.id,  UF.rolID
			from USUARIO_GENERAL as UG inner join FAN_USUARIO as UF on UF.guID = UG.id
			where UG.nombreUsuario = @nombreUsuario
			group by UF.id, UF.rolID
		
		select * from @tmpTable

        COMMIT TRAN obtenerFanatico

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN obtenerFanatico

    End Catch

END