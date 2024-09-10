import React from "react";
import { Button, Form, Input, message, Select } from "antd";
import Swal from "sweetalert2";

const Requirement = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    try {
      const payload = {
        Domain: values.domain,
        ML_Components: values.ML_Components,
        Backend: values.Backend,
        Frontend: values.Frontend,
        Core_Features: values.Core_Features,
        Tech_Stack: values.Tech_Stack,
        Mobile: Number(values.Mobile),
        Desktop: Number(values.Desktop),
        Web: Number(values.Web),
        IoT: Number(values.IoT),
        Date_Difference: Number(values.Date_Difference),
        Expected_Team_Size: Number(values.Expected_Team_Size),
        Expected_Budget: Number(values.Expected_Budget),
      };
      localStorage.setItem("SearchPayload", JSON.stringify(payload));
      Swal.fire("Details Saved", "", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-2xl">Home</div>
      <div className="mt-10">
        <Form name="common" onFinish={onFinish} autoComplete="off">
          <div className="flex flex-row justify-between">
            <Form.Item
              name="Backend"
              label="Backend Technology"
              rules={[
                {
                  required: true,
                  message: "Please Select a Backend Technology",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Technology--" allowClear>
                <Option value="Node.js">Node Js</Option>
                <Option value="Python">Python</Option>
                <Option value="Nest.js">Nest Js</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="Frontend"
              label="Frontend Technology"
              rules={[
                {
                  required: true,
                  message: "Please Select a Frontend Technology",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Technology--" allowClear>
                <Option value="React">React Js</Option>
                <Option value="Nest">Next Js</Option>
                <Option value="Vue">Vue Js</Option>
              </Select>
            </Form.Item>
          </div>
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
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Domain--" allowClear>
                <Option value="Finance">Finance</Option>
                <Option value="test">Test</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="ML Component"
              name="ML_Components"
              rules={[
                {
                  required: true,
                  message: "Please input ML Component!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a ML Component--" allowClear>
                <Option value="Prediction Model">Prediction Model</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Core Features"
              name="Core_Features"
              rules={[
                {
                  required: true,
                  message: "Please input Core Features!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Core Feature--" allowClear>
                <Option value="User Management">User Management</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Tech Stack"
              name="Tech_Stack"
              rules={[
                {
                  required: true,
                  message: "Please input Tech Stack!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Mobile"
              name="Mobile"
              rules={[
                {
                  required: true,
                  message: "Please input Mobile!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select one--" allowClear>
                <Option value="1">1 (Yes)</Option>
                <Option value="0">0 (No)</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Desktop"
              name="Desktop"
              rules={[
                {
                  required: true,
                  message: "Please input Desktop!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select one--" allowClear>
                <Option value="1">1 (Yes)</Option>
                <Option value="0">0 (No)</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Web"
              name="Web"
              rules={[
                {
                  required: true,
                  message: "Please input Web!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select one--" allowClear>
                <Option value="1">1 (Yes)</Option>
                <Option value="0">0 (No)</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="IoT"
              name="IoT"
              rules={[
                {
                  required: true,
                  message: "Please input IoT!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select one--" allowClear>
                <Option value="1">1 (Yes)</Option>
                <Option value="0">0 (No)</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Date_Difference"
              name="Date_Difference"
              rules={[
                {
                  required: true,
                  message: "Please input Date_Difference!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Expected_Team_Size"
              name="Expected_Team_Size"
              rules={[
                {
                  required: true,
                  message: "Please input Expected Team Size!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input type="number" />
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Expected_Budget"
              name="Expected_Budget"
              rules={[
                {
                  required: true,
                  message: "Please input Expected Budget!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input type="number" />
            </Form.Item>
          </div>

          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Requirement;
