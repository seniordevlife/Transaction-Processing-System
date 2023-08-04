using UpesiMoney.Core.DTOs;

namespace UpesiMoney.Core.Interfaces
{
    public interface ITransactionRepository
    {
        List<TransactionResponse> GetTransactions();

        List<TransactionResponse> GetTransactionsByAtm(Guid atmId);

        List<TransactionResponse> GetTransactionsByCustomer(Guid customerId);

        TransactionResponse GetTransactionById(Guid transactionId);

        TransactionResponse GetLatestTransactionByCustomer(Guid transactionId);

        void DeleteTransactionById(Guid transactionId);

        TransactionResponse CreateTransaction(Guid atmId, Guid customerId, CreateTransactionRequest request);
    }
}
