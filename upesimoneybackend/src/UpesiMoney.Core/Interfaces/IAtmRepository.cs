using UpesiMoney.Core.DTOs;

namespace UpesiMoney.Core.Interfaces
{
    public interface IAtmRepository
    {
        List<AtmResponse> GetAtms();

        AtmResponse GetAtmById(Guid id);

        void DeleteAtmById(Guid id);

        AtmResponse CreateAtm(CreateAtmRequest request);

        AtmResponse UpdateAtm(Guid id, UpdateAtmRequest request);
    }
}
