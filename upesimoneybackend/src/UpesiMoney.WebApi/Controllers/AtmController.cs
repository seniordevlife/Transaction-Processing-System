using Microsoft.AspNetCore.Mvc;
using UpesiMoney.Core.DTOs;
using UpesiMoney.Core.Exceptions;
using UpesiMoney.Core.Interfaces;

namespace UpesiMoney.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtmsController : Controller
    {
        private readonly IAtmRepository _atmRepository;

        public AtmsController(IAtmRepository _atmRepository)
        {
            this._atmRepository = _atmRepository;
        }

        [HttpGet("")]
        public ActionResult GetAtms([FromQuery] Guid atmId)
        {
            if (atmId != new Guid())
            {
                try
                {
                    var atm = this._atmRepository.GetAtmById(atmId);
                    return Ok(atm);
                }
                catch (NotFoundException)
                {
                    return NotFound();
                }
            }
            else
            {
                return Ok(this._atmRepository.GetAtms());
            }
        }

        [HttpPost]
        public ActionResult Create(CreateAtmRequest request)
        {
            var atm = this._atmRepository.CreateAtm(request);
            return Ok(atm);
        }

        [HttpPut("")]
        public ActionResult Update([FromQuery] Guid atmId, UpdateAtmRequest request)
        {
            try
            {
                var atm = this._atmRepository.UpdateAtm(atmId, request);
                return Ok(atm);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{atmId}")]
        public ActionResult Delete(Guid atmId)
        {
            try
            {
                this._atmRepository.DeleteAtmById(atmId);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }
    }
}
