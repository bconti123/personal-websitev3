type IconProps = {
  name?: string | null;
  label?: string;
  className?: string;
};

function normalize(value?: string | null) {
  return (value || "").toLowerCase().trim();
}

function Icon({ name, label = "", className = "h-4 w-4" }: IconProps) {
  const key = normalize(name) || normalize(label);

  if (key.includes("github")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M12 .5a12 12 0 0 0-3.79 23.39c.6.12.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.82 1.31 3.5 1 .11-.77.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.19 0 0 1.01-.32 3.31 1.23a11.4 11.4 0 0 1 6.02 0c2.3-1.56 3.31-1.23 3.31-1.23.65 1.66.24 2.89.12 3.19.77.84 1.23 1.9 1.23 3.22 0 4.61-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.21v3.27c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
        />
      </svg>
    );
  }

  if (key.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001A2.5 2.5 0 0 1 4.98 3.5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.06c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.07V21h-4v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95V21h-4V9Z"
        />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-700"
    >
      {label.slice(0, 1).toUpperCase() || "?"}
    </span>
  );
}

export { Icon };
