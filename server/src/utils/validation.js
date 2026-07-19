// First Name
export const validateFullName = (name) => {
  if (!name.trim()) return "First name is required";

  if (name.trim().length < 2) return "First name must be at least 2 characters";

  if (!/^[A-Za-z ]+$/.test(name)) return "First name can contain only letters";

  return "";
};

// Email
export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) return "Enter a valid email address";

  return "";
};

// Password
export const validatePassword = (password) => {
  if (!password) return "Password is required";

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!regex.test(password))
    return "Password must contain uppercase, lowercase, number and special character";

  return "";
};

// Confirm Password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Confirm password is required";

  if (password !== confirmPassword) return "Passwords do not match";

  return "";
};

// Terms Checkbox
export const validateTerms = (terms) => {
  if (!terms) return "Please accept the Terms & Privacy Policy";

  return "";
};
