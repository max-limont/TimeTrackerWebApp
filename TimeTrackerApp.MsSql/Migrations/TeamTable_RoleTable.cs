using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(19082022)]
public class TeamTable_RoleTable:Migration
{
    public override void Up()
    {
        // Delete.Column("IsFullTimeEmployee")
        //     .FromTable("Users");
       
        // Create.Column("IsFullTimeEmployee")
        // .OnTable("Users").AsBinary();
        
        Create.Table("Team")
            .WithColumn("Id").AsInt32().Identity().PrimaryKey()
            .WithColumn("UserId").AsInt32()
            .WithColumn("RoleId").AsInt32().Nullable();

        Create.Table("Role")
            .WithColumn("Id").AsInt32().Identity().PrimaryKey()
            .WithColumn("Title").AsString(50)
            .WithColumn("Value").AsInt32();

        Create.Column("TeamId")
            .OnTable("Users").AsInt32().Nullable();

        Create.ForeignKey("FK_User_TeamId")
            .FromTable("Users").ForeignColumn("TeamId")
            .ToTable("Team").PrimaryColumn("Id");

        Create.ForeignKey("FK_Team_UserId")
            .FromTable("Team").ForeignColumn("UserId")
            .ToTable("Users").PrimaryColumn("Id");

        Create.ForeignKey("FK_Team_RoleId")
            .FromTable("Team").ForeignColumn("RoleId")
            .ToTable("Role").PrimaryColumn("Id");
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}