import { useRef, useState, useEffect } from "react";
import ButtonScroll from "./ButtonScroll";
import dcTalent from "/images/DC-Talent.avif";

function Summary({ setStep }) {
  const [summary, setSummary] = useState(null);
  const [atBottom, setAtBottom] = useState(false);

  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      setAtBottom(isAtBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollDown = () => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = 200; // adjust as needed
      const maxScroll = el.scrollHeight - el.clientHeight;
      const newScrollTop = Math.min(el.scrollTop + scrollAmount, maxScroll);

      el.scrollTo({
        top: newScrollTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("dc-responseData");
    if (data) {
      setSummary(JSON.parse(data));
    }
  }, []);

  // console.log(summary.length);

  return (
    <>
      {summary != null ? (
        <div
          //   className="grid grid-cols-2 gap-4 mb-4 overflow-y-auto"
          ref={scrollRef}
          style={{ maxHeight: "calc(50vh - 1rem)", overflow: "auto" }}
        >
          {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">Summary</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {/* Event Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                🎤 Event Information
              </h2>
              <div className="text-sm space-y-2 text-gray-700">
                <p>
                  <strong>Name:</strong> {summary?.data?.name}
                </p>
                <p>
                  <strong>Email:</strong>
                  {summary?.data?.email}
                </p>
                <p>
                  <strong>Artist:</strong> {summary?.data?.artist}
                </p>
                <p>
                  <strong>Location:</strong> {summary?.data?.location}
                </p>
                <p>
                  <strong>Venue:</strong> {summary?.data?.venue}
                </p>
                <p>
                  <strong>Date:</strong> {summary?.data?.date}
                </p>
                <p>
                  <strong>Capacity:</strong>{" "}
                  {`${summary?.data?.capacity} guests`}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={summary.pdf}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                >
                  📄 Download PDF
                </a>
                <a
                  href={summary.excel}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                >
                  📊 Download Excel
                </a>
              </div>
            </div>

            {/* Budget Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                💼 Budget Summary
              </h2>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Gross Revenue:</strong>{" "}
                  {`${summary?.data?.currency} ${summary?.data.summary?.grossRevenue}`}
                </p>
                <p>
                  <strong>Total Expenses:</strong>{" "}
                  {`${summary?.data?.currency} ${summary?.data.summary?.totalExpenses}`}
                </p>
                <p
                  className={
                    summary?.data.summary?.netProfit < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  <strong>Net Profit:</strong>{" "}
                  {`${summary?.data?.currency} ${summary?.data.summary?.netProfit}`}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  📌 Top 3 Expenses
                </h3>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>{summary?.data.summary?.topExpenses[0]}</li>
                  <li>{summary?.data.summary?.topExpenses[1]}</li>
                  <li>{summary?.data.summary?.topExpenses[2]}</li>
                </ul>
              </div>

              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3 text-sm text-blue-800 italic rounded-md">
                🤖 {summary?.data?.summary?.aiInsight}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                setStep(1);
              }}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-gray-400 cursor-pointer w-[330px]"
            >
              Restart
            </button>
          </div>
          {!atBottom && (
            <button
              onClick={scrollDown}
              className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 bg-purple-500 hover:bg-purple-700 cursor-pointer text-white p-2 rounded-full shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Summary;
