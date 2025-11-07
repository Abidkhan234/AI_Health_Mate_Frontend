import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAddReport } from "../../../../apis/reportApi";
import { Form, Formik } from "formik";
import { addReportSchema } from "@/schemas/schema";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import CustomInput from "@/components/forms/inputs/CustomInput";
import LoadingButton from "@/components/Buttons/LoadingBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomTextArea from "@/components/forms/inputs/CustomTextArea";
import CustomSelectMenu from "@/components/forms/inputs/CustomSelect";
import toast from "react-hot-toast";
import SummaryDialog from "@/components/common/drop-down-comps/SummaryDialog";
import { useState } from "react";
import OverlayWrapper from "@/components/wrappers/OverlayWrapper";

const itemsArr = [
  { text: "Lab report", value: "lab_report" },
  { text: "Discharge Summary", value: "discharge_summary" },
  { text: "Diagnostic Report", value: "diagnostic_report" },
];

const UploadReportPage = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [showOverLay, setShowOverLay] = useState(false);
  const uploadReportMutation = useMutation({
    mutationFn: (payload) => handleAddReport(payload),
    mutationKey: ["upload_report_mutation"],
    onMutate: () => {
      setShowOverLay(true);
    },
    onSettled: () => {
      setShowOverLay(false);
    },
  });

  const submitHandler = (values, { resetForm }) => {
    const { file } = values;

    const payload = { ...values };

    if (!file) {
      payload.file = null;
    }

    uploadReportMutation.mutate(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        if (res?.summary && res.is_summarized) {
          setIsOpen(true);
        }
        queryClient.refetchQueries({
          queryKey: ["report_history"],
        });
        resetForm();
      },
      onError: (res) => {
        toast.error(res);
      },
    });
  };

  const { isPending, data } = uploadReportMutation;

  return (
    <OverlayWrapper isStarted={showOverLay}>
      <div className="flex justify-center items-center pt-3">
        <Card className={`w-full max-w-3xl`}>
          <CardHeader>
            <CardTitle className={`font-semibold text-3xl sm:text-4xl`}>
              Upload Report
            </CardTitle>
            <CardDescription className={`font-medium`}>
              Upload report details below to get get AI summary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              validationSchema={addReportSchema}
              onSubmit={submitHandler}
              initialValues={{
                report_title: "",
                report_description: "",
                report_type: "",
                file: {},
              }}
            >
              <Form encType="multipart/form-data">
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
                  <FieldGroup>
                    <Field className={`mt-1`}>
                      <LoadingButton
                        text={`Upload Report`}
                        isLoading={isPending}
                        className={`py-5 font-semibold`}
                      />
                    </Field>
                  </FieldGroup>
                </FieldGroup>
              </Form>
            </Formik>
          </CardContent>
        </Card>
      </div>

      <>
        <SummaryDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          summary={data?.summary}
          report_title={data?.report_title}
          report_description={data?.report_description}
          noButton
        />
      </>
    </OverlayWrapper>
  );
};

export default UploadReportPage;
