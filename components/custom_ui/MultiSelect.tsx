"use client";
import React, { useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  value: string[];
  onChange: (args: string) => void;
  onRemove: (args: string) => void;
  collections: CollectionType[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
  collections,
}) => {
  const [inputValue, setInputValue] = useState("");
  //   set to false
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );
  return (
    <Command className="overflow-visible bg-white-1">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button
              className="ml-1 hover:text-black-1"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="mt-2 relative">
        {open && (
          <CommandList className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md ">
            {selectables.map((collection) => (
              <CommandItem
                key={collection._id}
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
                onMouseDown={(e) => e.preventDefault()}
                className=" hover:bg-slate-500 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
