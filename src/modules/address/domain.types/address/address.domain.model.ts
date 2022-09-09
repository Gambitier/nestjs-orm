export type AddressDomainModel = {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: Date;
};

export type CreateAddressDomainModel = {
  streetAddress?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};
