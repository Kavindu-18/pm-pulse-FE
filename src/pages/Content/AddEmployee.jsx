import React, { useState } from "react";
import { Button, Form, Select } from "antd";
import BusinessAnalyst from "./EmployeeDetails/BusinessAnalyst";

const { Option } = Select;

const AddEmployee = () => {
  const [data, setData] = useState("");

  const onValuesChange = (changedValues, allValues) => {
    setData(allValues.role);
  };

  return (
    <div>
      <div className="text-2xl">Add Employee</div>
      <div className="mt-10">
        <Form name="common" onValuesChange={onValuesChange} autoComplete="off">
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
              <Option value="BA">Business Analyst</Option>
              <Option value="QA">Quality Assurance</Option>
              <Option value="DE">DevOps Engineer</Option>
              <Option value="TL">Tech Lead</Option>
              <Option value="BE">Backend Engineer</Option>
              <Option value="FE">Frontend Engineer</Option>
              <Option value="FullE">FullStack Engineer</Option>
              <Option value="PM">Project Manager</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-8">
        {data === "BA" ? <BusinessAnalyst /> : <>Select a Role</>}
      </div>
    </div>
  );
};

export default AddEmployee;
