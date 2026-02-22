import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PhoneFrame({ children }: Props) {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-[375px] h-[812px] bg-card-light dark:bg-card-dark rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-gray-900 dark:border-gray-800">
        {children}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full z-20" />
      </div>
    </div>
  );
}
