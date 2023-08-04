using Microsoft.AspNetCore.Mvc;
using UpesiMoney.Core.DTOs;
using UpesiMoney.Core.Exceptions;
using UpesiMoney.Core.Interfaces;

namespace UpesiMoney.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : Controller
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomersController(ICustomerRepository _customerRepository)
        {
            this._customerRepository = _customerRepository;
        }

        [HttpGet("")]
        public ActionResult GetCustomers([FromQuery] Guid customerId, [FromQuery] string? email)
        {
            if (customerId != new Guid() && email == null)
            {
                try
                {
                    var customer = this._customerRepository.GetCustomerById(customerId);
                    return Ok(customer);
                }
                catch (NotFoundException)
                {
                    return NotFound();
                }
            }
            else if (customerId == new Guid() && email != null)
            {
                try
                {
                    var customer = this._customerRepository.GetCustomerByEmail(email);
                    return Ok(customer);
                }
                catch (NotFoundException)
                {
                    return NotFound();
                }
            }
            else
            {
                return Ok(this._customerRepository.GetCustomers());
            }  
        }

        [HttpPost]
        public ActionResult Create(CreateCustomerRequest request)
        {
            var customer = this._customerRepository.CreateCustomer(request);
            return Ok(customer);
        }

        [HttpPut("")]
        public ActionResult Update([FromQuery] Guid customerId, UpdateCustomerRequest request) 
        {
            try
            {
                var customer = this._customerRepository.UpdateCustomer(customerId, request);
                return Ok(customer);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{customerId}")]
        public ActionResult Delete(Guid customerId)
        {
            try
            {
                this._customerRepository.DeleteCustomerById(customerId);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }
    }
}
