using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UpesiMoney.Core.Entities
{
    public class Transaction
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string TransactionType { get; set; } = string.Empty;

        public int? TransferAccountNo { get; set; }

        public double Amount { get; set; }

        public double Charge { get; set; }

        public double AccountBalance { get; set; }

        public Customer? Customer { get; set; }

        public Atm? Atm { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
