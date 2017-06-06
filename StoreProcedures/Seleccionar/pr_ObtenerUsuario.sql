CREATE PROCEDURE pr_ObtenerUsuario
	@nombreUsuario varchar(10),
	@contraseña varchar(50)

AS
BEGIN

    SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran obtenerUsuario

    Begin Try	
		
		declare @tmpTable table(id int, rolID int, activo bit)
		
		insert into @tmpTable(id, rolID, activo)
			select UF.id,  UF.rolID, UG.activo
			from USUARIO_GENERAL as UG inner join FAN_USUARIO as UF on UF.guID = UG.id
			where UG.nombreUsuario = @nombreUsuario and UG.contraseña = @contraseña
			group by UF.id, UF.rolID, UG.activo
		
		select * from @tmpTable

        COMMIT TRAN obtenerFanatico

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN obtenerFanatico

    End Catch

END