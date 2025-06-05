import { useForm } from "react-hook-form";

function EventInfo({ prevStep, nextStep }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const currency = ["USD", "GBP", "NGN", "EUR", "CAD", "ZAR"];

  const onSubmit = (data) => {
    console.log(data);
    const existing = JSON.parse(localStorage.getItem("dc-formData")) || [];
    existing.push(data);

    localStorage.setItem("dc-formData", JSON.stringify(existing));
  };
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Event Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Booking Artist
            </label>
            <input
              {...register("artist", { required: true })}
              name="artist"
              type="text"
              placeholder="Enter artist name"
              className={`w-full border px-3 py-2 rounded ${
                errors.artist ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.artist && (
              <p className="text-red-500 text-sm mt-1">
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Location
            </label>
            <input
              {...register("location", { required: true })}
              type="text"
              name="location"
              placeholder="Enter location"
              className={`w-full border px-3 py-2 rounded ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">Location is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Venue
            </label>
            <input
              {...register("venue", { required: true })}
              type="text"
              name="venue"
              placeholder="Enter venue"
              className={`w-full border px-3 py-2 rounded ${
                errors.venue ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.venue && (
              <p className="text-red-500 text-sm mt-1">Venue is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Capacity
            </label>
            <input
              {...register("capacity", { required: true })}
              type="number"
              name="capacity"
              placeholder="Enter capacity"
              className={`w-full border px-3 py-2 rounded ${
                errors.capacity ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm mt-1">Capacity is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              {...register("date", { required: true })}
              type="date"
              name="date"
              className={`w-full border px-3 py-2 rounded ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">Date is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Currency
            </label>
            <select
              // value={window.day}
              // onChange={(e) => updateRow(index, "day", e.target.value)}
              {...register("currency")}
              name="currency"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currency.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
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
    </div>
  );
}

export default EventInfo;
