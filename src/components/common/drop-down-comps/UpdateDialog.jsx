import { Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LoadingButton from "@/components/Buttons/LoadingBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { addReportSchema } from "@/schemas/schema";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import CustomInput from "@/components/forms/inputs/CustomInput";
import CustomTextArea from "@/components/forms/inputs/CustomTextArea";
import CustomSelectMenu from "@/components/forms/inputs/CustomSelect";
import { useState } from "react";
import SummaryDialog from "./SummaryDialog";
import { handleReportUpdate } from "../../../../apis/reportApi";
import toast from "react-hot-toast";

const itemsArr = [
  { text: "Lab report", value: "lab_report" },
  { text: "Discharge Summary", value: "discharge_summary" },
  { text: "Diagnostic Report", value: "diagnostic_report" },
];

const UpdateDialog = ({
  id,
  report_title,
  report_type,
  report_description,
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
}) => {
  const queryClient = useQueryClient();
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);

  const updateMutation = useMutation({
    mutationFn: ({ payload, id }) => handleReportUpdate({ payload, id }),
    mutationKey: ["update_mutation"],
  });

  const submitHandler = (values, { resetForm }) => {
    const payload = { ...values };

    updateMutation.mutate(
      { payload, id },
      {
        onSuccess: (res) => {
          toast.success(res.message);

          if (res.summary && res.is_summarized) {
            setIsSummaryDialogOpen(true);
            setIsUpdateDialogOpen(false);
          } else {
            setIsUpdateDialogOpen(false);
          }

          queryClient.refetchQueries({
            queryKey: ["report_history"],
          });

          resetForm();
        },
        onError: (res) => {
          toast.error(res);
        },
      }
    );
  };

  const { isPending, data } = updateMutation;

  return (
    <>
      <AlertDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
      >
        <AlertDialogContent className={`gap-8 max-w-4xl!`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={`text-2xl font-semibold`}>
              Update Report Form
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently update the
              report.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Formik
            validationSchema={addReportSchema}
            onSubmit={submitHandler}
            initialValues={{
              report_title: report_title,
              report_description: report_description || "",
              report_type: report_type,
              file: {},
            }}
          >
            <Form encType="multipart/form-data" className="space-y-3 w-full">
              <FieldGroup className={`gap-8!`}>
                <Field>
                  <FieldLabel htmlFor="report_title">Report Title</FieldLabel>
                  <CustomInput
                    name={`report_title`}
                    id={"report_title"}
                    placeHolder={`Report Title`}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="report_description">
                    Report Description
                  </FieldLabel>
                  <CustomTextArea
                    name={`report_description`}
                    id={"report_description"}
                    placeHolder={`Report Description`}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="report_type">Report Type</FieldLabel>
                  <CustomSelectMenu
                    placeHolder={`Report Type`}
                    id={"report_type"}
                    name={"report_type"}
                    itemsArr={itemsArr}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="file">File</FieldLabel>
                  <CustomInput
                    placeHolder={`Select file`}
                    id={"file"}
                    name={"file"}
                    type="file"
                  />
                </Field>
              </FieldGroup>

              <AlertDialogFooter className={`justify-between! mt-8 gap-y-4 flex-col! md:flex-row!`}>
                <AlertDialogCancel
                  disabled={isPending}
                  className={`py-4 px-10 text-base font-medium`}
                >
                  Cancel
                </AlertDialogCancel>
                <LoadingButton
                  type={`submit`}
                  isLoading={isPending}
                  text={`Update`}
                  className={`py-4 md:w-[120px] text-base font-medium`}
                />
              </AlertDialogFooter>
            </Form>
          </Formik>
        </AlertDialogContent>
      </AlertDialog>
      <>
        <SummaryDialog
          isOpen={isSummaryDialogOpen}
          setIsOpen={setIsSummaryDialogOpen}
          summary={data?.summary}
          report_title={data?.report_title}
          report_description={data?.report_description}
          noButton
        />
      </>
    </>
  );
};

export default UpdateDialog;
