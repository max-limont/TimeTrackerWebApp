using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;
[Migration(8423477)]
public class AddedTableBackgroundTask:Migration
{
    public override void Up()
    {
        Create.Table("BackgroundTasks")
            .WithColumn("Id").AsInt32().Identity().PrimaryKey()
            .WithColumn("Type").AsString(255).PrimaryKey()
            .WithColumn("DateTime").AsDateTime();
        
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}