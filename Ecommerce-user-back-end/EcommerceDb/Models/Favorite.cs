using System.Text.Json.Serialization;

namespace EcommerceDb.Models
{
	public class Favorite
    {
        public int Id { get; set; }
        
        public string UserId { get; set; }
        [JsonIgnore]
        public AspNetUser User { get; set; }
        
        public int ProductId { get; set; }
        public int ProductVariationId { get; set; }
        public int SubProductVariationId { get; set; }


        // product id product var id adding
        public SubProductVariation SubProductVariation  { get; set; }
    }
}