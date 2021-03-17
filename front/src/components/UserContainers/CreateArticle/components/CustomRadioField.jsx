import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useField } from 'formik';

function CustomRadioField(props) {
    const [field, meta] = useField(props);

    return (
        <FormControlLabel
            {...field}
            {...meta}
            {...props}
        />
    );
}

export default CustomRadioField;