CREATE PROCEDURE pr_InsertarHorarioCartelera
	@dia date,
	@horaInicio varchar(10),
	@horaFinal varchar(10),
	@carteleraID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarHorario

    Begin Try
		
		insert into horario(dia, horaInicio, horaFinal, carteleraID)
		values(@dia, @horaInicio, @horaFinal, @carteleraID)
		


        COMMIT TRAN insertarHorario

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarHorario

    End Catch

END
GO
