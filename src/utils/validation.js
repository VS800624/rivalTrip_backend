const validator = require("validator")

const validateSignUpData = (req) => {
  const {firstName, lastName, emailId , password} = req.body

  if(typeof firstName !== "string" || typeof lastName !== "string"){
    throw new Error ("Name should be string")
  }

  if(!firstName || !lastName){
    throw new Error("Please enter the full name")
  }

  if(typeof emailId !== "string" || !validator.isEmail(emailId)){
    throw new Error("Email is not valid")
  }

  if(typeof password !== "string" || !validator.isStrongPassword(password)){
     throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.") 
  }
}


export const validateAndFormatPopularDestination = (data, isCreate = false) => {
  const updates = { ...data };

  // Required fields (only for CREATE)
  if (isCreate) {
    if (!updates.slug || !updates.countryName || !updates.city) {
      throw new Error("slug, countryName and city are required");
    }
  }

  // Normalize slug
  if (updates.slug) {
    updates.slug = updates.slug.trim().toLowerCase();
  }

  // Validate numbers
  if (updates.priceValue !== undefined && isNaN(updates.priceValue)) {
    throw new Error("priceValue must be a number");
  }

  if (updates.discountValue !== undefined && isNaN(updates.discountValue)) {
    throw new Error("discountValue must be a number");
  }

  // Convert to Number
  if (updates.priceValue !== undefined) {
    updates.priceValue = Number(updates.priceValue);
  }

  if (updates.discountValue !== undefined) {
    updates.discountValue = Number(updates.discountValue);
  }

  // Validate sections
  if (updates.sections && !Array.isArray(updates.sections)) {
    throw new Error("sections must be an array");
  }

  return updates;
};


module.exports = {validateSignUpData, validateAndFormatPopularDestination}