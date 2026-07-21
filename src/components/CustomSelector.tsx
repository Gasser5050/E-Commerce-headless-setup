import { useState, useRef, useEffect } from "react";
import { cn } from "../utils/cn";

interface CustomSelectorType {
  stockCount: number;
  selectedQty: number;
  onQtyChange: (qty: number) => void;
  disabled?: boolean;
}

export default function CustomSelector({
  stockCount,
  selectedQty,
  onQtyChange,
  disabled = false
}: CustomSelectorType) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        disabled={disabled || stockCount === 0}
        onClick={() => setIsOpen(prev => !prev)}
        className={cn(
          "flex items-center justify-between space-x-2 bg-gray-100 dark:bg-zinc-800 text-sm font-medium px-3 py-1.5 border border-gray-300 dark:border-zinc-700 rounded-md shadow-2xs transition-colors duration-150 cursor-pointer",
          "hover:bg-gray-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-500",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
        )}
      >
        <span>
          {disabled
            ? "Qty: -"
            : stockCount === 0
              ? "Qty: 0"
              : `Qty: ${selectedQty}`}
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

      {/* Custom Scrollable Popover Menu */}
      {isOpen && !disabled && stockCount > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 mt-1 w-24 max-h-48 overflow-y-auto bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md shadow-lg z-50 py-1 scrollbar-thin divide-y divide-gray-100 dark:divide-zinc-700/50"
        >
          {Array.from({ length: stockCount }, (_, i) => i + 1).map(qty => {
            const isSelected = selectedQty === qty;

            return (
              <li
                key={qty}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onQtyChange(qty);
                  setIsOpen(false);
                }}
                className={cn(
                  "px-3 py-1.5 text-sm cursor-pointer transition-colors duration-100 flex items-center justify-between",
                  isSelected
                    ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200 font-bold"
                    : "hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-100"
                )}
              >
                <span>{qty}</span>
                {isSelected && (
                  <span className="text-xs text-yellow-600">✓</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
