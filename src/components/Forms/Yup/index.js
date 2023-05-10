import * as Yup from "yup";

// login form validation schemas

// loginForm Schemas

const logInFormSchemas = Yup.object({
  emailOrUserName: Yup.string()
    .email("Invalid email address")
    .required("Please enter your Spotify username or email address."),
  password: Yup.string()
    .min(6, "must be more than 6 characters.")
    .required("Please enter your password."),
});

// signUpForm schemas

const signUpFormSchemas = Yup.object({
  email: Yup.string()
    .email("Please Enter valid email address.")
    .required("Enter your email."),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], `email doesn't match!`)
    .required("Please confirm the password."),
  password: Yup.string()
    .min(6, "your password is too short.")
    .required("you need to enter a password."),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match!`)
    .required("You need to match the password."),
  profileName: Yup.string()
    .min(2, "your profile name is too short.")
    .max(20, "your profile name is too short long.")
    .required("You need to give a profile name."),
  dateOfBirth: Yup.object({
    day: Yup.number()
      .min(1, `please enter the valid day!`)
      .max(31, "please enter the valid day!")
      .required("You need to enter the day."),
    month: Yup.string().required("You Need to select the month."),
    year: Yup.number()
      .min(1950, "please enter the valid year!")
      .max(2050, "please enter the valid year!")
      .required("You need to enter the year."),
  }),
  gender: Yup.string().required("Select your gender."),
  conditions: Yup.array(Yup.string(), Yup.string()).notRequired(),
});

export { logInFormSchemas, signUpFormSchemas };
