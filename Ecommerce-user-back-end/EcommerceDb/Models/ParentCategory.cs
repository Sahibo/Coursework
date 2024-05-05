namespace EcommerceDb.Models
{
    public enum Gender
    {
        Man = 1,
        Woman = 2,
        Unisex = 3
    }

    public class ParentCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Gender Gender { get; set; }
        public bool IsDeleted { get; set; }

		public ICollection<Category>? Categories { get; set; }
    }
}