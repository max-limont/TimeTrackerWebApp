using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(3124123)]
public class ChangeConceptDB:Migration
{
    public override void Up()
    {
        Delete.Table("TeamReference");
        
        Create.Column("TeamId").OnTable("Users")
            .AsInt32().Nullable();

        Create.ForeignKey("FK_Users_TeamId").FromTable("Users")
            .ForeignColumn("TeamId")
            .ToTable("TeamTable").PrimaryColumn("Id");   
    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}