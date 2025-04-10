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

const AddExperienceForm = ({ onSubmit }: Props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const newExperience = Object.fromEntries(data);
    console.log(newExperience);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-3">
      <label>
        <span>Title*</span>
        <input
          type="text"
          name="job_title"
          placeholder="Ex: Retail Sales Manager"
        ></input>
      </label>
      <label>
        <span>Employment type</span>
        <select name="employment_type">
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
      <label>
        <span>Company or organisation*</span>
        <input type="text" name="company" placeholder="Ex: Microsoft"></input>
      </label>
      <label>
        <input type="checkbox" name="is_current"></input>
        <span>I am currently working in this role</span>
      </label>
      <div>
        <span>Start date*</span>
        <div>
          <select name="start_date.month">
            {MONTH_OPTIONS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select name="start_date.year">
            {YEAR_OPTIONS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <span>End date*</span>
        <div>
          <select name="end_date.month">
            {MONTH_OPTIONS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select name="end_date.year">
            {YEAR_OPTIONS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default AddExperienceForm;
