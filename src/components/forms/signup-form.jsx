import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { registerSchema } from "@/schemas/schema";
import { Form, Formik } from "formik";
import CustomInput from "./inputs/CustomInput";
import InputPassword from "./inputs/InputPassword";
import { Link, useNavigate } from "react-router";
import LoadingButton from "../Buttons/LoadingBtn";
import { useMutation } from "@tanstack/react-query";
import { handleRegister } from "../../../apis/authApi";
import toast from "react-hot-toast";

export function SignupForm({ ...props }) {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: (payload) => handleRegister(payload),
    mutationKey: ["register_mutation"],
  });

  const submitHandler = (values, { resetForm }) => {
    const payload = { ...values };

    registerMutation.mutate(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      },
      onError: (res) => {
        toast.error(res);
      },
    });
  };

  const { isPending } = registerMutation;

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className={`font-semibold text-3xl sm:text-xl`}>
          Create an account
        </CardTitle>
        <CardDescription className={`font-medium`}>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ userName: "", email: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={submitHandler}
        >
          <Form>
            <FieldGroup className={`gap-7!`}>
              <Field>
                <FieldLabel htmlFor="userName">User Name</FieldLabel>
                <CustomInput
                  name={`userName`}
                  id={"userName"}
                  placeHolder={`Jhon doe`}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <CustomInput
                  name={`email`}
                  id={"email"}
                  placeHolder={`Jhondeo@gmail.com`}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputPassword
                  name={`password`}
                  id={"password"}
                  placeHolder={`Enter Password`}
                />
              </Field>
              <FieldGroup>
                <Field className={`mt-3`}>
                  <LoadingButton
                    text={`Create account`}
                    isLoading={isPending}
                  />
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link to={`/`}>Login In</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
