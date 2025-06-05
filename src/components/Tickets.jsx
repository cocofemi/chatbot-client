import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

function Tickets({ nextStep, prevStep }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      tickets: [{ name: "", price: "", quantity: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  });

  const [tickets, setTickets] = useState([
    { name: "", price: "", quantity: "", ref: React.createRef() },
  ]);

  const handleAddTicket = () => {
    setTickets([
      ...tickets,
      { name: "", price: "", quantity: "", ref: React.createRef() },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...tickets];
    updated[index][field] = value;
    setTickets(updated);
  };

  const handleRemoveTicket = (index) => {
    // const updated = tickets.filter((_, index) => index !== indexToRemove);
    // setTickets(updated);
    if (fields.length > 1) {
      remove(index);
    }
  };
  useEffect(() => {
    if (tickets.length > 1) {
      const lastRef = tickets[tickets.length - 1].ref;
      if (lastRef?.current) {
        lastRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [tickets]);

  const onSubmit = (data) => {
    const { tickets } = data;
    const existing = JSON.parse(localStorage.getItem("dc-formData")) || [];
    existing.push(tickets);

    localStorage.setItem("dc-formData", JSON.stringify(existing));
  };

  // console.log(tickets);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Ticket Information
      </h2>
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(40vh - 1rem)" }}
      >
        {fields.map((ticket, index) => (
          <div
            key={index}
            ref={ticket.ref}
            className="grid grid-cols-2 gap-4 mb-6 border-b pb-4 "
          >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                {...register(`tickets.${index}.name`, { required: true })}
                type="text"
                placeholder="Enter ticket name"
                // value={ticket.name}
                // onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price
              </label>
              <input
                {...register(`tickets.${index}.price`, { required: true })}
                type="number"
                placeholder="Enter price"
                // value={ticket.price}
                // onChange={(e) => handleChange(index, "price", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Quantity
              </label>
              <input
                {...register(`tickets.${index}.quantity`, { required: true })}
                type="number"
                placeholder="Enter quantity"
                // value={ticket.quantity}
                // onChange={(e) =>
                //   handleChange(index, "quantity", e.target.value)
                // }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTicket(index)}
                className="mt-2 inline-block px-4 py-2 bg-red-400 hover:bg-red-600 text-white rounded cursor-pointer"
              >
                ✖ Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        // onClick={handleAddTicket}
        onClick={() => append({ name: "", price: "", quantity: "" })}
        disabled={!isValid}
        className={`mt-2 inline-block px-4 py-2 
          ${
            isValid
              ? "bg-purple-500 hover:bg-purple-700 text-white rounded hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          } `}
      >
        ➕ Add Another Ticket
      </button>

      <div className="flex justify-between mt-6">
        <button
          type="submit"
          onClick={prevStep}
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 cursor-pointer"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!isValid}
          onClick={nextStep}
          className={`text-white py-2 px-4 rounded ${
            isValid
              ? "bg-purple-500 hover:bg-purple-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default Tickets;
