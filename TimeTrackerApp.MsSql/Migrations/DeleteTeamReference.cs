using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(63829029)]
public class DeleteTeamReference:Migration
{
    public override void Up()
    {
        Delete.ForeignKey("FK_User_TeamId").OnTable("Users");
        Delete.Column("TeamId").FromTable("Users");
        
        Delete.PrimaryKey("FK_Team").FromTable("TeamReference");
        Delete.Column("Id").FromTable("TeamReference");
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}