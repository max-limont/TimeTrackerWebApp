using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;
 
[Migration(894239147823)]
public class DeleteVacationRequestTable:Migration
{
    public override void Up()
    {
        Delete.Table("VacationRequests");
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}