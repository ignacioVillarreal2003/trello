using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class V40 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Users_OwnerEmail",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_OwnerEmail",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "OwnerEmail",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TeamPassword",
                table: "Teams");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_Teams_OwnerEmail",
                table: "Teams",
                column: "OwnerEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Users_OwnerEmail",
                table: "Teams",
                column: "OwnerEmail",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
