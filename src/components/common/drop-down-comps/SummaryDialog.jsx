import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const SummaryDialog = ({
  summary,
  report_title,
  report_description,
  isOpen,
  setIsOpen,
  noButton = false,
}) => {
  const controlledProps =
    isOpen !== undefined && setIsOpen !== undefined
      ? { open: isOpen, onOpenChange: setIsOpen }
      : {};

  return (
    <AlertDialog {...controlledProps}>
      {!noButton && (
        <AlertDialogTrigger asChild>
          <Button variant="default" className="flex-1">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent className={`max-w-4xl! w-full`}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {report_title || "Report Summary"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {report_description || "No description provided"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <h3 className="text-2xl font-semibold">Summary:</h3>
        <ScrollArea className="max-h-[50vh] pr-4 pb-3">
          <div
            className="md:text-base text-sm max-w-none space-y-4 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-6 leading-relaxed tracking-normal"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel className={`py-4 px-7 font-semibold`}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SummaryDialog;
