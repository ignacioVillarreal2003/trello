﻿// <auto-generated />
using System;
using API.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240805180610_V1.0")]
    partial class V10
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("API.Models.Board", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("BoardTitle")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("TeamName")
                        .IsRequired()
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Theme")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("TeamName");

                    b.ToTable("Boards");
                });

            modelBuilder.Entity("API.Models.Card", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("CardTitle")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<DateTime>("End")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("ListId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("Start")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("ListId");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("API.Models.CardLabel", b =>
                {
                    b.Property<long>("CardId")
                        .HasColumnType("bigint");

                    b.Property<string>("LabelTitle")
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Color")
                        .HasColumnType("character varying(50)");

                    b.HasKey("CardId", "LabelTitle", "Color");

                    b.HasIndex("LabelTitle", "Color");

                    b.ToTable("CardLabels");
                });

            modelBuilder.Entity("API.Models.CardUser", b =>
                {
                    b.Property<long>("CardId")
                        .HasColumnType("bigint");

                    b.Property<string>("UserEmail")
                        .HasColumnType("text");

                    b.HasKey("CardId", "UserEmail");

                    b.HasIndex("UserEmail");

                    b.ToTable("CardUsers");
                });

            modelBuilder.Entity("API.Models.Comment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("CardId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CommentDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CommentDescription")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.HasKey("Id");

                    b.HasIndex("CardId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("API.Models.Label", b =>
                {
                    b.Property<string>("LabelTitle")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Color")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("LabelTitle", "Color");

                    b.ToTable("Labels");
                });

            modelBuilder.Entity("API.Models.List", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("BoardId")
                        .HasColumnType("bigint");

                    b.Property<string>("ListTitle")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.HasIndex("BoardId");

                    b.ToTable("Lists");
                });

            modelBuilder.Entity("API.Models.Team", b =>
                {
                    b.Property<string>("TeamName")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Theme")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("TeamName");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("API.Models.User", b =>
                {
                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Email");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Models.UserTeam", b =>
                {
                    b.Property<string>("UserEmail")
                        .HasColumnType("text");

                    b.Property<string>("TeamName")
                        .HasColumnType("character varying(50)");

                    b.HasKey("UserEmail", "TeamName");

                    b.HasIndex("TeamName");

                    b.ToTable("UserTeams");
                });

            modelBuilder.Entity("API.Models.Board", b =>
                {
                    b.HasOne("API.Models.Team", "Team")
                        .WithMany("Boards")
                        .HasForeignKey("TeamName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Team");
                });

            modelBuilder.Entity("API.Models.Card", b =>
                {
                    b.HasOne("API.Models.List", "List")
                        .WithMany("Cards")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("List");
                });

            modelBuilder.Entity("API.Models.CardLabel", b =>
                {
                    b.HasOne("API.Models.Card", "Card")
                        .WithMany("CardLabels")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.Label", "Label")
                        .WithMany("CardLabels")
                        .HasForeignKey("LabelTitle", "Color")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Card");

                    b.Navigation("Label");
                });

            modelBuilder.Entity("API.Models.CardUser", b =>
                {
                    b.HasOne("API.Models.Card", "Card")
                        .WithMany("CardUsers")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.User", "User")
                        .WithMany("CardUsers")
                        .HasForeignKey("UserEmail")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Card");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.Comment", b =>
                {
                    b.HasOne("API.Models.Card", "Card")
                        .WithMany("Comments")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Card");
                });

            modelBuilder.Entity("API.Models.List", b =>
                {
                    b.HasOne("API.Models.Board", "Board")
                        .WithMany("Lists")
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Board");
                });

            modelBuilder.Entity("API.Models.UserTeam", b =>
                {
                    b.HasOne("API.Models.Team", "Team")
                        .WithMany("UserTeams")
                        .HasForeignKey("TeamName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.User", "User")
                        .WithMany("UserTeams")
                        .HasForeignKey("UserEmail")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Team");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.Board", b =>
                {
                    b.Navigation("Lists");
                });

            modelBuilder.Entity("API.Models.Card", b =>
                {
                    b.Navigation("CardLabels");

                    b.Navigation("CardUsers");

                    b.Navigation("Comments");
                });

            modelBuilder.Entity("API.Models.Label", b =>
                {
                    b.Navigation("CardLabels");
                });

            modelBuilder.Entity("API.Models.List", b =>
                {
                    b.Navigation("Cards");
                });

            modelBuilder.Entity("API.Models.Team", b =>
                {
                    b.Navigation("Boards");

                    b.Navigation("UserTeams");
                });

            modelBuilder.Entity("API.Models.User", b =>
                {
                    b.Navigation("CardUsers");

                    b.Navigation("UserTeams");
                });
#pragma warning restore 612, 618
        }
    }
}
