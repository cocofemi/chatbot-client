import { useEffect, useRef, useState } from "react";
import { budgetSummary } from "../../services/budgetSummary";
import { HashLoader } from "react-spinners";
import dcTalent from "/images/DC-Talent.avif";

function Expenses({ prevStep, nextStep }) {
  const inputs = [
    {
      id: 1,
      label: "Venue",
      placeholder: "Enter venue cost?",
    },
    {
      id: 2,
      label: "Venue barricade",
      placeholder: "Enter venue barricade? ",
    },
    {
      id: 3,
      label: "Ticket Printing",
      placeholder: "Enter Ticket Printing? ",
    },
    {
      id: 4,
      label: "Box office Personnel",
      placeholder: "Enter Box office Personnel? ",
    },
    {
      id: 5,
      label: "Ushers",
      placeholder: "How much for ushers? ",
    },
    {
      id: 6,
      label: "Security",
      placeholder: "Security Cost? ",
    },
    {
      id: 7,
      label: "Audio Technician",
      placeholder: "Audio Technician cost? ",
    },
    {
      id: 8,
      label: "Lighting Technician",
      placeholder: "Lighting Technician cost? ",
    },
    {
      id: 9,
      label: "Stage Hands",
      placeholder: "Stange hands cost? ",
    },
    {
      id: 10,
      label: "Medical Cost",
      placeholder: "Enter medical cost? ",
    },
    {
      id: 11,
      label: "Lights?",
      placeholder: "Lights cost? ",
    },
    {
      id: 12,
      label: "Stage",
      placeholder: "Stage cost? ",
    },
    {
      id: 13,
      label: "Sound",
      placeholder: "Sound cost? ",
    },
    {
      id: 14,
      label: "Backline",
      placeholder: "Enter backline cost? ",
    },
    {
      id: 15,
      label: "Outdoor Posters",
      placeholder: "Outdoor posters cost? ",
    },
    {
      id: 16,
      label: "Radio Advertising",
      placeholder: "Radio Advertising cost? ",
    },
    {
      id: 17,
      label: "Digital Ads",
      placeholder: "Digital Ads cost? ",
    },
    {
      id: 18,
      label: "Artist Fee",
      placeholder: "Artist Fee cost? ",
    },
    {
      id: 19,
      label: "Flights",
      placeholder: "Stange hands cost? ",
    },
    {
      id: 20,
      label: "Accommodation",
      placeholder: "Enter accommodation cost? ",
    },
    {
      id: 21,
      label: "Catering",
      placeholder: "Catering cost? ",
    },
  ];
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const [expenses, setExpenses] = useState([]);
  const [atBottom, setAtBottom] = useState(false);
  const [loading, setloading] = useState(false);

  const scrollRef = useRef(null);
  const inputRefs = useRef([]);

  const handleExpenseChange = (label, value) => {
    setExpenses((prev) =>
      prev.some((exp) => exp.label === label)
        ? prev.map((exp) =>
            exp.label === label ? { ...exp, amount: value } : exp
          )
        : [...prev, { label, amount: value }]
    );
  };

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

  const onSubmit = () => {
    setloading(true);
    const existing = JSON.parse(localStorage.getItem("dc-formData")) || [];
    existing.push(expenses);

    localStorage.setItem("dc-formData", JSON.stringify(existing));

    let localData = JSON.parse(localStorage.getItem("dc-formData"));
    let sessionId = localStorage.getItem("chatbotSessionId");

    const parsedTickets = localData[2].map((ticket) => ({
      ...ticket,
      price: Number(ticket.price),
      quantity: Number(ticket.quantity),
    }));

    const parsedExpenses = localData[3].map((expense) => ({
      ...expense,
      amount: Number(expense.amount),
    }));

    const data = {
      sessionId,
      name: localData[0].name,
      email: localData[0].email,
      artist: localData[1].artist,
      location: localData[1].location,
      venue: localData[1].venue,
      capacity: Number(localData[1].capacity),
      date: localData[1].date,
      currency: localData[1].currency,
      tickets: parsedTickets,
      expenses: parsedExpenses,
    };

    console.log(data);
    budgetSummary(data)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("dc-responseData", JSON.stringify(res));
        const newSessionId =
          "session_" + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("chatbotSessionId", newSessionId);
        nextStep();
        setloading(false);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        setloading(false);
      });
  };
  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Expenses Information
      </h2>
      <div
        ref={scrollRef}
        className="grid grid-cols-2 gap-4 mb-4 overflow-y-auto"
        style={{ maxHeight: "calc(40vh - 1rem)" }}
      >
        {loading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
            <img
              src={dcTalent}
              alt="Loading Logo"
              className="w-24 h-auto mb-6"
            />
            <HashLoader
              className
              color="#8200db"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {inputs.map((item, index) => (
          <div
            className="mb-1"
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
          >
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {item.label}
            </label>
            <input
              type="number"
              onChange={(e) => {
                handleExpenseChange(item.label, e.target.value);
              }}
              placeholder={item.placeholder}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
      {!atBottom && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollDown}
            className="text-sm text-blue-600 underline mt-2 
        bg-purple-500 hover:bg-purple-700 rounded-2xl 
        text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-5 m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 cursor-pointer"
        >
          Back
        </button>
        <button
          // onClick={nextStep}
          type="submit"
          onClick={onSubmit}
          disabled={loading}
          className={`${
            loading && "bg-purple-300 cursor-not-allowed"
          } bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 cursor-pointer`}
        >
          Generate Summary
        </button>
      </div>
    </div>
  );
}

export default Expenses;
