import { FcGoogle } from "react-icons/fc";

export default function GoogleBtn({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="w-full bg-accent text-primary py-2 rounded-xl hover:bg-accent-hover flex justify-center items-center"
        onClick={onClick}
      >
        <span className="font-bold text-2xl">
          <FcGoogle />
        </span>
        oogle
      </button>
    </div>
  );
}
