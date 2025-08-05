import { LiaUploadSolid } from "react-icons/lia";
import { SiRemovedotbg } from "react-icons/si";
import { TfiDownload } from "react-icons/tfi";

const steps = [
  {
    title: "Upload Image",
    icon: <LiaUploadSolid />,
    description: "Select the image you want to edit.",
  },
  {
    title: "Remove Background",
    icon: <SiRemovedotbg />,
    description: "Use our tool to remove the background.",
  },
  {
    title: "Download Image",
    icon: <TfiDownload />,
    description: "Download the edited image.",
  },
];
export const Explaination = () => {
  return (
    <div className="bg-transparent flex justify-center items-center flex-col mb-24">
      <p className="text-4xl font-bold text-center bg-gradient-to-r from-[#353535] to-[#9B9B9B] text-transparent bg-clip-text w-[600px] ">
        Steps to remove background image in seconds
      </p>
      <div className="flex gap-8 mt-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center shadow-lg p-4 hover:bg-gray-100 transition duration-300"
          >
            <div className="text-2xl bg-gradient-to-r from-[#7649FF] to-[#FF4CF6] text-white p-2 rounded-lg">
              {step.icon}
            </div>
            <div className="ml-4">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
