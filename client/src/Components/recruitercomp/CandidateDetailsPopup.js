import React from "react";
import { IoMdClose } from "react-icons/io";
import { VscFilePdf } from "react-icons/vsc";

const CandidateDetailsPopup = ({
  isOpen,
  onClose,
  data,
  showAcceptButton,
  showRejectButton,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-[800px] border-orange-700 border-[1px]">
        <button
          className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
          onClick={onClose}
        >
          <IoMdClose className="text-white hover:text-red-700" />
        </button>
        <h2 className="text-xl font-bold mb-1">{data.name}</h2>

        <div className="flex">
          <div className="w-[35%] flex items-center justify-center">
            <img
              src={data.image}
              alt={data.name}
              className="w-40 h-40 rounded-full flex items-center justify-center border-4 border-white"
            />
          </div>

          <div
            className="rounded-[15px] text-left w-[65%] mt-5 p-7"
            style={{
              background: "linear-gradient(-180deg, rgba(234, 113, 34, 0.1) 5%, rgba(25, 25, 26, 1) 80%)",
            }}
          >
            <div className="w-full flex pb-2">
              <div className="w-1/2 text-white opacity-25">Name</div>
              <div className="text-white">{data.name}</div>
            </div>

            <div className="w-full flex  pb-2">
              <div className="w-1/2 text-white opacity-25">Email</div>
              <div className="text-white">{data.email}</div>
            </div>

            <div className="w-full flex pb-2">
              <div className="w-1/2 text-white opacity-25">Contact Number</div>
              <div className="text-white">{data.contactNumber}</div>
            </div>

            <div className="w-full flex pb-2">
              <div className="w-1/2 text-white opacity-25">Birthday</div>
              <div className="text-white">{data.birthday}</div>
            </div>

            <div className="w-full flex pb-2">
              <div className="w-1/2 text-white opacity-25">Experience</div>
              <div className="text-white">{data.experience}</div>
            </div>

            <div className="w-full pb-2">
              <div className="w-1/2 text-white opacity-25">Education</div>
              <div className="ml-4 text-white">
                {data.education.map((edu, index) => (
                  <p className="pb-1" key={index}>
                    {edu}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex">
          <div className="w-[75%] ml-5">
            <div className="w-[50%] flex pb-2 text-left">
              <div className="w-1/2 text-white opacity-25">
                Technical Skills
              </div>
              <div className="text-white">
                {data.skills.map((skill, index) => (
                  <p className="pb-1" key={index}>
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            <div className="w-[50%] pb-2 text-left">
              <div className="w-1/2 text-white opacity-25">Description</div>
              <div className="text-white ml-4">{data.description}</div>
            </div>
          </div>

          <div className="w-[25%] flex items-center justify- center">
            <div>
              <button>
                <VscFilePdf className="size-12" />
              </button>
            </div>
            <div className="text-white opacity-25 ml-5">CV</div>
          </div>
        </div>
        <div className="mt-4 ">
          {showRejectButton && (
            <button className="w-[100px] h-[50px] rounded-[10px] mr-5 bg-[#CC6600] bg-opacity-[0.16]">
              Reject
            </button>
          )}
          {showAcceptButton && (
            <button className="bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5">
              Accept
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPopup;
