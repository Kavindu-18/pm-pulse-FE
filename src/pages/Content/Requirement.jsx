import React from "react";
import { Button, Form, Input, message, Select } from "antd";
import Swal from "sweetalert2";
import axios from "../../apis/axiosInstance";

const Requirement = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const data = {
        Name: values.name,
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
      const res = await axios.post("save-data", {
        Name: values.name,
        // Num_of_stackholders:Num_of_stackholders,
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
      });

      localStorage.setItem("SearchPayload", JSON.stringify(data));
      Swal.fire("Details Saved", "", "success");
    } catch (error) {
      console.log(error);
    } finally {
      form.resetFields();
    }
  };

  return (
    <div>
      <div className="text-2xl">Requirements</div>
      <div className="mt-10">
        <Form name="common" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Project Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input project name",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Input type="text" />
          </Form.Item>
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
                <Option value="Django">Django</Option>
                <Option value="Flask">Flask</Option>
                <Option value="Spring Boot">Spring Boot</Option>
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
                <Option value="Angular">Angualr Js</Option>
                <Option value="Vue.js">Vue Js</Option>
                <Option value="Svelte">Svelte</Option>
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
                <Option value="E-Commerce">E-Commerce</Option>
                <Option value="Health">Health</Option>
                <Option value="Education">Education</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="ML Component"
              name="ML_Components"
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a ML Component--" allowClear>
                <Option value="Prediction Model">Prediction Model</Option>
                <Option value="Recommendation Engine">
                  Recommendation Engine
                </Option>
                <Option value="Classification Model">
                  Classification Model
                </Option>
                <Option value="Clustering Algorithm">
                  Clustering Algorithm
                </Option>
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
                <Option value="Payment Gateway">Payment Gateway</Option>
                <Option value="Appointment Booking">Appointment Booking</Option>
                <Option value="Product Catalog">Product Catalog</Option>
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
              <Select placeholder="--Select one--" allowClear>
                <Option value="MERN">MERN</Option>
                <Option value="LAMP">LAMP</Option>
                <Option value="Serverless">Serverless</Option>
              </Select>
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
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
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
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
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
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
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
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Potential Delay (In Days)"
              name="Date_Difference"
              rules={[
                {
                  required: true,
                  message: "Please input Shcedule Variance!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Expected Team Size"
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
              label="Expected Budget ($)"
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
            {/* <Form.Item
              label="Number of Stakeholders"
              name="Num_of_stackholders"
              rules={[
                {
                  required: true,
                  message: "Please input Stakeholders!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Input type="number" />
            </Form.Item> */}
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
