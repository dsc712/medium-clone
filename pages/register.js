import react, {Component} from 'react';
import App from '../components/layouts/App';
import "./register.css"

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            formErrors: {
                name: "",
                email: "",
                password: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        let formErrors = {...this.state.formErrors};

        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 4 ? "minimum 4 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({formErrors:formErrors});

    }

    render() {
        return (
            <div className={"wrapper"}>

                <div className={"form-wrapper"}>
                    <form onSubmit={this.handleSubmit} noValidate>

                        <h1> Create Account</h1>
                        <div className={"name"}>
                            <label htmlFor="name">First Name</label>
                            <input
                                className={this.state.formErrors.name.length > 0 ? "error" : null}
                                placeholder=" Name"
                                type="text"
                                name="name"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {this.state.formErrors.name.length > 0 && (
                                <span className="errorMessage">{this.state.formErrors.name}</span>
                            )}
                        </div>
                        <div className="email">
                            <label htmlFor="eamil">Email</label>
                            <input
                                className={this.state.formErrors.email.length > 0 ? "error" : null}
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                                placeholder="Email"/>
                            {this.state.formErrors.email.length > 0 && (
                                <span className="errorMessage">{this.state.formErrors.email}</span>
                            )}
                        </div>

                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                className={this.state.formErrors.password.length > 0 ? "error" : null}
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                placeholder="Password"/>
                            {this.state.formErrors.password.length > 0 && (
                                <span className="errorMessage">{this.state.formErrors.password}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit" >Create Account</button>
                            <small >
                                <a href="/login">Already Have an Account?</a></small>
                        </div>
                    </form>

                </div>

            </div>
        )

    }
}

export default Register;