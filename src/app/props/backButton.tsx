import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="flex gap-1 items-center py-8 cursor-pointer"
      onClick={handleBack}
    >
      <MdOutlineKeyboardBackspace />
      <p className="text-xl hover:underline hover:text-blue-600">Back</p>
    </div>
  );
};

export default BackButton;
