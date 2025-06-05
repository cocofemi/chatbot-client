import React, { useState, useRef } from "react";
import Expenses from "./Expenses";
import Tickets from "./Tickets";
import Summary from "./Summary";
import StepProgress from "./StepProgress";
import { motion, AnimatePresence } from "framer-motion";
import dcTalent from "/images/DC-Talent.avif";
import EventInfo from "./EventInfo";
import { useForm } from "react-hook-form";

function BudgetForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // const [scrollPercent, setScrollPercent] = useState(0);
  // const formRef = useRef(null);

  // const handleScroll = () => {
  //   const el = formRef.current;
  //   const scrollTop = el.scrollTop;
  //   const scrollHeight = el.scrollHeight - el.clientHeight;
  //   const scrolled = (scrollTop / scrollHeight) * 100;
  //   setScrollPercent(scrolled);
  // };

  const stepVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const onSubmit = (data) => {
    console.log(data);
    const formData = localStorage.setItem(
      "dc-formData",
      JSON.stringify([{ name: data.name, email: data.email }])
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg w-[600px] p-8 rounded-lg">
        {/* Scroll Progress Bar */}
        {/* <div className="h-2 bg-gray-200 relative">
          <div
            className="h-2 bg-purple-600 transition-all duration-150"
            style={{ width: `${scrollPercent}%` }}
          />
        </div> */}
        <StepProgress step={step} total={5} />
        <div
          className="p-8 overflow-y-auto"
          // ref={formRef}
          // onScroll={handleScroll}
          // style={{ maxHeight: "calc(80vh - 2rem)" }}
        >
          <img src={dcTalent} className="h-[30px] w-[80px] mx-auto mb-2" />
          <h1 className="text-2xl text-center mb-6 font-bold text-gray-800">
            Budget Assistant
          </h1>

          <p className="text-center text-sm text-gray-500">Step {step} of 5</p>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Your Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.name && (
                        <span className="text-red-400">Name is required</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && (
                        <span className="text-red-400 ">Email is required</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid}
                    onClick={nextStep}
                    className={`mt-6 w-full text-white py-2 rounded ${
                      isValid
                        ? "bg-purple-500 hover:bg-purple-700 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <EventInfo prevStep={prevStep} nextStep={nextStep} />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Tickets nextStep={nextStep} prevStep={prevStep} />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Expenses nextStep={nextStep} prevStep={prevStep} />
              </motion.div>
            )}
            {step === 5 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Summary setStep={setStep} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default BudgetForm;
