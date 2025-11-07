import useUIContext from "../../../contexts/UIContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleLogout } from "../../../apis/authApi";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { LogOut, User } from "lucide-react";

const UserAvatar = ({ isCollapsed }) => {
  const queryClient = useQueryClient();
  const { userData, setUserData, setPage, setSort } = useUIContext();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: handleLogout,
    mutationKey: ["logout_mutation"],
  });

  const handleClick = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: (res) => {
          toast.success(res.message);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUserData(null);
          queryClient.clear();
          setPage(1);
          setSort("");
          navigate("/");
        },
        onError: (res) => {
          toast.error(res);
        },
      }
    );
  };

  const { isPending } = logoutMutation;

  return (
    <div className="flex items-center justify-between w-full">
      {isCollapsed && (
        <p className="text-sm font-medium overflow-hidden text-ellipsis text-nowrap">
          {userData?.userName}
        </p>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer size-9">
            <AvatarFallback className={`bg-accent`}>
              {userData?.userName?.charAt(0) || "D"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-50 flex flex-col py-3 px-2 gap-3"
          align="start"
        >
          {isPending ? (
            // Spinner view when loading
            <div className="flex items-center justify-center p-4 h-20">
              <Spinner className="size-8 text-muted-foreground" />
            </div>
          ) : (
            // Normal dropdown menu
            <>
              <DropdownMenuItem>
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClick} variant="destructive">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatar;
