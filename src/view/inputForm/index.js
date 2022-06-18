import { Formik, Form } from "formik";
import React, { useCallback } from "react";
import * as Yup from "yup";
import Select from "react-select";
import List from "../list/List";
import { useDispatch } from "react-redux";
import * as _ from "lodash";
import { FETCH_DATA } from "../../action";
import cuid from "cuid";


const InputFormSchema = Yup.object({
    firstName: Yup.string().required("First name is required")
})


const InputForm = () => {

    const dispatch = useDispatch();

    const listData = useCallback((data) => {
        const allData = {
            listData: data,
            id: cuid()
        }
        dispatch({ type: FETCH_DATA, payload: allData })
    }, [])

    return (
        <main className="input-form_main">
            <div className="main-page--wrapper">
                <div className="input-form--wrapper">
                    <Formik
                        initialValues={{ firstName: "", lastName: "", gender: "" }}
                        validationSchema={InputFormSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.gender.value === "Male") {
                                const genderwithListData = "Mr." + values.firstName + " " + values.lastName
                                listData(genderwithListData);
                            } else if (values.gender.value === "Female") {
                                const genderwithListData = "Mrs." + values.firstName + " " + values.lastName
                                listData(genderwithListData);
                            } else {
                                const genderwithListData = values.firstName + " " + values.lastName
                                listData(genderwithListData);
                            }
                            setSubmitting(false);

                        }}
                    >
                        {
                            ({ values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting }) => {
                                return (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="input-form--block">
                                            <div className="input-form--content">
                                                <input
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    value={values.firstName}
                                                    onChange={handleChange}
                                                />
                                                {errors.firstName && touched.firstName ? <div className="error-text">{errors.firstName}</div> : null}
                                            </div>
                                            <div className="input-form--content">
                                                <input
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                    value={values.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="input-form--content">
                                                <Select
                                                    name="gender"
                                                    options={[
                                                        { label: "Male", value: "Male" },
                                                        { label: "Female", value: "Female" }
                                                    ]}
                                                    value={values.gender}
                                                    onChange={(val) => { setFieldValue('gender', val) }}
                                                />
                                            </div>
                                            <div>
                                                <button type="submit" disabled={isSubmitting} >
                                                    Submit
                                                </button>
                                            </div>

                                        </div>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </div>
                <div className="List-main__page">
                    <List />
                </div>
            </div>

        </main>
    )
}

export default InputForm;