import * as Yup from "yup";
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must at least 6 charecters Long"),
});

export { validationSchema };
