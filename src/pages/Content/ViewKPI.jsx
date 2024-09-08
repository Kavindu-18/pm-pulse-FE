import React, { useState } from "react";
import { Button, Form, Table, Select, Spin } from "antd";
import axios from "../../apis/axiosInstance";

const { Option } = Select;

const columns = [
  {
    title: "Employee ID",
    dataIndex: "EmpID",
    key: "empId",
  },
  {
    title: "KPI Value",
    dataIndex: "KPI",
    key: "kpi",
  },
  {
    title: "Role",
    dataIndex: "Role",
    key: "role",
  },
];

const ViewKPI = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const onFinish = async (values) => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const res = await axios.post("kpi/role", {
        domain: values.domain,
        role: values.role,
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
      <div className="text-2xl">Employee's KPI</div>
      <div className="mt-10">
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <div className="flex flex-row justify-between">
            <Form.Item
              name="domain"
              label="Domain"
              rules={[
                {
                  required: true,
                  message: "Please Select a Domain",
                },
              ]}
            >
              <Select placeholder="--Select a Domain--" allowClear>
                <Option value="Finance">Finance</Option>
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
            >
              <Select placeholder="--Select Role--" allowClear>
                <Option value="Business Analyst">Business Analyst</Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Table columns={columns} dataSource={data} loading={loading} />{" "}
      </div>
    </div>
  );
};

export default ViewKPI;
