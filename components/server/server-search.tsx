"use client";

import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

interface serverSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          id: string;
          name: string;
          icon: React.ReactNode;
        }[]
      | undefined;
  }[];
}

export const ServerSearch = ({ data }: serverSearchProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:bg-zinc-700/500 transition "
      onClick={()=>setOpen(true)}>
        <Search className="w-4 h-4 mr-2 text-zinc-500 dark:text-zinc-400" />
        <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm group-hover:text-zinc-300 dark:group-hover:text-zinc-600 transition">
          Server Search
        </p>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="search all channels and members" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data.map(({ type, label, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ name, id, icon }) => {
                  return (
                    <CommandItem key={id}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
