using System.ComponentModel.DataAnnotations;

namespace UpesiMoney.Core.DTOs
{
    public class CreateAtmRequest
    {
        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public double Balance { get; set; }
    }

    public class UpdateAtmRequest : CreateAtmRequest
    {

    }

    public class AtmResponse
    {
        public Guid Id { get; set; }
        public string Location { get; set; } = string.Empty;
        public double Balance { get; set; }
    }
}
