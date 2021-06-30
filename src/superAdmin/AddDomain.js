import React, { useState, useRef, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCoordinators } from './helper/coordinatorApiCalls';
import { createDomain } from './helper/domainApiCalls';


const Coordinator = () => {
    const ref = React.useRef();



    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        domainName: "",
        domainDescription: "",
        studentCoordinator: [],

        facultyCoordinator: [],
        photo: "",

        // photoField: "",
        loading: false,
        error: "",
        createdDomain: "",
        formData: new FormData()

    });


    const [coordinators, setCoordinators] = useState([])
    const [studentCoordinatorVal, setStudentCoordinatorVal] = useState("")
    const [facultyCoordinatorVal, setFacultyCoordinatorVal] = useState("")
    const {
        domainName,
        domainDescription,
        studentCoordinator,
        facultyCoordinator, photo, loading, error, createdDomain, formData
    } = values;


    const handleInputs = (e) => {
        let name = e.target.name;
        var value;
        value = name === "photo" ? e.target.files[0] : e.target.value;
        if (name === "studentCoordinator") {
            let a = []
            a.push(e.target.value)
            value = a;
            setStudentCoordinatorVal(e.target.value)
            // setValues({ ...setValues, studentCoordinatorVal: e.target.value })
        }
        else if (name === "facultyCoordinator") {
            let a = [];
            // facultyCoordinator.map(fc => {
            //     a.push(fc)
            // })
            a.push(e.target.value)
            value = a;

            setFacultyCoordinatorVal(e.target.value)
        }


        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, error: "", loading: true });

        createDomain(user._id, token, formData)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        domainName: "",
                        domainDescription: "",
                        studentCoordinator: [],
                        facultyCoordinator: [],
                        photo: "",
                        formData: new FormData(),
                        createdDomain: data.domain1.domainName,
                        loading: false,
                        error: ""
                    });

                    setFacultyCoordinatorVal("");
                    setStudentCoordinatorVal("");

                }
            })
            .catch(err => console.log(err));

        console.log(values)
    }

    const domainForm = () => {
        return (
            <form>
                Upload Image:
                <input
                    onChange={handleInputs}
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="choose a file"
                    ref={ref}
                />

                Domain Name:
                <input type="text" placeholder="Enter your name" name="domainName" value={domainName} onChange={handleInputs} />

                Description:
                <textarea name="domainDescription" placeholder="Description" id="description" cols="30"
                    rows="10" onChange={handleInputs}>{domainDescription}</textarea>

                <label for="studentCoordinator">Student Coordinator - 1</label>

                <select name="studentCoordinator" id="studentCoordinator" value={studentCoordinatorVal} onChange={handleInputs}>
                    <option value="">Select a student coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Student")
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
                                    </option>
                                );
                        })}
                </select>

                {/* <label for="studentCoordinator">Student Coordinator - 2</label> */}

                {/* <select name="studentCoordinator" id="studentCoordinator" value={studentCoordinatorVal} onChange={handleInputs}>
                    <option value="">Select a student coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Student")
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
                                    </option>
                                );
                        })}
                </select> */}


                <label for="facultyCoordinator">Faculty Coordinator </label>

                <select name="facultyCoordinator" id="facultyCoordinator" value={facultyCoordinatorVal} onChange={handleInputs}>
                    <option value="">Select a faculty coordinator</option>
                    {coordinators &&
                        coordinators.map((coordinator, index) => {
                            if (coordinator.coordinatorType === "Faculty")
                                return (
                                    <option key={index} value={coordinator._id}>
                                        {coordinator.coordinatorName}
                                    </option>
                                );
                        })}
                </select>

                <input type="submit" name="submit" onClick={onSubmit} />

            </form>

        )
    }

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdDomain ? "" : "none" }}
        >
            <h4>{createdDomain} created successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Domain creation failed</h4>
        </div>
    );





    const preload = () => {
        getCoordinators().then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCoordinators(data)



            }

        });
    };


    useEffect(() => {
        preload();
    }, []);
    return (
        <Base title="Coordinator creation page">

            {domainForm()}


            {successMessage()}
            {errorMessage()}
        </Base>
    )

}



export default Coordinator;
