using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(2021012380001)]
public class AddVacationLevel:Migration
{
    public override void Up()
    {
        Create.Table("VacationLevel")
            .WithColumn("Id").AsInt32().PrimaryKey().Identity()
            .WithColumn("NameLevel").AsString(50)
            .WithColumn("Value").AsInt32();
        
        
        
        
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}