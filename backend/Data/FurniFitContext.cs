using Microsoft.EntityFrameworkCore;
using FurniFit.Models;

namespace FurniFit.Data
{
    public class FurniFitContext : DbContext
    {
        public FurniFitContext(DbContextOptions<FurniFitContext> options)
            : base(options)
        {
        }

        public DbSet<Furniture> Furniture { get; set; }
        public DbSet<RoomPhoto> RoomPhotos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Furniture>()
                .Property(f => f.Name)
                .IsRequired();

            modelBuilder.Entity<Furniture>()
                .Property(f => f.Description)
                .IsRequired();

            modelBuilder.Entity<RoomPhoto>()
                .Property(r => r.ImageUrl)
                .IsRequired();
        }
    }
}
