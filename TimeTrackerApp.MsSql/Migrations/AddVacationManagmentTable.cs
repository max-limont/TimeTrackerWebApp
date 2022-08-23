using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(12343241324)]
public class AddVacationManagmentTable:Migration
{
    public override void Up()
    {
        Create.Table("VacationManagment")
            .WithColumn("Id").AsInt32().PrimaryKey().Identity()
            .WithColumn("UserId").AsInt32()
            .WithColumn("ManagerId").AsInt32();

        Create.ForeignKey("FK_VacationManagment_UserId_Id").FromTable("VacationManagment")
            .ForeignColumn("UserId")
            .ToTable("Users").PrimaryColumn("Id");
        
        Create.ForeignKey("FK_VacationManagment_Manager_Id").FromTable("VacationManagment")
            .ForeignColumn("ManagerId")
            .ToTable("Users").PrimaryColumn("Id");
        
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}