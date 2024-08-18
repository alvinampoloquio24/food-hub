import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      onClick={handleBack}
      className=" absolute hover:underline hover:text-base-dark   p-4 text-2xl top-0"
    >
      <IoArrowBack className="text-2xl" />
    </div>
  );
};

export default BackButton;
