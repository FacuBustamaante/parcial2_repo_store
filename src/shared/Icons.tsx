interface IconProps {
   size?: number;
   className?: string;
}

interface ArrowIconProps extends IconProps {
   dir?: "left" | "right";
}

export function SearchIcon({ size = 16, className }: IconProps) {
   return (
      <svg
         width={size}
         height={size}
         className={className}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth={2}
         strokeLinecap="round"
         strokeLinejoin="round"
         aria-hidden="true"
      >
         <circle cx="11" cy="11" r="8" />
         <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
   );
}

export function ArrowIcon({ size = 16, dir = "right", className }: ArrowIconProps) {
   const rotate = dir === "left" ? "rotate(180deg)" : "none";
   return (
      <svg
         width={size}
         height={size}
         className={className}
         style={{ transform: rotate, display: "inline-block" }}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth={2}
         strokeLinecap="round"
         strokeLinejoin="round"
         aria-hidden="true"
      >
         <line x1="5" y1="12" x2="19" y2="12" />
         <polyline points="12 5 19 12 12 19" />
      </svg>
   );
}

export function PlusIcon({ size = 16, className }: IconProps) {
   return (
      <svg
         width={size}
         height={size}
         className={className}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth={2}
         strokeLinecap="round"
         aria-hidden="true"
      >
         <line x1="12" y1="5" x2="12" y2="19" />
         <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
   );
}

export function MinusIcon({ size = 16, className }: IconProps) {
   return (
      <svg
         width={size}
         height={size}
         className={className}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth={2}
         strokeLinecap="round"
         aria-hidden="true"
      >
         <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
   );
}
