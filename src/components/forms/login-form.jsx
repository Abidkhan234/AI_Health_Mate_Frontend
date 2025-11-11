import { cn } from "@/lib/utils";

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

import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router";
import { LoginSchema } from "@/schemas/schema";
import CustomInput from "./inputs/CustomInput";
import InputPassword from "./inputs/InputPassword";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleLogin } from "../../../apis/authApi";
import toast from "react-hot-toast";
import LoadingButton from "@/components/Buttons/LoadingBtn";
import useUIContext from "../../../contexts/UIContext";
import { jwtDecode } from "jwt-decode";

export function LoginForm({ className, ...props }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUserData } = useUIContext();
  const loginMutation = useMutation({
    mutationKey: ["login_mutation"],
    mutationFn: (payload) => handleLogin(payload),
  });

  const submitHandler = async (values, { resetForm }) => {
    const payload = {
      password: values.password,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(values.identifier)) {
      payload.email = values.identifier;
    } else {
      payload.userName = values.identifier;
    }

    loginMutation.mutate(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        const { id, email, userName } = jwtDecode(res.accessToken);

        setUserData({ id, email, userName });

        resetForm();
        queryClient.refetchQueries({
          queryKey: ["report_history"],
        });
        setTimeout(() => {
          navigate("/dashboard/report-history");
        }, 1000);
      },
      onError: (res) => {
        
        toast.error(res);
      },
    });
  };

  const { isPending } = loginMutation;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className={`font-bold sm:text-3xl text-2xl`}>
            Login to your account
          </CardTitle>
          <CardDescription className={`font-medium`}>
            Enter your email or username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ identifier: "", password: "" }}
            onSubmit={submitHandler}
            validationSchema={LoginSchema}
          >
            <Form>
              <FieldGroup className={`gap-6!`}>
                <Field>
                  <FieldLabel htmlFor="identifier" className={`font-medium`}>
                    Email / Username
                  </FieldLabel>
                  <CustomInput
                    placeHolder={`Email / Username`}
                    id={`identifier`}
                    name={`identifier`}
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

                <Field className={`mt-3`}>
                  <LoadingButton isLoading={isPending} text={"Login"} />
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                      to={`/register`}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Register
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
