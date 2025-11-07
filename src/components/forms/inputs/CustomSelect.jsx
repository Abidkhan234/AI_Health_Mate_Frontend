import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useField, useFormikContext } from "formik";

const CustomSelectMenu = ({ labelText, itemsArr, placeHolder, name, id }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <div className="w-full relative">
      <Select
        value={field.value || ""}
        onValueChange={(val) => setFieldValue(name, val)}
      >
        <SelectTrigger className="w-full py-5" id={id} {...field}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className={`font-medium`}>{labelText}</SelectLabel>
            {itemsArr?.map((v, i) => (
              <SelectItem
                className={`cursor-pointer text-base font-medium`}
                value={v.value}
                key={i}
              >
                {v.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {meta.error && meta.touched && (
        <p className="font-medium text-xs text-red-500 absolute -bottom-5">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default CustomSelectMenu;
