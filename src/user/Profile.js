import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { getUser, updateUser } from './helper/userapicalls';

const Profile = () => {
    const [values, setValues] = useState({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        dob: new Date(),
        designation: "",
        collegeName: "",
        collegeAddress: "",
        courseEnrolled: "",
        whatsappPhoneNumber: "",
        telegramPhoneNumber: "",
        branchOfStudy: "",
        yearOfStudy: 0,
        loading: false,
        updated: false,
        error: "",

    });


    const [telegramPhoneNumberCheck, setTelegramPhoneNumberCheck] = useState(false);
    const [whatsappPhoneNumberCheck, setWhatsappPhoneNumberCheck] = useState(false);

    const {
        name,
        lastName,
        email,
        phone,
        dob,
        designation,
        collegeName,
        collegeAddress,
        courseEnrolled,
        branchOfStudy,
        yearOfStudy,
        whatsappPhoneNumber,
        telegramPhoneNumber,
        loading,
        updated,
        error,
    } = values;

    const { user, token } = isAuthenticated();
    const [userId, setUserId] = useState()
    // console.log(user);
    const preload = (userId, token) => {
        getUser(userId, token).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
                console.log(values)
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    designation: data.designation,
                    collegeName: data.collegeName,
                    collegeAddress: data.collegeAddress,
                    courseEnrolled: data.courseEnrolled,
                    branchOfStudy: data.branchOfStudy,
                    yearOfStudy: data.yearOfStudy,
                    whatsappPhoneNumber: data.whatsappPhoneNumber,
                    telegramPhoneNumber: data.telegramPhoneNumber,
                    dob: moment(data.dob).format('YYYY-MM-DD')
                });



            }
        })
    }
    useEffect(() => {
        preload(user._id, token);
        setUserId(user._id);


    }, [])
    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updated ? "" : "none" }}
        >
            <h4>Profile updated successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>profile updation failed</h4>
        </div>
    );

    const handleChange = key => event => {
        return setValues({ ...values, [key]: event.target.value })
    }
    const handleCheck = key => event => {
        if (key == "whatsappPhoneNumber") {

            if (whatsappPhoneNumberCheck == true) {
                setValues({ ...values, [key]: "" })
            } else {
                setValues({ ...values, [key]: phone })
            }

            setWhatsappPhoneNumberCheck(!whatsappPhoneNumberCheck);
        }
        if (key == "telegramPhoneNumber") {

            if (telegramPhoneNumberCheck == true) {
                setValues({ ...values, [key]: "" })
            } else {
                setValues({ ...values, [key]: phone })
            }
            setTelegramPhoneNumberCheck(!telegramPhoneNumberCheck);
        }

    }

    const onSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: "", loading: true, updated: false });

        updateUser(
            userId, token, {
            name,
            lastName,
            email,
            phone,
            dob,
            designation,
            collegeName,
            collegeAddress,
            courseEnrolled,
            branchOfStudy,
            yearOfStudy,
            whatsappPhoneNumber,
            telegramPhoneNumber
        }).then(data => {
            if (data.error) {
                setValues({
                    ...values, error: data.error, loading: false
                })
            } else {
                setValues({
                    ...values,
                    loading: false,
                    error: "",
                    updated: true,
                })
            }
        }).catch("user not updated")

    }
    const profileForm = () => {
        return (
            <form>
                <input type="text" placeholder="Name" value={name} onChange={handleChange("lastName")} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={handleChange("lastName")} />
                <input type="email" placeholder="email" value={email} onChange={handleChange("lastName")} />
                <input type="tel" placeholder="Phone no." value={phone} onChange={handleChange("phone")} />
                <input type="tel" placeholder="whatsapp Phone no." value={whatsappPhoneNumber} onChange={handleChange("whatsappPhoneNumber")} />
                <input type="checkbox" checked={phone == whatsappPhoneNumber} onClick={handleCheck("whatsappPhoneNumber")} /> same as phone
                <input type="tel" placeholder="telegram Phone no." value={telegramPhoneNumber} onChange={handleChange("telegramPhoneNumber")} />
                <input type="checkbox" checked={phone == telegramPhoneNumber} onClick={handleCheck("telegramPhoneNumber")} /> same as phone
                <input type="text" placeholder="designation" value={designation} onChange={handleChange("designation")} />
                <input type="date" placeholder="dob" value={dob.toString()} onChange={handleChange("dob")} />
                <input type="text" placeholder="College Name" value={collegeName} onChange={handleChange("collegeName")} />
                <input type="text" placeholder="College Address" value={collegeAddress} onChange={handleChange("collegeAddress")} />
                <input type="text" placeholder="Course Enrolled" value={courseEnrolled} onChange={handleChange("courseEnrolled")} />
                <input type="text" placeholder="branch Of Study" value={branchOfStudy} onChange={handleChange("branchOfStudy")} />
                <input type="number" min="1" placeholder="Year Of Study" value={yearOfStudy} onChange={handleChange("yearOfStudy")} />
                <input type="submit" value="update" onClick={onSubmit} />

            </form>)
    }


    return (
        <Base title="Profile page">
            This is profile page
            {
                profileForm()}
            {
                errorMessage()
            }{successMessage()

            }


        </Base>
    )
}

export default Profile
