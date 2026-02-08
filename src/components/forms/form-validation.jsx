import { Loader2 } from "lucide-react";

function SubmitButton({ isSubmitting, defaultMessage }) {
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ${
        isSubmitting
          ? "bg-[#4CAF50]/50"
          : "bg-[#4CAF50] hover:bg-[#3e8e41] cursor-pointer"
      }`}
    >
      {isSubmitting ? <Loader2 className="animate-spin" /> : defaultMessage}
    </button>
  );
}

function DisplayErrorMessage({ message }) {
  const parts = message.split(/(?= -)/);

  return (
    <div className="flex flex-col text-[#B3251E] text-xs">
      <div className="flex items-center ml-1">
        <span>{parts[0]}</span>
      </div>
      <div className="ml-4">
        {parts.slice(1).map((part, index) => (
          <span key={index} className="block">
            {part}
          </span>
        ))}
      </div>
    </div>
  );
}

export { SubmitButton, DisplayErrorMessage };
