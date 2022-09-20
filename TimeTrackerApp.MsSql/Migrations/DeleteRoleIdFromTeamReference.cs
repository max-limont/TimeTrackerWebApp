using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(1234555)]
public class DeleteRoleIdFromTeamReference:Migration
{
    public override void Up()
    {
        // Delete.ForeignKey("FK_Team_RoleId").OnTable("TeamReference");
        // Delete.Column("RoleId").FromTable("TeamReference");
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}