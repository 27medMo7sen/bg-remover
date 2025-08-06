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
    <div className="w-full px-4 sm:px-6 md:px-8 flex justify-center items-center flex-col mb-24">
      {/* Title */}
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#353535] to-[#9B9B9B] text-transparent bg-clip-text max-w-[90%] sm:max-w-[600px] leading-snug">
        Steps to remove background image in seconds
      </p>

      {/* Steps */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-10 w-full justify-center items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center w-full sm:w-auto shadow-lg p-4 rounded-lg hover:bg-gray-50 transition duration-300 max-w-sm"
          >
            <div className="text-2xl bg-gradient-to-r from-[#7649FF] to-[#FF4CF6] text-white p-3 rounded-lg">
              {step.icon}
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-base sm:text-lg">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
