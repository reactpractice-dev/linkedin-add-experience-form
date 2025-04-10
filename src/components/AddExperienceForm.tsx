import { JobExperience } from "../types";

type Props = {
  onSubmit: (newExperience: JobExperience) => void;
  onCancel: () => void;
};

const AddExperienceForm = ({ onSubmit }: Props) => {
  return <form>SOON YOU WILL ADD YOUR EXPERIENCE</form>;
};

export default AddExperienceForm;
