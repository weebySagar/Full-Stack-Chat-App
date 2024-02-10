export const validateForm = (values) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;

    if (!values.name?.trim()) {
        errors.name = 'Required'
    }



    if (!emailRegex.test(values?.email)) {
        errors.email = "Invalid Email";
    }



    if (!values?.phone) {
        errors.phone = 'Required'
    }

    if (!values?.password) {
        errors.password = 'Required'
    }

    return errors
}
