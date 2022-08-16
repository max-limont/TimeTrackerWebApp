using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(16082022)]
public class ChangeCalendarTimeTracker:Migration
{
    public override void Up()
    {
        Create.Column("IsFullTimeEmployee").OnTable("Users")
            .AsBinary().WithDefaultValue(1);
        
        Rename.Column("TypeDayId").OnTable("Users").To("DayTypeId");
        
        Delete.Column("Comment")
            .FromTable("Records");
        
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}