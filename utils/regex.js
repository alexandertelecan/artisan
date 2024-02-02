const regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
  cif: /^[0-9]{2,10}$/,
  postCode: /^\d{6}$/,
  price: /^[0-9]+$/,
};

export default regex;
