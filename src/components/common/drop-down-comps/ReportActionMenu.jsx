import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";
import { useState } from "react";

const CustomActionsMenu = ({
  id,
  report_title,
  report_type,
  report_description,
}) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-38 flex flex-col gap-3 py-2"
        >
          <DropdownMenuItem
            onClick={() => setIsUpdateDialogOpen(!isUpdateDialogOpen)}
          >
            <Pencil className="h-4 w-4" />
            Update Report
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
          >
            <Trash2 className="h-4 w-4" />
            Delete Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <>
        <DeleteDialog
          id={id}
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
      </>
      <>
        <UpdateDialog
          id={id}
          report_description={report_description}
          report_title={report_title}
          report_type={report_type}
          isUpdateDialogOpen={isUpdateDialogOpen}
          setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        />
      </>
    </>
  );
};

export default CustomActionsMenu;
