import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useField } from "formik";
import React from "react";

const CustomTextArea = ({ name, placeHolder, id, className }) => {
  const [field, meta] = useField(name);

  return (
    <div className="relative">
      <Textarea
        placeholder={placeHolder}
        id={id}
        {...field}
        className={cn(`resize-none h-30 text-base font-medium`, className)}
      />
      {meta.error && meta.touched && (
        <p className="font-medium text-xs text-red-500 absolute -bottom-5">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
