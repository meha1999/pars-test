"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const NewReportForm = () => {
  const validationSchema = Yup.object({
    reportName: Yup.string().required("Report name is required"),
    simulationScenario: Yup.string().required(
      "Simulation scenario is required"
    ),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
        <Formik
          initialValues={{
            reportName: "",
            simulationScenario: "",
            startDate: "",
            endDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Handle form submission
            console.log(values);
          }}
        >
          {(formik) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="reportName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Report name
                </label>
                <Field
                  type="text"
                  id="reportName"
                  name="reportName"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.errors.reportName && formik.touched.reportName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.errors.reportName && formik.touched.reportName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.reportName}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="simulationScenario"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Simulation Scenario
                </label>
                <Field
                  as="select"
                  id="simulationScenario"
                  name="simulationScenario"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.errors.simulationScenario &&
                    formik.touched.simulationScenario
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select a scenario</option>
                  <option value="scenario1">Scenario 1</option>
                  <option value="scenario2">Scenario 2</option>
                </Field>
                {formik.errors.simulationScenario &&
                  formik.touched.simulationScenario && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.simulationScenario}
                    </div>
                  )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Start date
                </label>
                <Field
                  type="date"
                  id="startDate"
                  name="startDate"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.errors.startDate && formik.touched.startDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.errors.startDate && formik.touched.startDate && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.startDate}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  End date
                </label>
                <Field
                  type="date"
                  id="endDate"
                  name="endDate"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.errors.endDate && formik.touched.endDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.errors.endDate && formik.touched.endDate && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.endDate}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Generate
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewReportForm;
