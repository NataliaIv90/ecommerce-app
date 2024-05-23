import { useAppSelector } from '../../hooks/reduxHooks';
import { MainWrapper } from '../mainWrapper/MainWrapper';

export const Profile = (): JSX.Element => {
  const customer = useAppSelector((state) => state.customers.customer);

  return (
    <MainWrapper>
      <h1>Profile</h1>
      <p>First Name: {customer?.firstName}</p>
      <p>Last Name: {customer?.lastName}</p>
      <p>Email: {customer?.email}</p>
      <p>Verified: {customer?.isEmailVerified}</p>
      {customer?.addresses.map((address) => {
        return (
          <div key={address.id}>
            <p>City: {address?.city}</p>
            <p>Street: {address?.streetName}</p>
            <p>Country Code: {address?.country}</p>
            <p>Postal Code: {address?.postalCode}</p>
          </div>
        );
      })}
    </MainWrapper>
  );
};
