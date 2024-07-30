using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Board> Boards { get; set; }
    public DbSet<Card> Cards { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Label> Labels { get; set; }
    public DbSet<List> Lists { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<UserTeam> UserTeams { get; set; }
    public DbSet<CardUser> CardUsers { get; set; }
    public DbSet<CardLabel> CardLabels { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Label>()
            .HasKey(l => new { l.LabelTitle, l.Color });
        
        modelBuilder.Entity<CardLabel>()
            .HasKey(tl => new { tl.CardId, tl.LabelTitle, tl.Color });

        modelBuilder.Entity<CardLabel>()
            .HasOne(tl => tl.Card)
            .WithMany(c => c.CardLabels)
            .HasForeignKey(tl => tl.CardId);

        modelBuilder.Entity<CardLabel>()
            .HasOne(tl => tl.Label)
            .WithMany(l => l.CardLabels)
            .HasForeignKey(tl => new { tl.LabelTitle, tl.Color });
        
        modelBuilder.Entity<CardUser>()
            .HasKey(cu => new { cu.CardId, cu.UserEmail });

        modelBuilder.Entity<UserTeam>()
            .HasKey(ut => new { ut.UserEmail, ut.TeamName });
        
        base.OnModelCreating(modelBuilder);
    }
    
}