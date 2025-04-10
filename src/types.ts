type Job = {
  job_title: string;
  employment_type: string;
  company: string;
  start_date: { month: string; year: string };
};

export type CurrentJob = Job & {
  is_current: true;
};

export type PreviousJob = Job & {
  is_current: false;
  end_date: { month: string; year: string };
};

export type JobExperience = CurrentJob | PreviousJob;
