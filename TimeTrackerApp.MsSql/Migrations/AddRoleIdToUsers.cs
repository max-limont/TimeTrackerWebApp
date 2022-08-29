using System.Runtime.InteropServices;
using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(20082022)]
public class AddRoleIdToUsers:Migration
{
    public override void Up()
    {
        Create.Column("RoleId").OnTable("Users").AsInt32().Nullable();

        Create.ForeignKey("FK_Users_RoleId").FromTable("Users")
            .ForeignColumn("RoleId")
            .ToTable("Role").PrimaryColumn("Id");

    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}