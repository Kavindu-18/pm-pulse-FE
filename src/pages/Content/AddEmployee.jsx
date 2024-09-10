import React, { useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "../../apis/axiosInstance";

const AddEmployee = () => {
  const [loading, setLoading] = useState(false); // Added loading state
  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const res = await axios.post("employee/insert", {
        role: values.role,
        insert_json: {
          "Analytical Skills": values.Analytical_Skills,
          "Technical Proficiency": values.Communication_Skills,
          "Communication Skills": values.Communication_Skills,
          "Problem Solving Skills": values.Problem_Solving_Skills,
          "Years of experience in Business Analysis":
            values.Years_of_experience_in_Business_Analysis,
          "Experience of related Domain": values.experience,
          "Leadership/Team lead experience":
            values.Leadership_Team_lead_experience,
          "Bachelor's Degree": values.Bachelor_Degree,
          "Master's Degree": values.Master_Degree,
        },
      });
      console.log(res);
      Swal.fire(res.data.response, "", "success");
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Details Not Saved", "", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-2xl">Add Employee</div>
      <div className="mt-10">
        <Form name="common" onFinish={onFinish} autoComplete="off">
          <div className="flex flex-row justify-between">
            <Form.Item
              name="role"
              label="Role"
              rules={[
                {
                  required: true,
                  message: "Please Select a Role",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Role--" allowClear>
                <Option value="Business Analyst">Business Analyst</Option>
                <Option value="backend developer">Backend Developer</Option>
                <Option value="qa">qa</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Analytical Skills"
              name="Analytical_Skills"
              rules={[
                {
                  required: true,
                  message: "Please input Analytical Skills!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Technical Proficiency"
              name="Technical_Proficiency"
              rules={[
                {
                  required: true,
                  message: "Please input Technical Proficiency!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Communication Skills"
              name="Communication_Skills"
              rules={[
                {
                  required: true,
                  message: "Please input Communication Skills!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Problem Solving Skills"
              name="Problem_Solving_Skills"
              rules={[
                {
                  required: true,
                  message: "Please input Problem Solving Skills!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Years of experience in Business Analysis"
              name="Years_of_experience_in_Business_Analysis"
              rules={[
                {
                  required: true,
                  message:
                    "Please input Years of experience in Business Analysis!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="pb-3 font-bold text-lg">
            Experience of Related Domain (Add at least 4)
          </div>
          <div>
            {" "}
            <Form.List name="experience">
              {(
                experienceFields,
                { add: addExperience, remove: removeExperience }
              ) => (
                <>
                  {experienceFields.map((experienceField, experienceIndex) => (
                    <div key={experienceField.key}>
                      <div className="flex justify-between items-center pb-3">
                        <h4>Experience {experienceIndex + 1}</h4>
                        {experienceFields.length > 1 && (
                          <MinusCircleOutlined
                            onClick={() =>
                              removeExperience(experienceField.name)
                            }
                          />
                        )}
                      </div>
                      <Form.Item
                        {...experienceField}
                        name={[experienceField.name, "Domain"]}
                        fieldKey={[experienceField.fieldKey, "Domain"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input domain!",
                          },
                        ]}
                      >
                        <Select placeholder="--Select a Domain--" allowClear>
                          <Option value="Business Analyst">Health</Option>
                          <Option value="backend developer">
                            Backend Developer
                          </Option>
                          <Option value="qa">qa</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...experienceField}
                        name={[experienceField.name, "Years"]}
                        fieldKey={[experienceField.fieldKey, "Years"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input years of experience!",
                          },
                        ]}
                      >
                        <Input placeholder="Years" />
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => addExperience()}
                      icon={<PlusOutlined />}
                    >
                      Add Experience
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Leadership/Team lead experience"
              name="Leadership_Team_lead_experience"
              rules={[
                {
                  required: true,
                  message: "Please input Technical Proficiency!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Bachelor_Degree"
              label="Bachelor's Degree"
              rules={[
                {
                  required: true,
                  message: "Please Select a value",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Value--" allowClear>
                <Option value="related">Related</Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            {" "}
            <Form.Item
              name="Master_Degree"
              label="Master's Degree"
              rules={[
                {
                  required: true,
                  message: "Please Select a value",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Value--" allowClear>
                <Option value="related">Related</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
