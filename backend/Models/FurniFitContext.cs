using Microsoft.EntityFrameworkCore;

namespace FurniFit.Models;

public class FurniFitContext : DbContext
{
    public FurniFitContext(DbContextOptions<FurniFitContext> options)
        : base(options)
    {
    }

    public DbSet<Furniture> Furniture { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed data
        modelBuilder.Entity<Furniture>().HasData(
            new Furniture
            {
                Id = 1,
                Name = "Modern Sofa",
                Type = "Sofa",
                ModelUrl = "https://storage.googleapis.com/furniture-models/modern-sofa.glb"
            },
            new Furniture
            {
                Id = 2,
                Name = "Dining Chair",
                Type = "Chair",
                ModelUrl = "https://storage.googleapis.com/furniture-models/dining-chair.glb"
            },
            new Furniture
            {
                Id = 3,
                Name = "Coffee Table",
                Type = "Table",
                ModelUrl = "https://storage.googleapis.com/furniture-models/coffee-table.glb"
            }
        );
    }
}
