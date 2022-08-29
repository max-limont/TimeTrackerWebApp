using FluentMigrator;

namespace TimeTrackerApp.MsSql.Migrations;

[Migration(12344351123)]
public class EditTableTeam:Migration
{
    public override void Up()
    {

        Delete.Column("NameTeam").FromTable("Team");

        Create.Column("TeamId").OnTable("Team").AsInt32().Nullable();
        
        Rename.Table("Team").To("TeamReference");

        Create.Table("TeamTable")
            .WithColumn("Id").AsInt32().PrimaryKey().Identity()
            .WithColumn("NameTeam").AsString(50);

        Create.ForeignKey("Fk_TeamReference_TeamId")
            .FromTable("TeamReference").ForeignColumn("TeamId")
            .ToTable("TeamTable").PrimaryColumn("Id");

    }

    public override void Down()
    {
        throw new NotImplementedException();
    }
}