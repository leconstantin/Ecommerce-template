import { CheckIcon, EllipsisIcon, EyeIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export function ItemCardActions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mr-10 w-56 px-2 py-4 dark:bg-background">
        <div className="flex flex-col">
          {/* Edit */}
          <Button
            asChild
            className="w-full justify-between font-normal text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            <div>
              <span>Mark as completed</span>
              <CheckIcon className="size-4 text-muted-foreground" />
            </div>
          </Button>

          {/* Delete / Restore */}

          <Button
            className="w-full justify-between font-normal text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            <span>View</span>
            <EyeIcon className="size-4 text-muted-foreground" />
          </Button>

          <Button
            className="w-full justify-between font-normal text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            <span>Cancel</span>
            <TrashIcon className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
