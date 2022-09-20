using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(6462428)]
public class VacationResponse:Migration
{
    public override void Up()
    {
        Create.Table("VacationManager")
            .WithColumn("Id").AsInt32().PrimaryKey().Identity()
            .WithColumn("UserId").AsInt32();

        Create.ForeignKey("FK_VacationManager_UserId").FromTable("VacationManager")
            .ForeignColumn("UserId")
            .ToTable("Users").PrimaryColumn("Id");

        Create.Table("VacationResponse")
            .WithColumn("Id").AsInt32().PrimaryKey().Identity()
            .WithColumn("VacationId").AsInt32()
            .WithColumn("Comment").AsString(50);

        Create.ForeignKey("FK_VacationResponse_VacationId")
            .FromTable("VacationResponse").ForeignColumn("VacationId")
            .ToTable("Vacation").PrimaryColumn("Id");

    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}