export function validateStep1(s) {
  const e = {};
  if (!s.name.trim()) e.name = "required";
  if (!s.nationalId.trim()) e.nationalId = "required";
  if (!s.dob.trim()) e.dob = "required";
  if (!s.gender) e.gender = "required";
  if (!s.address.trim()) e.address = "required";
  if (!s.city.trim()) e.city = "required";
  if (!s.state.trim()) e.state = "required";
  if (!s.country.trim()) e.country = "required";
  if (!s.phone.trim()) e.phone = "required";
  if (!/^\S+@\S+\.\S+$/.test(s.email)) e.email = "invalid_email";
  return e;
}

export function validateStep2(s) {
  const e = {};
  if (!s.maritalStatus) e.maritalStatus = "required";
  if (s.dependents.trim() === "" || Number.isNaN(Number(s.dependents))) e.dependents = "invalid_number";
  if (!s.employmentStatus) e.employmentStatus = "required";
  if (s.monthlyIncome.trim() === "" || Number.isNaN(Number(s.monthlyIncome))) e.monthlyIncome = "invalid_number";
  if (!s.housingStatus) e.housingStatus = "required";
  return e;
}

export function validateStep3(s) {
  const e = {};
  if (!s.currentFinancialSituation.trim()) e.currentFinancialSituation = "required";
  if (!s.employmentCircumstances.trim()) e.employmentCircumstances = "required";
  if (!s.reasonForApplying.trim()) e.reasonForApplying = "required";
  return e;
}
