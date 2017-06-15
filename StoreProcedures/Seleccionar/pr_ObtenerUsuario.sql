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

		declare @ugID int
		declare @rolID int

		set @ugID = (select UG.id from usuario_general as UG where UG.nombreUsuario = @nombreUsuario and UG.contraseña = @contraseña)
		set @rolID = (select UG.rolID from usuario_general as UG where UG.id = @ugID)

		if (@rolID = 2) begin
			insert into @tmpTable(id, rolID, activo)
				select UP.id,  UG.rolID, UG.activo
				from USUARIO_GENERAL as UG inner join USUARIO_PROMOCION as UP on UP.guID = UG.id
				where UG.id = @ugID
				group by UP.id, UG.rolID, UG.activo
		end
		else if (@rolID = 1) begin
			insert into @tmpTable(id, rolID, activo)
				select UF.id,  UG.rolID, UG.activo
				from USUARIO_GENERAL as UG inner join FAN_USUARIO as UF on UF.guID = UG.id
				where UG.id = @ugID
				group by UF.id, UG.rolID, UG.activo
		end
		select * from @tmpTable

        COMMIT TRAN obtenerFanatico

    End try
    Begin Catch

        SET @msg = '101'
		print @msg
        Rollback TRAN obtenerFanatico

    End Catch

END