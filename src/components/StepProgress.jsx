function StepProgress({ step, total }) {
  const percentage = Math.round((step / total) * 100);
  return (
    <div className="">
      <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
        {/* <span>
          Step {step} of {total}
        </span> */}
        {/* <span>{percentage}%</span> */}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default StepProgress;
