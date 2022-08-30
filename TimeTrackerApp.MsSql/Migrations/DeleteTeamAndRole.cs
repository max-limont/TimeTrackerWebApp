using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(43230393)]
public class DeleteTeamAndRole:Migration
{
    public override void Up()
    {
        Delete.ForeignKey("FK_Users_RoleId").OnTable("Users");
        Delete.ForeignKey("FK_Users_TeamId").OnTable("Users");

        Delete.Column("RoleId").Column("TeamId").FromTable("Users");

        Delete.Table("Role");
        Delete.Table("TeamTable");
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}