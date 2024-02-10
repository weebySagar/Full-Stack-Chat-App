export const validateForm = (values) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!values.name?.trim()) {
        errors.name = 'Required';
        valid= false;
    }



    if (!emailRegex.test(values?.email)) {
        errors.email = "Invalid Email";
        valid= false;

    }



    if (!values?.phone) {
        errors.phone = 'Required'
        valid= false;

    }

    if (!values?.password) {
        errors.password = 'Required'
        valid= false;

    }

    return {errors,valid}
}
