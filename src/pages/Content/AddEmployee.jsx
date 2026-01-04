import React, { useState } from "react";
import { Button, Form, Select, Card } from "antd";
import { UserAddOutlined, CalculatorOutlined } from "@ant-design/icons";
import BusinessAnalyst from "./EmployeeDetails/BusinessAnalyst";
import QualityAssuranc from "./EmployeeDetails/QualityAssuranc";
import DevopsEngineer from "./EmployeeDetails/DevopsEngineer";
import TechLead from "./EmployeeDetails/TechLead";
import BackendEngineer from "./EmployeeDetails/BackendEngineer";
import FrontendEngineer from "./EmployeeDetails/FrontendEngineer";
import FullStackEngineer from "./EmployeeDetails/FullStackEngineer";
import ProjectManager from "./EmployeeDetails/ProjectManager";

const { Option } = Select;

const AddEmployee = () => {
  const [data, setData] = useState("");

  const onValuesChange = (changedValues, allValues) => {
    setData(allValues.role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <UserAddOutlined className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Add Employee</h1>
          </div>
        </div>

        {/* KPI Formula Card */}
        <Card className="mb-6 border-2 border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <CalculatorOutlined className="text-2xl text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                KPI Calculation Formula
              </h3>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <div className="text-xl font-mono text-emerald-900 mb-2">
                  KPI Score = (P<sub className="text-sm">1</sub> × W
                  <sub className="text-sm">a</sub>) + (P
                  <sub className="text-sm">2</sub> × W
                  <sub className="text-sm">b</sub>) + (P
                  <sub className="text-sm">3</sub> × W
                  <sub className="text-sm">c</sub>) + ...
                </div>
                <p className="text-sm text-emerald-700 mt-2">
                  <span className="font-semibold">P</span> = Performance Index, 
                  <span className="font-semibold ml-2">W</span> = Weight for each criterion
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Role Selection Card */}
        <Card 
          className="mb-6 border-2 border-emerald-200 shadow-md"
          title={
            <span className="text-lg font-semibold text-emerald-800">
              Select Employee Role
            </span>
          }
        >
          <Form 
            name="common" 
            onValuesChange={onValuesChange} 
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="role"
              label={<span className="text-emerald-700 font-medium">Job Role</span>}
              rules={[
                {
                  required: true,
                  message: "Please Select a Role",
                },
              ]}
            >
              <Select 
                placeholder="--Select a Role--" 
                allowClear
                size="large"
                className="w-full"
              >
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
        </Card>

        {/* Dynamic Form Section */}
        <Card 
          className="border-2 border-emerald-200 shadow-md"
          title={
            <span className="text-lg font-semibold text-emerald-800">
              Employee Details
            </span>
          }
        >
          <div className="min-h-[200px]">
            {data === "BA" ? (
              <BusinessAnalyst />
            ) : data === "QA" ? (
              <QualityAssuranc />
            ) : data === "DE" ? (
              <DevopsEngineer />
            ) : data === "TL" ? (
              <TechLead />
            ) : data === "BE" ? (
              <BackendEngineer />
            ) : data === "FE" ? (
              <FrontendEngineer />
            ) : data === "FullE" ? (
              <FullStackEngineer />
            ) : data === "PM" ? (
              <ProjectManager />
            ) : (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="text-6xl text-emerald-300 mb-3">👆</div>
                  <p className="text-lg text-emerald-600 font-medium">
                    Please select a role from the dropdown above
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <style jsx>{`
        :global(.ant-select-selector) {
          border-color: #d1fae5 !important;
        }
        :global(.ant-select-selector:hover) {
          border-color: #10b981 !important;
        }
        :global(.ant-select-focused .ant-select-selector) {
          border-color: #059669 !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1) !important;
        }
        :global(.ant-card-head) {
          background: linear-gradient(to right, #d1fae5, #a7f3d0);
          border-bottom: 2px solid #10b981;
        }
      `}</style>
    </div>
  );
};

export default AddEmployee;