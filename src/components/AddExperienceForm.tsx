import { JobExperience, PreviousJob } from "../types";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useEffect } from "react";

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

const JobSchema = z.object({
  job_title: z.string().min(1, { message: "⛔️ Title is a required field" }),
  employment_type: z.string(),
  company: z.string().min(1, {
    message: "⛔️ Company is a required field",
  }),
  start_date: z
    .object({
      month: z.string(),
      year: z.string(),
    })
    .required()
    .refine((data) => data.month && data.year, {
      message: "⛔️ Start date is a required field",
    }),
});

const CurrentJobSchema = JobSchema.extend({
  is_current: z.literal(true),
});

const PastJobSchema = JobSchema.merge(
  z.object({
    is_current: z.literal(false),
    end_date: z
      .object({
        month: z.string(),
        year: z.string(),
      })
      .required()
      .refine((data) => data.month && data.year, {
        message: "⛔️ Start and end dates are required",
      }),
  })
).refine(
  (data) => {
    const startDate = new Date(
      parseInt(data.start_date.year),
      parseInt(data.start_date.month)
    );
    const endDate = new Date(
      parseInt(data.end_date.year),
      parseInt(data.end_date.month)
    );

    return endDate > startDate;
  },
  {
    message: "⛔️ End date can’t be earlier than start date",
    path: ["end_date"],
  }
);

const JobExperienceSchema: ZodType<JobExperience> = z.union([
  CurrentJobSchema,
  PastJobSchema,
]);

const AddExperienceForm = ({ onSubmit, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<JobExperience>({
    resolver: zodResolver(JobExperienceSchema),
  });

  const isCurrent = watch("is_current");
  useEffect(() => {
    if (isCurrent === true) {
      setValue("end_date.month", "");
      setValue("end_date.year", "");
    }
  }, [isCurrent, setValue]);

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
          {errors.job_title && (
            <span className="text-red-400">{errors.job_title.message}</span>
          )}
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
          {errors.company && (
            <span className="text-red-400">{errors.company.message}</span>
          )}
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
              <option value="">Month</option>

              {MONTH_OPTIONS.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="p-2 border-1 border-gray-500 rounded w-1/2"
              {...register("start_date.year")}
            >
              <option value="">Year</option>
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {errors.start_date && (
            <span className="text-red-400">{errors.start_date.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span>End date*</span>
          <div className="flex gap-2">
            <select
              className="p-2 border-1 border-gray-500 rounded w-1/2 disabled:bg-gray-300"
              {...register("end_date.month")}
              disabled={isCurrent}
            >
              <option value="">Month</option>
              {MONTH_OPTIONS.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="p-2 border-1 border-gray-500 rounded w-1/2 disabled:bg-gray-300"
              {...register("end_date.year")}
              disabled={isCurrent}
            >
              <option value="">Year</option>
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {(errors as FieldErrors<PreviousJob>).end_date && (
            <span className="text-red-400">
              {(errors as FieldErrors<PreviousJob>).end_date?.message}
            </span>
          )}
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
