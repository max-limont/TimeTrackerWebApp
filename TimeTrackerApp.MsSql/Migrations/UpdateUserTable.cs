using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;
[Migration(20210624236001)]
public class UpdateUserTable:Migration
{
    public override void Up()
    {
        Delete.Column("VacationPermissionLevel").FromTable("Users");
        
        Alter.Table("Users").AddColumn("VacationPermissionId").AsInt32().WithDefaultValue(1);
        
        Create.ForeignKey("FK_Users_VacationPermissionId")
            .FromTable("Users").ForeignColumn("VacationPermissionId")
            .ToTable("VacationLevel").PrimaryColumn("Id");
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}