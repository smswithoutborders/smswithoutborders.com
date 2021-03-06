import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const languages = [
  { name: "EN", key: "en" },
  { name: "FR", key: "fr" },
];

export const LanguageSwitcher = ({ bordered }) => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(languages[0]);

  const changeLanguage = useCallback(
    (lang) => {
      setSelected(lang);
      i18n.changeLanguage(lang.key);
    },
    [i18n]
  );

  useEffect(() => {
    const initial = languages.find((lang) => lang.key === i18n.language);
    if (initial) setSelected(initial);
  }, [i18n]);

  return (
    <Listbox
      multiple={false}
      value={selected}
      onChange={(lang) => changeLanguage(lang)}
    >
      <div
        className={`relative  ${bordered && "md:border md:border-gray-600"}`}
      >
        <Listbox.Button className="flex items-center justify-between w-full p-4 space-x-1 rounded-lg cursor-default focus:outline-none">
          {({ open }) => (
            <Fragment>
              <span className="block font-normal">{selected?.name}</span>
              <FiChevronDown
                size={16}
                className={`pointer-events-none ${open && "rotate-180"}`}
                aria-hidden="true"
              />
            </Fragment>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full overflow-auto bg-white border divide-y rounded-md shadow-xl focus:outline-none">
            {languages.map((lang, id) => (
              <Listbox.Option
                key={id}
                value={lang}
                className="relative cursor-default select-none"
              >
                {({ selected }) => (
                  <span
                    className={`block px-4 py-2 ${
                      selected ? "text-blue-800" : "text-gray-900"
                    }`}
                  >
                    {lang.name}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
