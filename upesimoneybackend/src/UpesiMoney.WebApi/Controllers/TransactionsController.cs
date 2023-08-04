using Microsoft.AspNetCore.Mvc;
using UpesiMoney.Core.DTOs;
using UpesiMoney.Core.Exceptions;
using UpesiMoney.Core.Interfaces;

namespace UpesiMoney.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : Controller
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly ICustomerRepository _customerRepository;

        public TransactionsController(ITransactionRepository _transactionRepository, ICustomerRepository _customerRepository)
        {
            this._transactionRepository = _transactionRepository;
            this._customerRepository = _customerRepository;
        }

        [HttpGet("")]
        public ActionResult GetTransactions([FromQuery] Guid transactionId, [FromQuery] Guid atmId, [FromQuery] Guid customerId)
        {
            if (transactionId != new Guid() && atmId == new Guid() && customerId == new Guid())
            {
                try
                {
                    var transaction = this._transactionRepository.GetTransactionById(transactionId);
                    return Ok(transaction);
                }
                catch (NotFoundException)
                {
                    return NotFound();
                }
            }
            else if (transactionId == new Guid() && atmId != new Guid() && customerId == new Guid())
            {
                try
                {
                    var transactions = this._transactionRepository.GetTransactionsByAtm(atmId);
                    return Ok(transactions);
                }
                catch (NotFoundException)
                {
                    return NotFound();
                }
            }
            else if (transactionId == new Guid() && atmId == new Guid() && customerId != new Guid())
            {
                try
                {
                    var transactions = this._transactionRepository.GetTransactionsByCustomer(customerId);
                    return Ok(transactions);
                }
                catch (NotFoundException)
                {
                    return NotFound();
                }
            }
            else
            {
                return Ok(this._transactionRepository.GetTransactions());
            }
        }

        [HttpGet("latest")]
        public ActionResult GetLatestTransaction([FromQuery] Guid customerId)
        {
            try
            {
                var customer = this._customerRepository.GetCustomerById(customerId);
                return Ok(this._transactionRepository.GetLatestTransactionByCustomer(customerId));
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult Create([FromQuery] Guid atmId, [FromQuery] Guid customerId, CreateTransactionRequest request)
        {
            try
            {
                var customer = this._customerRepository.GetCustomerById(customerId);
                var transaction = this._transactionRepository.CreateTransaction(atmId, customerId, request);
                return Ok(transaction);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{transactionId}")]
        public ActionResult Delete(Guid transactionId)
        {
            try
            {
                this._transactionRepository.DeleteTransactionById(transactionId);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }
    }
}
