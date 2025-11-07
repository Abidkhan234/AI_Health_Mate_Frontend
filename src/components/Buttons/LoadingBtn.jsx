import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const LoadingButton = ({
  text,
  isLoading,
  className,
  handleFn = null,
  variant,
  type,
}) => {
  return (
    <Button
      variant={variant}
      type={type || "submit"}
      className={cn(
        `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer`,
        className
      )}
      onClick={() => (handleFn ? handleFn() : null)}
      disabled={isLoading}
    >
      {isLoading && <Spinner />}
      {text}
    </Button>
  );
};

export default LoadingButton;
