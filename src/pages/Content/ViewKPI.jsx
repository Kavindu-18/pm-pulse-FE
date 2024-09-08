import React, { useState } from "react";
import { Button, Form, Table, Select } from "antd";
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

const data = {};
const ViewKPI = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const onFinish = async (values) => {
    console.log(values);

    try {
      const res = await axios.post("kpi/role", {
        domain: values.domain,
        role: values.role,
      });
      console.log("res", res);
      setData(res.data.kpis);
    } catch (error) {}
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />;
      </div>
    </div>
  );
};

export default ViewKPI;
