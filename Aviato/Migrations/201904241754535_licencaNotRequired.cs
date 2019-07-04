namespace Aviato.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class licencaNotRequired : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Tip", "NazivTipa", c => c.String(maxLength: 20));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tip", "NazivTipa", c => c.String(nullable: false, maxLength: 20));
        }
    }
}