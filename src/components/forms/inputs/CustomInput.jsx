import { Input } from "@/components/ui/input";
import { useField, useFormikContext } from "formik";

const CustomInput = ({ name, id, placeHolder, type }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <div className="relative">
      {type == "file" ? (
        <>
          <Input
            type={"file"}
            className={`cursor-pointer`}
            onChange={(event) => {
              const file = event.target.files[0];
              setFieldValue(name, file);
            }}
          />
          {meta.error && meta.touched && (
            <p className="font-medium text-xs text-red-500 absolute -bottom-5">
              {meta.error}
            </p>
          )}
        </>
      ) : (
        <>
          <Input
            className={``}
            type={type || "text"}
            id={id}
            placeholder={placeHolder}
            {...field}
          />
          {meta.error && meta.touched && (
            <p className="font-medium text-xs text-red-500 absolute -bottom-5">
              {meta.error}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CustomInput;
