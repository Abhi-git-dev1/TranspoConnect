const validatePhoneNumber = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

const validateBookingData = (data) => {
  const errors = [];

  if (!data.pickupLocation || !data.pickupLocation.address) {
    errors.push('Pickup address is required');
  }
  if (!data.dropLocation || !data.dropLocation.address) {
    errors.push('Drop address is required');
  }
  if (!data.vehicleType) {
    errors.push('Vehicle type is required');
  }
  if (!['bike', 'auto', 'van', 'truck'].includes(data.vehicleType)) {
    errors.push('Invalid vehicle type');
  }

  return errors;
};

const validateCityMatch = (pickupCity, dropCity) => {
  return (
    pickupCity &&
    dropCity &&
    pickupCity.toLowerCase().trim() === dropCity.toLowerCase().trim()
  );
};

module.exports = {
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  validateBookingData,
  validateCityMatch,
};
