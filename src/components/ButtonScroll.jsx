import { useEffect, useRef, useState } from "react";

function ButtonScroll() {
  const [atBottom, setAtBottom] = useState(false);

  const scrollRef = useRef(null);
  const inputRefs = useRef([]);
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
  return (
    <>
      {!atBottom && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollDown}
            className="text-sm underline mt-2 
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
    </>
  );
}

export default ButtonScroll;
