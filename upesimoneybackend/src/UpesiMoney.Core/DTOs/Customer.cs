using System.ComponentModel.DataAnnotations;

namespace UpesiMoney.Core.DTOs
{
    public class CreateCustomerRequest
    {
        [Required]
        public int AccountNumber { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

    }

    public class UpdateCustomerRequest : CreateCustomerRequest
    {

    }

    public class CustomerResponse
    {
        public Guid CustomerId { get; set; }
        public int AccountNumber { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}
