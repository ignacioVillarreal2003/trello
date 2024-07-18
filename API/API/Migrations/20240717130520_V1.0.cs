using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class V10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardUsers_Users_UserMail",
                table: "CardUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_TargetLabels_Cards_CardId",
                table: "TargetLabels");

            migrationBuilder.DropForeignKey(
                name: "FK_TargetLabels_Labels_LabelTitle_Color",
                table: "TargetLabels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TargetLabels",
                table: "TargetLabels");

            migrationBuilder.RenameTable(
                name: "TargetLabels",
                newName: "CardLabels");

            migrationBuilder.RenameColumn(
                name: "UserMail",
                table: "CardUsers",
                newName: "UserEmail");

            migrationBuilder.RenameIndex(
                name: "IX_CardUsers_UserMail",
                table: "CardUsers",
                newName: "IX_CardUsers_UserEmail");

            migrationBuilder.RenameIndex(
                name: "IX_TargetLabels_LabelTitle_Color",
                table: "CardLabels",
                newName: "IX_CardLabels_LabelTitle_Color");

            migrationBuilder.AddColumn<string>(
                name: "OwnerEmail",
                table: "Teams",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TeamPassword",
                table: "Teams",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CardLabels",
                table: "CardLabels",
                columns: new[] { "CardId", "LabelTitle", "Color" });

            migrationBuilder.CreateIndex(
                name: "IX_Teams_OwnerEmail",
                table: "Teams",
                column: "OwnerEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_CardLabels_Cards_CardId",
                table: "CardLabels",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CardLabels_Labels_LabelTitle_Color",
                table: "CardLabels",
                columns: new[] { "LabelTitle", "Color" },
                principalTable: "Labels",
                principalColumns: new[] { "LabelTitle", "Color" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CardUsers_Users_UserEmail",
                table: "CardUsers",
                column: "UserEmail",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Users_OwnerEmail",
                table: "Teams",
                column: "OwnerEmail",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardLabels_Cards_CardId",
                table: "CardLabels");

            migrationBuilder.DropForeignKey(
                name: "FK_CardLabels_Labels_LabelTitle_Color",
                table: "CardLabels");

            migrationBuilder.DropForeignKey(
                name: "FK_CardUsers_Users_UserEmail",
                table: "CardUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Users_OwnerEmail",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_OwnerEmail",
                table: "Teams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CardLabels",
                table: "CardLabels");

            migrationBuilder.DropColumn(
                name: "OwnerEmail",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TeamPassword",
                table: "Teams");

            migrationBuilder.RenameTable(
                name: "CardLabels",
                newName: "TargetLabels");

            migrationBuilder.RenameColumn(
                name: "UserEmail",
                table: "CardUsers",
                newName: "UserMail");

            migrationBuilder.RenameIndex(
                name: "IX_CardUsers_UserEmail",
                table: "CardUsers",
                newName: "IX_CardUsers_UserMail");

            migrationBuilder.RenameIndex(
                name: "IX_CardLabels_LabelTitle_Color",
                table: "TargetLabels",
                newName: "IX_TargetLabels_LabelTitle_Color");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TargetLabels",
                table: "TargetLabels",
                columns: new[] { "CardId", "LabelTitle", "Color" });

            migrationBuilder.AddForeignKey(
                name: "FK_CardUsers_Users_UserMail",
                table: "CardUsers",
                column: "UserMail",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TargetLabels_Cards_CardId",
                table: "TargetLabels",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TargetLabels_Labels_LabelTitle_Color",
                table: "TargetLabels",
                columns: new[] { "LabelTitle", "Color" },
                principalTable: "Labels",
                principalColumns: new[] { "LabelTitle", "Color" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
