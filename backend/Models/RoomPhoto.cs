using System;

namespace FurniFit.Models
{
    public class RoomPhoto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string GeneratedImageUrl { get; set; }
        public string FurnitureDescription { get; set; }
        public string SelectionArea { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
