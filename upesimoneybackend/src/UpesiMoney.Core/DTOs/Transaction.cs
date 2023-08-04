using System.ComponentModel.DataAnnotations;


namespace UpesiMoney.Core.DTOs
{
    public class CreateTransactionRequest
    {
        [Required]
        public string TransactionType { get; set; } = string.Empty;

        public int? TransferAccountNo { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public double Charge { get; set; }

        [Required]
        public double AccountBalance { get; set; }
    }

    public class TransactionResponse
    {
        public Guid Id { get; set; }
        public string TransactionType { get; set; } = string.Empty;
        public int? TransferAccountNo { get; set; }
        public double Amount { get; set; }
        public double Charge { get; set; }
        public double AccountBalance { get; set; }
    }
}
