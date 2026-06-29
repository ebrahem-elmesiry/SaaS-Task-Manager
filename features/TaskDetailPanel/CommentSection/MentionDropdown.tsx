type SuggestionObject = {
  id: string;
  label: string;
};

type SuggestionType = {
  items: SuggestionObject[];
  command: (item: SuggestionObject) => void;
};

type MentionDropdownProps = {
  suggestionProps: SuggestionType | null;
};

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function MentionDropdown({
  suggestionProps,
}: MentionDropdownProps) {
  if (!suggestionProps || suggestionProps.items.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-35.5 left-0 z-50 animate-in fade-in-0 slide-in-from-bottom-3 duration-200 w-full">
      <Command className="w-full bg-slate-200 dark:bg-slate-900 text-popover-foreground border border-border rounded-lg shadow-md">
        <CommandList className="max-h-30 overflow-y-auto">
          <CommandGroup>
            {suggestionProps.items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => {
                  suggestionProps.command({
                    id: item.id,
                    label: item.label,
                  });
                }}
                className="cursor-pointer text-xs"
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
