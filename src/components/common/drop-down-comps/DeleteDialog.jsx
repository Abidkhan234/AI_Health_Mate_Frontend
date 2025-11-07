import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { handleDeleteReport } from "../../../../apis/reportApi";
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

const DeleteDialog = ({ id, showDeleteConfirm, setShowDeleteConfirm }) => {
  const queryClient = useQueryClient();

  const deleteReportMutation = useMutation({
    mutationFn: (id) => handleDeleteReport(id),
    mutationKey: ["report_delete_mutation"],
  });

  const handleClick = () => {
    deleteReportMutation.mutate(id, {
      onSuccess: (res) => {
        toast.success(res.message);
        setShowDeleteConfirm(false);
        queryClient.refetchQueries({
          queryKey: ["report_history"],
        });
      },
      onError: (res) => {
        toast.error(res);
      },
    });
  };

  const { isPending } = deleteReportMutation;

  return (
    <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
      <AlertDialogContent className={`gap-8`}>
        <AlertDialogHeader>
          <AlertDialogTitle className={`text-2xl font-semibold`}>
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            report from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={`justify-between!`}>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <LoadingButton
            text={"Delete"}
            variant={`destructive`}
            isLoading={isPending}
            handleFn={handleClick}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
