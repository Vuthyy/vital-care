interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

export default function Input({ label, error, className, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 ml-4">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className={`w-full text-base bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:ring-2 outline-none placeholder-gray-400 transition-all ${
            error
              ? "ring-2 ring-red-500 focus:ring-red-500"
              : "focus:ring-blue-600"
          } ${className || ""}`}
        />
      </div>
    </div>
  );
}