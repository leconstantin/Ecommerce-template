import { CheckIcon, EllipsisIcon, PenToolIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
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

      <PopoverContent className="-right-11 absolute w-56 px-2 py-4 dark:bg-background">
        <div className="flex flex-col">
          {/* Edit */}
          <Button
            asChild
            className="w-full justify-between font-normal text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            <Link href="/">
              <span>Edit</span>
              <PenToolIcon className="size-4 text-muted-foreground" />
            </Link>
          </Button>

          {/* Delete / Restore */}

          <Button
            className="w-full justify-between font-normal text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            <span>Publish</span>
            <CheckIcon className="size-4 text-muted-foreground" />
          </Button>

          <Button
            className="w-full justify-between font-normal text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            <span>Move to Trash</span>
            <TrashIcon className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
