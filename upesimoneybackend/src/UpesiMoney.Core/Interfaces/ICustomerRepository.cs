using UpesiMoney.Core.DTOs;

namespace UpesiMoney.Core.Interfaces
{
    public interface ICustomerRepository
    {
        List<CustomerResponse> GetCustomers();

        CustomerResponse GetCustomerById(Guid customerId);

        CustomerResponse GetCustomerByEmail(string email);

        void DeleteCustomerById(Guid customerId);

        CustomerResponse CreateCustomer(CreateCustomerRequest request);

        CustomerResponse UpdateCustomer(Guid customerId, UpdateCustomerRequest request);
    }
}
