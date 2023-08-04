using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;

namespace UpesiMoney.Core.Entities
{
    public class Atm
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string? Location {get; set;}

        public double Balance { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
