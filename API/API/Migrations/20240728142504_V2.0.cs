using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class V20 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Boards_Teams_TeamId",
                table: "Boards");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTeams_Teams_TeamId",
                table: "UserTeams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTeams",
                table: "UserTeams");

            migrationBuilder.DropIndex(
                name: "IX_UserTeams_TeamId",
                table: "UserTeams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teams",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Boards_TeamId",
                table: "Boards");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "UserTeams");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Boards");

            migrationBuilder.AddColumn<string>(
                name: "TeamName",
                table: "UserTeams",
                type: "character varying(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TeamName",
                table: "Boards",
                type: "character varying(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTeams",
                table: "UserTeams",
                columns: new[] { "UserEmail", "TeamName" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teams",
                table: "Teams",
                column: "TeamName");

            migrationBuilder.CreateIndex(
                name: "IX_UserTeams_TeamName",
                table: "UserTeams",
                column: "TeamName");

            migrationBuilder.CreateIndex(
                name: "IX_Boards_TeamName",
                table: "Boards",
                column: "TeamName");

            migrationBuilder.AddForeignKey(
                name: "FK_Boards_Teams_TeamName",
                table: "Boards",
                column: "TeamName",
                principalTable: "Teams",
                principalColumn: "TeamName",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTeams_Teams_TeamName",
                table: "UserTeams",
                column: "TeamName",
                principalTable: "Teams",
                principalColumn: "TeamName",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Boards_Teams_TeamName",
                table: "Boards");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTeams_Teams_TeamName",
                table: "UserTeams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTeams",
                table: "UserTeams");

            migrationBuilder.DropIndex(
                name: "IX_UserTeams_TeamName",
                table: "UserTeams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teams",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Boards_TeamName",
                table: "Boards");

            migrationBuilder.DropColumn(
                name: "TeamName",
                table: "UserTeams");

            migrationBuilder.DropColumn(
                name: "TeamName",
                table: "Boards");

            migrationBuilder.AddColumn<long>(
                name: "TeamId",
                table: "UserTeams",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "Teams",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<long>(
                name: "TeamId",
                table: "Boards",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTeams",
                table: "UserTeams",
                columns: new[] { "UserEmail", "TeamId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teams",
                table: "Teams",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserTeams_TeamId",
                table: "UserTeams",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Boards_TeamId",
                table: "Boards",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Boards_Teams_TeamId",
                table: "Boards",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTeams_Teams_TeamId",
                table: "UserTeams",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
