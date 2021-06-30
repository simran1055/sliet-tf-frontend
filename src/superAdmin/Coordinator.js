import React, { useState, useRef } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCoordinator } from './helper/coordinatorApiCalls';

const Coordinator = () => {
    const ref = React.useRef();



    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        coordinatorName: "",
        coordinatorPhone: "",
        coordinatorEmail: "",
        coordinatorDesignation: "",
        coordinatorType: "",
        photo: "",
        // photoField: "",
        loading: false,
        error: "",
        createdCoordinator: "",
        formData: new FormData()

    });

    const {
        coordinatorName,
        coordinatorPhone,
        coordinatorEmail,
        coordinatorDesignation,
        coordinatorType, photo, loading, error, createdCoordinator, formData
    } = values;


    const handleInputs = (e) => {
        let name = e.target.name;
        var value;
        if (name === "photo") {
            value = e.target.files[0];
            // let photoField1 = value
            // setValues({ ...values, photoField: photoField1 });
        } else {
            value = e.target.value;
        }
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        createCoordinator(user._id, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        coordinatorName: "",
                        coordinatorPhone: "",
                        coordinatorEmail: "",
                        coordinatorDesignation: "",
                        coordinatorType: "",
                        photo: "",
                        formData: new FormData(),
                        createdCoordinator: data.coordinator1.coordinatorName,
                        loading: false,
                        error: ""
                    });

                }
            })
            .catch(err => console.log(err));

        console.log(values)
    }

    const coordinatorForm = () => {
        return (
            <form>
                <table>

                    <tr>
                        <td><label>Coordinator Name</label></td>
                        <td><input type="text" name="coordinatorName"
                            value={coordinatorName}
                            onChange={handleInputs}
                            placeholder="Enter your name"
                        /></td>
                    </tr>

                    <tr>
                        <td><label>Phone Number</label></td>
                        <td><input type="tel" name="coordinatorPhone" id="phone"
                            value={coordinatorPhone}
                            onChange={handleInputs}
                            placeholder="Enter your number"
                        /></td>
                    </tr>
                    <tr>
                        <td><label>Email</label></td>
                        <td><input type="email" name="coordinatorEmail"
                            value={coordinatorEmail}
                            onChange={handleInputs}
                            placeholder="Enter your email"
                        /></td>
                    </tr>
                    <tr>
                        <td><label>Coordinator Type</label></td>
                        <td><select name="coordinatorType" id="coordinatorType" value={coordinatorType} onChange={handleInputs}>
                            <option value="">Select Coordinator Type</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Student">Student</option>

                        </select></td>
                    </tr>
                    <tr>
                        <td><label>Designation</label></td>
                        <td><input type="text" name="coordinatorDesignation"
                            value={coordinatorDesignation}
                            onChange={handleInputs}
                            placeholder="Enter your designation"
                        /></td>
                    </tr>
                    <tr>

                        <input
                            onChange={handleInputs}
                            type="file"
                            name="photo"
                            accept="image"
                            placeholder="choose a file"
                            ref={ref}
                        />
                    </tr>
                </table >

                <div>
                    <input type="submit" onClick={onSubmit} />
                </div>
            </form >

        )
    }
    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdCoordinator ? "" : "none" }}
        >
            <h4>{createdCoordinator} created successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Coordinator creation failed</h4>
        </div>
    );

    return (
        <Base title="Coordinator creation page">
            {coordinatorForm()}

            {successMessage()}
            {errorMessage()}
        </Base>
    )

}



export default Coordinator;
