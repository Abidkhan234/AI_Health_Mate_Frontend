import { Spinner } from "@/components/ui/spinner";

const FallBackSpinner = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Spinner className={`size-10`} />
    </div>
  );
};

export default FallBackSpinner;
