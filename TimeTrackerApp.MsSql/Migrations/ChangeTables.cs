using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(190123124903)]
public class ChangeTables:Migration
{
    public override void Up()
    {
        // Delete.ForeignKey("FK_Team_RoleId").OnTable("TeamReference");
        //
        // Delete.Column("RoleId").Column("TeamReference");
        
        
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}