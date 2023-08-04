using AutoMapper;
using System.Net.Http.Headers;
using UpesiMoney.Core.DTOs;
using UpesiMoney.Core.Entities;
using UpesiMoney.Core.Exceptions;
using UpesiMoney.Core.Interfaces;
using UpesiMoney.Core.Utils;
using UpesiMoney.Infrastructure.Persistence.Contexts;


namespace UpesiMoney.Infrastructure.Persistence.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly UpesiMoneyContext _upesiMoneyContext;
        private readonly IMapper _mapper;

        public TransactionRepository(UpesiMoneyContext _upesiMoneyContext, IMapper _mapper)
        {
            this._upesiMoneyContext = _upesiMoneyContext;
            this._mapper = _mapper;
        }

        public TransactionResponse CreateTransaction(Guid atmId, Guid customerId, CreateTransactionRequest request)
        {
            var customer = this._upesiMoneyContext.Customers.Find(customerId);
            var atm = this._upesiMoneyContext.Atms.Find(atmId);

            var transaction = this._mapper.Map<Transaction>(request);
            transaction.TransactionType = request.TransactionType;
            transaction.TransferAccountNo = request.TransferAccountNo;
            transaction.Amount = request.Amount;
            transaction.Charge = request.Charge;
            transaction.AccountBalance = request.AccountBalance;
            transaction.Atm = atm;
            transaction.Customer = customer;
            transaction.CreatedAt = DateUtil.GetCurrentDate();

            this._upesiMoneyContext.Transactions.Add(transaction);
            this._upesiMoneyContext.SaveChanges();

            return this._mapper.Map<TransactionResponse>(transaction);

        }

        public void DeleteTransactionById(Guid transactionId)
        {
            var transaction = this._upesiMoneyContext.Transactions.Find(transactionId);
            if (transaction != null)
            {
                this._upesiMoneyContext.Transactions.Remove(transaction);
                this._upesiMoneyContext.SaveChanges();
            }
            else
            {
                throw new NotFoundException();
            }
        }

        public TransactionResponse GetTransactionById(Guid transactionId)
        {
            var transaction = this._upesiMoneyContext.Transactions.Find(transactionId);
            if (transaction != null)
            {
                return this._mapper.Map<TransactionResponse>(transaction);
            }

            throw new NotFoundException();
        }

        public List<TransactionResponse> GetTransactions()
        {
            return this._upesiMoneyContext.Transactions.Select(t => this._mapper.Map<TransactionResponse>(t)).ToList();

        }

        public List<TransactionResponse> GetTransactionsByCustomer(Guid customerId)
        {
            var transactions = this._upesiMoneyContext.Transactions.Where(p => p.Customer.CustomerId == customerId).ToList();
            return transactions.Select(p => this._mapper.Map<TransactionResponse>(p)).ToList();
        }

        public List<TransactionResponse> GetTransactionsByAtm(Guid transactionId)
        {
            var transactions = this._upesiMoneyContext.Transactions.Where(p => p.Atm.Id == transactionId).ToList();
            return transactions.Select(p => this._mapper.Map<TransactionResponse>(p)).ToList();
        }

        public TransactionResponse GetLatestTransactionByCustomer(Guid customerId)
        {
            var transaction = this._upesiMoneyContext.Transactions
                .Where(t => t.Customer.CustomerId == customerId)
                .OrderByDescending(t => t.CreatedAt)
                .FirstOrDefault();

            if (transaction == null)
            {
                // handle the case when no transaction is found for the given customer
                throw new Exception("No transaction found for the given customer.");
            }

            return this._mapper.Map<TransactionResponse>(transaction);
        }
    }
}
