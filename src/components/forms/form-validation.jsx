import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

function SubmitButton({ isSubmitting, pendingMessage, defaultMessage }) {
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2  ${
        isSubmitting
          ? `bg-[#4CAF50]/50`
          : `bg-[#4CAF50] hover:bg-[#3e8e41] cursor-pointer`
      } `}
    >
      {isSubmitting ? pendingMessage : defaultMessage}
    </button>
  );
}

function DisplayErrorMessage({ message }) {
  return (

    <div className="flex flex-col text-[#B3251E] text-xs">
    <div className="flex items-center ml-1">
      {/* <div className="w-3 h-3 ml-1 mr-1 rounded-full bg-[#B3251E] flex items-center justify-center">
        <FontAwesomeIcon
          icon={faExclamation}
          className="text-[12px] text-white "
        />
      </div> */}
      <span>{message.split(/(?= -)/)[0]}</span>
    </div>
    <div className="ml-4">
      {message.split(/(?= -)/).slice(1).map((part, index) => (
        <span key={index} className="block"> {part}</span>
      ))}
    </div>
  </div>
  );
}
export {SubmitButton, DisplayErrorMessage};
