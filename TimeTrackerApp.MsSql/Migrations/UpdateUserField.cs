using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(2021062456001)]
public class UpdateUserField:Migration
{
    public override void Up()
    {
        Alter.Table("Users").AddColumn("VacationPermissionLevel").AsInt32().WithDefaultValue(1);
        
    }
    public override void Down()
    {
        throw new NotImplementedException();
    }
}