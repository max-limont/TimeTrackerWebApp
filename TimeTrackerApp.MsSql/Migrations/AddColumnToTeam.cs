using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(08192022)]
public class AddColumnToTeam:Migration
{
    public override void Up()
    {
        // Delete.ForeignKey("FK_Users_VacationPermissionId").OnTable("Users");
        
        // Delete.Column("VacationPermissionId").FromTable("Users");
        
        // Delete.Table("VacationLevel");

        // Create.Column("NameTeam").OnTable("Team").AsString(50);
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}