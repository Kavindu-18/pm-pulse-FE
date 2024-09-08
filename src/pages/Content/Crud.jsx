import React, { useState } from "react";
import { Button, Form, Table, Select, Spin, Input } from "antd";
import axios from "../../apis/axiosInstance";

const Crud = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const onFinish = async (values) => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const res = await axios.post("kpi/crud", {
        operation: values.operation,
        role: values.role,
        crud_json: {
          type: values.type,
          criteria: values.criteria,
          level: {
            Novice: values.Novice,
            Intermediate: values.Intermediate,
            Advanced: values.Advanced,
          },
          weight: values.weight,
        },
      });
      setData(res.data.kpis);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // End loading
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
            <Select placeholder="--Select a Operation--" allowClear>
              <Option value="add">Add</Option>
              <Option value="delete">Delete</Option>
              <Option value="update">Update</Option>
            </Select>
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
            <Select placeholder="--Select Role--" allowClear>
              <Option value="Business Analyst">Business Analyst</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex flex-row justify-between">
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please Select a Type",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Select placeholder="--Select a Value--" allowClear>
              <Option value="skills">Skills</Option>
            </Select>
          </Form.Item>
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
            name="Novice"
            label="Novice"
            rules={[
              {
                required: true,
                message: "Please Select a Type",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Intermediate"
            name="Intermediate"
            rules={[
              {
                required: true,
                message: "Please input Criteria!",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Input type="number" />
          </Form.Item>
        </div>
        <div className="flex flex-row justify-between">
          <Form.Item
            name="Advanced"
            label="Advanced"
            rules={[
              {
                required: true,
                message: "Please Select a Advanced",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Input type="number" />
          </Form.Item>
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
        </div>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            CRUD Operation
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Crud;
