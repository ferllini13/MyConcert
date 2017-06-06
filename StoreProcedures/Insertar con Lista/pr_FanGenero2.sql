CREATE PROCEDURE pr_FanGenero2
	@userID int,
	@generoID intList readonly
AS
BEGIN
	
	SET NOCOUNT ON;
	declare @msg as VARCHAR(1000)
    Begin Tran FanGenero2

    Begin Try		
		
		insert into FAN_GENERO(fanID, generoID)
			select @userID, G.id
			from Genero as G
			where G.id in (select item from @generoID)
			group by G.id


        COMMIT TRAN FanGenero2

    End try
    Begin Catch
        SET @msg = '101'
		print @msg
        Rollback TRAN FanGenero2

    End Catch

END
GO