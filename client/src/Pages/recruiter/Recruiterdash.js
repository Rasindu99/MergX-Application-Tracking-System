import React from "react";
import CardL from "../../Components/recruitercomp/CardL";

export default function Recruiterdash() {
  console.log("Recruiterdash component rendered");
  return (
    <div>
      <div id="background" className="w-80 h-80vh rounded-3xl z-0 mt-24 mx-8">
        <div className="flex items-center justify-around mt-5">
          <CardL title="Candidates" value="10" />
          <CardL title="Applications" value="10" />
          <CardL title="Feedbacks" value="10" />
          <CardL title="Unread" value="02" />
        </div>
        <div className="flex items-center justify-around mt-5">
          <CardL title="Jobs" value="10" />
          <CardL title="Job Invitaions" value="10" />
          <CardL title="Status Updates" value="10" />
          <CardL title="New Applications" value="02" />
          <CardL title="New Feedbacks" value="02" />
          <CardL title="New Candidates" value="02" />
        </div>
      </div>
    </div>
  );
}
