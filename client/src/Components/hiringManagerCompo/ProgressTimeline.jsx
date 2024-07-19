import React from 'react';

const ProgressTimeline = ({applicationExists}) => {
  //console.log('ProgressLine',applicationExists[0].isHired);
  let a = 0;

  if (applicationExists.length === 0) {
    a = 0; // not started evaluation
  } else if (applicationExists.length > 0) {
    const app = applicationExists[0];
    if (app.isHired) {
      a = 4; // hired
    } else if (app.hiringManagerComment !== '') {
      a = 3; // only hiring manager feedbacked
    } else if (app.recruiterComment !== '' && app.hiringManagerComment === '') {
      a = 2; // interviewer and recruiter feedbacked
    } else if (app.interviewercomments !== '' && app.recruiterComment === '' && app.hiringManagerComment === '') {
      a = 1; // started evaluation only interviewer feedbacked
    }
  }

  let status;
    if (applicationExists.length === 0 || applicationExists[0] === undefined) {
      status = 'waiting for Approval';
    } else if (applicationExists[0].isHired === undefined) {
      status = 'waiting for Approval';
    } else {
      status = applicationExists[0].isHired ? 'Hired' : 'Rejected';
    }

  return (
    <div className="flex justify-center">
    <div >
      
        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
            <span className="text-xs text-gray-500 dark:text-neutral-400">24/12/2023</span>
          </div>
          <div className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-[3px] after:-translate-x-[0.5px]  ${ a === 1 || a === 2 || a === 3 ||a ===4 ? ' dark:after:bg-orange-600 after:bg-orange-600' : 'dark:after:bg-neutral-700 after:bg-gray-200'}`}>
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 0 || a === 1 || a === 2 || a === 3 ||a ===4 ? 'ring-[#eb7323]' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-400 dark:text-white">
            Interview Completed
            </h3>
            <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
            </button>
          </div>
        </div>

        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
            <span className="text-xs text-gray-500 dark:text-neutral-400">25/12/2023</span>
          </div>
          <div className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-[3px] after:-translate-x-[0.5px] ${ a === 2 || a === 3 ||a ===4 ? ' dark:after:bg-orange-600 after:bg-orange-600 ' : 'dark:after:bg-neutral-700 after:bg-gray-200'}`}>
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 1 || a === 2 || a === 3 || a===4 ? 'ring-orange-600' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-400 dark:text-white">
            Interviewer Review
            </h3>
            <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
            </button>
          </div>
        </div>
        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
            <span className="text-xs text-gray-500 dark:text-neutral-400">27/12/2023</span>
          </div>
          <div className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-[3px] after:-translate-x-[0.5px]  ${ a === 3 || a===4 ? ' dark:after:bg-[#eb7323] after:bg-orange-600' : 'dark:after:bg-neutral-700 after:bg-gray-200'}`}>
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 2 || a === 3 || a===4 ? 'ring-orange-600' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-400 dark:text-white">
            Recruiter Review
            </h3>
            <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
            </button>
          </div>
        </div>
        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
            <span className="text-xs text-gray-500 dark:text-neutral-400">27/12/2023</span>
          </div>
          <div className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-[3px] after:-translate-x-[0.5px]  ${a ===4  ? ' dark:after:bg-[#eb7323] after:bg-orange-600' : 'dark:after:bg-neutral-700 after:bg-gray-200'}`}>
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 3 ||a ===4  ? 'ring-orange-600' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-400 dark:text-white">
            Hiring Manager Review
            </h3>
            <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
            </button>
          </div>
        </div>
        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
           
          </div>
          <div className="relative last:after:hidden  dark:after:bg-neutral-700">
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 4 ? 'ring-orange-600' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-400 dark:text-white">
            {status}
            </h3>
          </div>
        </div>
      
    </div>
    </div>
  );
};

export default ProgressTimeline;