﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Labels",
                columns: table => new
                {
                    LabelTitle = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Color = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Labels", x => new { x.LabelTitle, x.Color });
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    TeamName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Theme = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.TeamName);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Email = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Email);
                });

            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BoardTitle = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Theme = table.Column<string>(type: "text", nullable: false),
                    TeamName = table.Column<string>(type: "character varying(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Boards_Teams_TeamName",
                        column: x => x.TeamName,
                        principalTable: "Teams",
                        principalColumn: "TeamName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTeams",
                columns: table => new
                {
                    UserEmail = table.Column<string>(type: "text", nullable: false),
                    TeamName = table.Column<string>(type: "character varying(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTeams", x => new { x.UserEmail, x.TeamName });
                    table.ForeignKey(
                        name: "FK_UserTeams_Teams_TeamName",
                        column: x => x.TeamName,
                        principalTable: "Teams",
                        principalColumn: "TeamName",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTeams_Users_UserEmail",
                        column: x => x.UserEmail,
                        principalTable: "Users",
                        principalColumn: "Email",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lists",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ListTitle = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    BoardId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lists_Boards_BoardId",
                        column: x => x.BoardId,
                        principalTable: "Boards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CardTitle = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ListId = table.Column<long>(type: "bigint", nullable: false),
                    Start = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cards_Lists_ListId",
                        column: x => x.ListId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CardLabels",
                columns: table => new
                {
                    CardId = table.Column<long>(type: "bigint", nullable: false),
                    LabelTitle = table.Column<string>(type: "character varying(50)", nullable: false),
                    Color = table.Column<string>(type: "character varying(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardLabels", x => new { x.CardId, x.LabelTitle, x.Color });
                    table.ForeignKey(
                        name: "FK_CardLabels_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardLabels_Labels_LabelTitle_Color",
                        columns: x => new { x.LabelTitle, x.Color },
                        principalTable: "Labels",
                        principalColumns: new[] { "LabelTitle", "Color" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CardUsers",
                columns: table => new
                {
                    CardId = table.Column<long>(type: "bigint", nullable: false),
                    UserEmail = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardUsers", x => new { x.CardId, x.UserEmail });
                    table.ForeignKey(
                        name: "FK_CardUsers_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardUsers_Users_UserEmail",
                        column: x => x.UserEmail,
                        principalTable: "Users",
                        principalColumn: "Email",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CommentDescription = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    CardId = table.Column<long>(type: "bigint", nullable: false),
                    CommentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Boards_TeamName",
                table: "Boards",
                column: "TeamName");

            migrationBuilder.CreateIndex(
                name: "IX_CardLabels_LabelTitle_Color",
                table: "CardLabels",
                columns: new[] { "LabelTitle", "Color" });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_ListId",
                table: "Cards",
                column: "ListId");

            migrationBuilder.CreateIndex(
                name: "IX_CardUsers_UserEmail",
                table: "CardUsers",
                column: "UserEmail");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_CardId",
                table: "Comments",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_Lists_BoardId",
                table: "Lists",
                column: "BoardId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTeams_TeamName",
                table: "UserTeams",
                column: "TeamName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardLabels");

            migrationBuilder.DropTable(
                name: "CardUsers");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "UserTeams");

            migrationBuilder.DropTable(
                name: "Labels");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Lists");

            migrationBuilder.DropTable(
                name: "Boards");

            migrationBuilder.DropTable(
                name: "Teams");
        }
    }
}
