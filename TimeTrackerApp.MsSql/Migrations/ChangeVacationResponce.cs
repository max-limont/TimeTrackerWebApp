using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(2999429042)]
public class ChangeVacationResponse:Migration
{
    public override void Up()
    {
        Create.Column("UserId").OnTable("VacationResponse").AsInt32().Nullable();
        
        Create.ForeignKey("FK_VacationResponse_UserId").FromTable("VacationResponse")
            .ForeignColumn("UserId").ToTable("Users").PrimaryColumn("Id");
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}