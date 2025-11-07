import { Input } from "@/components/ui/input";
import { useField } from "formik";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const InputPassword = ({ name, id, placeHolder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name);

  return (
    <div className="relative flex items-center">
      <div className="relative w-full">
        <Input
          className={`outline-none text-sm grow`}
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeHolder}
          {...field}
        />
        <button
          type="button"
          className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="size-5.5" />
          ) : (
            <EyeClosed className="size-5.5" />
          )}
        </button>
      </div>
      {meta.error && meta.touched && (
        <p className="font-medium text-xs text-red-500 absolute -bottom-5">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default InputPassword;
