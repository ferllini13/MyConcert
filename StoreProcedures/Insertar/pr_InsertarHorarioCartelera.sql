CREATE PROCEDURE pr_InsertarHorarioCartelera
	@dia varchar(10),
	@horaInicio varchar(10),
	@horaFinal varchar(10),
	@carteleraID int

AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran insertarHorario

    Begin Try
		
		insert into horario(dia, horaInicio, horaFinal)
		values(@dia, @horaInicio, @horaFinal)
		
		insert into horario_cartelera(horarioID, carteleraID)
		values((select H.id from horario as H where H.dia = @dia and H.horaInicio = @horaInicio and H.horaFinal = @horaFinal), @carteleraID)

        COMMIT TRAN insertarHorario

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN insertarHorario

    End Catch

END
GO
