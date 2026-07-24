import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

function DropDownBox({
  placeholder,
  listSize,
  selectedValue,
  updateSelectedValue,
  isPositionedUp,
  disabled
}: {
  placeholder: string;
  listSize: number;
  selectedValue: number;
  updateSelectedValue: (value: number) => void;
  isPositionedUp?: true;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={boxRef} className="relative">
      <button
        onClick={() => {
          if (listSize === 0) return;
          setIsOpen(status => !status);
        }}
        className={cn(
          "flex items-center justify-between space-x-1.25 px-2.5 border border-black/40 dark:border-white/25 hover:border-black dark:hover:border-white outline-0 shadow-2xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none rounded-sm",
          isOpen && isPositionedUp ? "rounded-none rounded-b-sm" : "",
          isOpen && !isPositionedUp ? "rounded-none rounded-t-sm" : "",
          disabled
            ? "bg-neutral-300 dark:bg-neutral-500 pointer-events-none"
            : ""
        )}
      >
        <span>
          {placeholder} {selectedValue}
        </span>
        <svg
          className={cn(
            "w-3.5 h-3.5 text-gray-500 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && listSize > 0 && (
        <ul
          onClick={() => setIsOpen(false)}
          className={cn(
            "absolute flex left-0 overflow-hidden overflow-y-scroll w-full bg-slate-100 dark:text-black border border-black/40 dark:border-white/25",
            listSize <= 5 ? "overflow-y-clip" : "",
            isPositionedUp
              ? "flex-col-reverse bottom-full rounded-t-sm"
              : "flex-col rounded-b-sm"
          )}
          style={{ height: listSize <= 5 ? `${listSize * 1.5}rem` : "7.5rem" }}
        >
          {Array.from({ length: listSize }, (_, index) => {
            return (
              <li key={index + 1}>
                <button
                  onClick={() => updateSelectedValue(index + 1)}
                  className="w-full text-sm hover:bg-blue-200 dark:hover:bg-black/10 cursor-pointer"
                >
                  {index + 1}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DropDownBox;
