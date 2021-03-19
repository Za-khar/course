import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useField } from "formik";

function CustomRadioField(props) {
  const [field] = useField(props);

  return <FormControlLabel {...field} {...props} />;
}

export default CustomRadioField;
