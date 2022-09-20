using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;
[Migration((123141))]
public class AddActivationToUser:Migration
{
    public override void Up()
    {
        Create.Column("Activation")
            .OnTable("Users")
            .AsBoolean().Nullable();
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}