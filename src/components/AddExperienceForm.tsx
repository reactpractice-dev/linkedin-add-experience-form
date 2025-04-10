import { FormEventHandler } from "react";
import { JobExperience } from "../types";

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
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const newExperience = Object.fromEntries(data);
    console.log(newExperience);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            name="job_title"
            placeholder="Ex: Retail Sales Manager"
            className="p-2 border-1 border-gray-500 rounded"
          ></input>
        </label>
        <label className="flex flex-col gap-1">
          <span>Employment type</span>
          <select
            name="employment_type"
            className="p-2 border-1 border-gray-500 rounded"
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
            name="company"
            placeholder="Ex: Microsoft"
            className="p-2 border-1 border-gray-500 rounded"
          ></input>
        </label>
        <label className="flex flex-row gap-1">
          <input type="checkbox" name="is_current"></input>
          <span>I am currently working in this role</span>
        </label>
        <div className="flex flex-col gap-1">
          <span>Start date*</span>
          <div className="flex gap-2">
            <select
              name="start_date.month"
              className="p-2 border-1 border-gray-500 rounded w-1/2"
            >
              {MONTH_OPTIONS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="start_date.year"
              className="p-2 border-1 border-gray-500 rounded w-1/2"
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
              name="end_date.month"
              className="p-2 border-1 border-gray-500 rounded w-1/2"
            >
              {MONTH_OPTIONS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="end_date.year"
              className="p-2 border-1 border-gray-500 rounded w-1/2"
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
