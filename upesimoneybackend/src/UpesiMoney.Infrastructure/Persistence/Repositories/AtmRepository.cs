using AutoMapper;
using UpesiMoney.Core.DTOs;
using UpesiMoney.Core.Entities;
using UpesiMoney.Core.Exceptions;
using UpesiMoney.Core.Interfaces;
using UpesiMoney.Core.Utils;
using UpesiMoney.Infrastructure.Persistence.Contexts;


namespace UpesiMoney.Infrastructure.Persistence.Repositories
{
    public class AtmRepository : IAtmRepository
    {
        private readonly UpesiMoneyContext _upesiMoneyContext;
        private readonly IMapper _mapper;

        public AtmRepository(UpesiMoneyContext _upesiMoneyContext, IMapper _mapper)
        {
            this._upesiMoneyContext = _upesiMoneyContext;
            this._mapper = _mapper;
        }

        public AtmResponse CreateAtm(CreateAtmRequest request)
        {
            var atm = this._mapper.Map<Atm>(request);
            atm.Balance = request.Balance;
            atm.Location = request.Location;
            atm.CreatedAt = atm.UpdatedAt = DateUtil.GetCurrentDate();

            this._upesiMoneyContext.Atms.Add(atm);
            this._upesiMoneyContext.SaveChanges();

            return this._mapper.Map<AtmResponse>(atm);
        }

        public void DeleteAtmById(Guid id)
        {
            var atm = this._upesiMoneyContext.Atms.Find(id);
            if (atm != null)
            {
                this._upesiMoneyContext.Atms.Remove(atm);
                this._upesiMoneyContext.SaveChanges();
            }
            else
            {
                throw new NotFoundException();
            }
        }

        public AtmResponse GetAtmById(Guid id)
        {
            var atm = this._upesiMoneyContext.Atms.Find(id);
            if (atm != null)
            {
                return this._mapper.Map<AtmResponse>(atm);
            }

            throw new NotFoundException();
        }

        public List<AtmResponse> GetAtms()
        {
            return this._upesiMoneyContext.Atms.Select(t => this._mapper.Map<AtmResponse>(t)).ToList();

        }

        public AtmResponse UpdateAtm(Guid id, UpdateAtmRequest request)
        {
            var atm = this._upesiMoneyContext.Atms.Find(id);
            if (atm != null)
            {
                atm.Location = request.Location;
                atm.Balance = request.Balance;
                atm.UpdatedAt = DateUtil.GetCurrentDate();

                this._upesiMoneyContext.Atms.Update(atm);
                this._upesiMoneyContext.SaveChanges();

                return this._mapper.Map<AtmResponse>(atm);
            }

            throw new NotFoundException();
        }
    }
}
