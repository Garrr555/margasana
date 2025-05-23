import { FcGoogle } from "react-icons/fc";

export default function GoogleBtn({ onClick }: any) {
  return (
    <div>
      <button
        type="button"
        className="w-full border border-accent text-third py-2 rounded-xl hover:bg-accent-hover flex justify-center items-center font-bold"
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
