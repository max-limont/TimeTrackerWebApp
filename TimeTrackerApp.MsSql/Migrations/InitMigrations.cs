using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(202106280001)]
public class InitMigrations:Migration
{
    public override void Up()
    {
        Create.Table("Users")
            .WithColumn("Id").AsInt32().PrimaryKey().Identity()
            .WithColumn("Email").AsString(100)
            .WithColumn("Password").AsString(100)
            .WithColumn("FirstName").AsString(50).Nullable()
            .WithColumn("LastName").AsString(50).Nullable()
            .WithColumn("WeeklyWorkingTime").AsInt32().Nullable()
            .WithColumn("RemainingVacationDays").AsInt32().Nullable()
            .WithColumn("PrivilegesValue").AsInt32().Nullable();
        
       //Records table begin
        Create.Table("Records")
            .WithColumn("Id").AsInt32().Identity()
            .WithColumn("WorkingTime").AsInt32()
            .WithColumn("Comment").AsString(255).Nullable()
            .WithColumn("EmployeeId").AsInt32()
            .WithColumn("EditorId").AsInt32()
            .WithColumn("IsAutomaticallyCreated").AsBoolean()
            .WithColumn("CreatedAt").AsDateTime();
        
        Create.ForeignKey("FK_Records_UserId")
            .FromTable("Records").ForeignColumn("EmployeeId")
            .ToTable("Users").PrimaryColumn("Id");
        
        Create.ForeignKey("FK_Records_EditorId")
            .FromTable("Records").ForeignColumn("EditorId")
            .ToTable("Users").PrimaryColumn("Id");
        //Records table end 
        
        //Vacations table begin
        Create.Table("Vacation")
            .WithColumn("Id").AsInt32().PrimaryKey().Identity()
            .WithColumn("UserId").AsInt32()
            .WithColumn("StartingTime").AsDate()
            .WithColumn("EndingTime").AsDate()
            .WithColumn("Comment").AsString(255).Nullable()
            .WithColumn("IsAccepted").AsBoolean().Nullable();

        Create.ForeignKey("FK_Vacation_UserId")
            .FromTable("Vacation").ForeignColumn("UserId")
            .ToTable("Users").PrimaryColumn("Id");
        //Vacation Table end
        
        //AuthenticationTokens Table begin
        Create.Table("AuthenticationTokens")
            .WithColumn("Id").AsInt32().PrimaryKey().Identity()
            .WithColumn("UserId").AsInt32()
            .WithColumn("Token").AsCustom("text");
        
        Create.ForeignKey("FK_AuthToken_UserId")
            .FromTable("AuthenticationTokens").ForeignColumn("UserId")
            .ToTable("Users").PrimaryColumn("Id");
        //AuthenticationToken end

    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}