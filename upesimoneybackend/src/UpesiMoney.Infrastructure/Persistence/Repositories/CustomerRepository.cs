using AutoMapper;
using UpesiMoney.Core.DTOs;
using UpesiMoney.Core.Entities;
using UpesiMoney.Core.Exceptions;
using UpesiMoney.Core.Interfaces;
using UpesiMoney.Core.Utils;
using UpesiMoney.Infrastructure.Persistence.Contexts;


namespace UpesiMoney.Infrastructure.Persistence.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly UpesiMoneyContext _upesiMoneyContext;
        private readonly IMapper _mapper;

        public CustomerRepository(UpesiMoneyContext _upesiMoneyContext, IMapper _mapper)
        {
            this._upesiMoneyContext = _upesiMoneyContext;
            this._mapper = _mapper;
        }

        public CustomerResponse CreateCustomer(CreateCustomerRequest request)
        {
            var customer = this._mapper.Map<Customer>(request);
            customer.FirstName = request.FirstName;
            customer.LastName = request.LastName;
            customer.AccountNumber = request.AccountNumber;
            customer.Email = request.Email;
            customer.Address = request.Address;
            customer.CreatedAt = customer.UpdatedAt = DateUtil.GetCurrentDate();

            this._upesiMoneyContext.Customers.Add(customer);
            this._upesiMoneyContext.SaveChanges();

            return this._mapper.Map<CustomerResponse>(customer);

        }

        public CustomerResponse UpdateCustomer(Guid customerId, UpdateCustomerRequest request)
        {
            var customer = this._upesiMoneyContext.Customers.Find(customerId);
            if (customer != null)
            {
                customer.AccountNumber = request.AccountNumber;
                customer.Email = request.Email;
                customer.FirstName = request.FirstName;
                customer.LastName = request.LastName;
                customer.Address = request.Address;
                customer.UpdatedAt = DateUtil.GetCurrentDate();

                this._upesiMoneyContext.Customers.Update(customer);
                this._upesiMoneyContext.SaveChanges();

                return this._mapper.Map<CustomerResponse>(customer);
            }

            throw new NotFoundException();
        }

        public void DeleteCustomerById(Guid customerId)
        {
            var customer = this._upesiMoneyContext.Customers.Find(customerId);
            if (customer != null)
            {
                this._upesiMoneyContext.Customers.Remove(customer);
                this._upesiMoneyContext.SaveChanges();
            }
            else
            {
                throw new NotFoundException();
            }
        }

        public CustomerResponse GetCustomerById(Guid customerId)
        {
            var customer = this._upesiMoneyContext.Customers.Find(customerId);
            if (customer != null)
            {
                return this._mapper.Map<CustomerResponse>(customer);
            }

            throw new NotFoundException();
        }

        public CustomerResponse GetCustomerByEmail(string email)
        {
            var customer = this._upesiMoneyContext.Customers.FirstOrDefault(c => c.Email == email);
            if (customer != null)
            {
                return this._mapper.Map<CustomerResponse>(customer);
            }
            throw new NotFoundException();
        }

        public List<CustomerResponse> GetCustomers()
        {
            return this._upesiMoneyContext.Customers.Select(t => this._mapper.Map<CustomerResponse>(t)).ToList();

        }
    }
}
