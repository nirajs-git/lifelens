export const calculateAge = (dob) => {
  const currentDate = new Date();
  const dobDate = new Date(dob);
  const age = currentDate.getFullYear() - dobDate.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    return age - 1;
  }

  return age;
};
