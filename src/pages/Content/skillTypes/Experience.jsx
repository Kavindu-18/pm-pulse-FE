import React, { useState } from "react";
import { Button, Form, Table, Select, Spin, Input, Radio } from "antd";
import axios from "../../../apis/axiosInstance";
import Swal from "sweetalert2";

const Experience = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const [job, setJob] = useState(); // State to track selected job role
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChangeJob = (value) => {
    setJob(value); // Correctly update job state when a job role is selected
  };
  const onFinish = async (values) => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const res = await axios.post("kpi/crud", {
        operation: values.operation,
        role: values.role,
        crud_json: {
          type: "education",
          criteria: values.criteria,
          level: {
            Novice: values.Novice,
            Intermediate: values.Intermediate,
            Advanced: values.Advanced,
          },
          weight: values.weight / 100,
        },
      });
      console.log(res);

      Swal.fire(res.data.response, "", "success");
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
      Swal.fire(error.response, "", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {" "}
      <Form name="common" onFinish={onFinish} autoComplete="off">
        <div className="flex flex-row justify-between">
          <Form.Item
            name="operation"
            label="Operation"
            rules={[
              {
                required: true,
                message: "Please Select a Operation",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value="add">Add</Radio>
              <Radio value="delete">Delete</Radio>
              <Radio value="update">Update</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="role"
            label="Job Role"
            rules={[
              {
                required: true,
                message: "Please Select a Job Role",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Select
              onChange={onChangeJob}
              placeholder="--Select a Role--"
              allowClear
            >
              <Option value="Business Analyst">Business Analyst</Option>
              <Option value="Quality Assurance Engineer">
                Quality Assurance
              </Option>
              <Option value="DevOps Engineer">DevOps Engineer</Option>
              <Option value="Tech Lead">Tech Lead</Option>
              <Option value="Backend Engineer">Backend Engineer</Option>
              <Option value="Frontend Engineer">Frontend Engineer</Option>
              <Option value="FullStack Engineer">FullStack Engineer</Option>
              <Option value="Project Manager">Project Manager</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex flex-row justify-between">
          <Form.Item
            label="Criteria"
            name="criteria"
            rules={[
              {
                required: true,
                message: "Please input Criteria!",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="flex flex-row justify-between">
          <Form.Item
            name="1_2_years"
            label="1-2 Years"
            style={{ width: "30%" }}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="3_5_years"
            label="3-5 Years"
            style={{ width: "30%" }}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="5_+_Years" label="5+ Years" style={{ width: "30%" }}>
            <Input type="number" />
          </Form.Item>
        </div>
        <div className="flex flex-row justify-between">
          <Form.Item
            name="0_5_years"
            label="0-5 Years"
            style={{ width: "30%" }}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="6_14_years"
            label="6-14 Years"
            style={{ width: "30%" }}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="15_+_Years"
            label="15+ Years"
            style={{ width: "30%" }}
          >
            <Input type="number" />
          </Form.Item>
        </div>
        {(job === "Business Analyst" ||
          job === "Quality Assurance Engineer" ||
          job === "DevOps Engineer") && (
          <div className="flex flex-row justify-between">
            <Form.Item
              name="lead"
              label="Lead"
              style={{ width: "48%" }}
              rules={[{ required: true, message: "Please input a value!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="non_lead"
              label="Non Lead"
              style={{ width: "48%" }}
              rules={[{ required: true, message: "Please input a value!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </div>
        )}
        <Form.Item
          label="weight"
          name="weight"
          rules={[
            {
              required: true,
              message: "Please input weight!",
            },
          ]}
          style={{ width: "48%" }}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            CRUD Operation
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Experience;
