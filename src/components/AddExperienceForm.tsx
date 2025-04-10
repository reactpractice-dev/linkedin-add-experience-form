import { JobExperience } from "../types";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (newExperience: JobExperience) => void;
  onCancel: () => void;
};

const MONTH_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEAR_OPTIONS = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
).map((year) => year.toString());

const AddExperienceForm = ({ onSubmit, onCancel }: Props) => {
  const { register, handleSubmit } = useForm<JobExperience>({});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header className="flex justify-between items-center p-4 border-b-1 border-gray-300">
        <h2 className="text-2xl font-bold">Add Experience</h2>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded-2xl"
        >
          Close
        </button>
      </header>
      <div className="overflow-y-auto max-h-[calc(100vh_-_12rem)] flex flex-col gap-4 text-gray-600 text-sm py-3 p-4 ">
        <label className="flex flex-col gap-1">
          <span>Title*</span>
          <input
            type="text"
            placeholder="Ex: Retail Sales Manager"
            className="p-2 border-1 border-gray-500 rounded"
            {...register("job_title")}
          ></input>
        </label>
        <label className="flex flex-col gap-1">
          <span>Employment type</span>
          <select
            className="p-2 border-1 border-gray-500 rounded"
            {...register("employment_type")}
          >
            <option value="">Please select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Permanent">Permanent</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Freelance">Freelance</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Apprenticeship">Apprenticeship</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span>Company or organisation*</span>
          <input
            type="text"
            placeholder="Ex: Microsoft"
            className="p-2 border-1 border-gray-500 rounded"
            {...register("company")}
          ></input>
        </label>
        <label className="flex flex-row gap-1">
          <input type="checkbox" {...register("is_current")}></input>
          <span>I am currently working in this role</span>
        </label>
        <div className="flex flex-col gap-1">
          <span>Start date*</span>
          <div className="flex gap-2">
            <select
              className="p-2 border-1 border-gray-500 rounded w-1/2"
              {...register("start_date.month")}
            >
              {MONTH_OPTIONS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="p-2 border-1 border-gray-500 rounded w-1/2"
              {...register("start_date.year")}
            >
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span>End date*</span>
          <div className="flex gap-2">
            <select
              className="p-2 border-1 border-gray-500 rounded w-1/2"
              {...register("end_date.month")}
            >
              {MONTH_OPTIONS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="p-2 border-1 border-gray-500 rounded w-1/2"
              {...register("end_date.year")}
            >
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-end border-t-1 border-gray-300 p-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 font-semibold rounded-3xl cursor-pointer hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddExperienceForm;
