import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SliderContent from "../layout/SliderContent";
import { Menu } from "lucide-react";

export default function MobileSlideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          <span>
            <Menu className="w-5 h-5" />
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-0 w-64! flex flex-col dark:bg-slate-800"
      >
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        {/* content */}
        <SliderContent />
      </SheetContent>
    </Sheet>
  );
}
