using AutoMapper;
using UpesiMoney.Core.DTOs;
using UpesiMoney.Core.Entities;

namespace UpesiMoney.Core.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<CreateTransactionRequest, Transaction>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.TransactionType, opt => opt.Ignore())
                .ForMember(dest => dest.TransferAccountNo, opt => opt.Ignore())
                .ForMember(dest => dest.Amount, opt => opt.Ignore())
                .ForMember(dest => dest.Charge, opt => opt.Ignore())
                .ForMember(dest => dest.AccountBalance, opt => opt.Ignore());
            CreateMap<Transaction, TransactionResponse>();

            CreateMap<CreateCustomerRequest, Customer>()
                .ForMember(dest => dest.CustomerId, opt => opt.Ignore())
                .ForMember(dest => dest.AccountNumber, opt => opt.Ignore())
                .ForMember(dest => dest.Email, opt => opt.Ignore())
                .ForMember(dest => dest.FirstName, opt => opt.Ignore())
                .ForMember(dest => dest.LastName, opt => opt.Ignore())
                .ForMember(dest => dest.Address, opt => opt.Ignore());
            CreateMap<Customer, CustomerResponse>();

            CreateMap<CreateAtmRequest, Atm>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Location, opt => opt.Ignore())
                .ForMember(dest => dest.Balance, opt => opt.Ignore());
            CreateMap<Atm, AtmResponse>();
        }
    }
}
