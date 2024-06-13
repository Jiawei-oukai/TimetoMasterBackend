import Customer from "../models/customers.js";

//seach all customers
export const search = async (params) => {
  const customers = Customer.find(params).select('-password').exec();
  return customers;
};

//customer create new customer
export const save = async (newCustomer) => {
  const customer = new Customer(newCustomer);
  return customer.save();
};

//get customer by ID
export const getById = async (id) => {
  const customer = Customer.findById(id).exec();
  return customer;
};

//update customer
export const update = async (id, updatedCustomer) => {
  const customer = Customer
    .findByIdAndUpdate(id, updatedCustomer, { new: true })
    .exec();
  return customer;
};

//delete customer
export const remove = async (id) => {
  const customer = Customer.findByIdAndRemove(id).exec();
  return customer;
};


//get customer by email

export const getByEmail = async (email) => {
    const customer = Customer.findOne(email).exec();
    return customer;
}

export const openPrime = async (id) => {
  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      throw new Errow('Customer not found');
    }

    customer.primeCustomer = true;

    const updatedCustomer = await customer.save();

    return updatedCustomer;
  } catch (error) {
    throw error;
  }
}

export const closePrime = async (id) => {
  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      throw new Errow('Customer not found');
    }

    customer.primeCustomer = false;

    const updatedCustomer = await customer.save();

    return updatedCustomer;
  } catch (error) {
    throw error;
  }
}