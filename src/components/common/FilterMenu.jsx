import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUIContext from "../../../contexts/UIContext";

const FilterMenu = () => {
  const { setSort } = useUIContext();

  return (
    <div className="flex items-center justify-end mb-3">
      <Select onValueChange={(val) => setSort(val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="latest">Latest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterMenu;
