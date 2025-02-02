import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Label,
} from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "Wade Cooper", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Arlene Mccoy", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Devon Webb", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, name: "Tom Cook", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, name: "Tanya Fox", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
];

export default function Example() {
  const [selected, setSelected] = useState(people[0] || null);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm font-medium text-gray-900">Assigned to</Label>
      <div className="relative mt-2">
        <ListboxButton
          aria-label="Select a person"
          className="flex w-full items-center justify-between rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
        >
          <span className="flex items-center gap-3">
            <img alt={selected.name} src={selected.avatar} className="h-5 w-5 rounded-full" />
            <span className="truncate">{selected.name}</span>
          </span>
          <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {people.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="relative cursor-pointer select-none py-2 px-3 text-gray-900 hover:bg-indigo-600 hover:text-white"
            >
              <div className="flex items-center">
                <img alt={person.name} src={person.avatar} className="h-5 w-5 rounded-full" />
                <span className="ml-3 truncate">{person.name}</span>
              </div>
              {selected.id === person.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
