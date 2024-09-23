import React, { useEffect, useState } from "react";
import axios from "../../apis/axiosInstance";
import { Spin, Button, Modal, Form, Input, Select, Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";

const RiskType = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewPayloadModalVisible, setIsViewPayloadModalVisible] =
    useState(false);
  const [form] = Form.useForm();
  const [currentPayload, setCurrentPayload] = useState(null);
  const [projectName, setProjectName] = useState();
  const [pending, setPending] = useState();
  const [isPending, setIsPending] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    const getProjects = async () => {
      const res = await axios.get("/get-projects");
      localStorage.setItem("projects", JSON.stringify(res.data));

      setProjectName(res.data);
      setPending(4);
    };
    getProjects();
  }, []);

  const reCalculate = () => {
    const payloadLocal = localStorage.getItem("SearchPayload");

    if (payloadLocal) {
      const payload = JSON.parse(payloadLocal);
      form.setFieldsValue(payload); // Set form values with the current payload
      setIsModalVisible(true); // Open the modal
    } else {
      console.log("No payload found in local storage.");
    }
  };

  const handleOk = async () => {
    setLoading(true);
    setIsModalVisible(false);
    try {
      const updatedPayload = await form.validateFields();
      // Ensure "Expected Budget" is a number
      updatedPayload.Expected_Budget = Number(updatedPayload.Expected_Budget);
      const res = await axios.post("risk", {
        Domain: updatedPayload.Domain,
        "ML Components": updatedPayload.ML_Components,
        Backend: updatedPayload.Backend,
        Frontend: updatedPayload.Frontend,
        "Core Features": updatedPayload.Core_Features,
        "Tech Stack": updatedPayload.Tech_Stack,
        Mobile: updatedPayload.Mobile,
        Desktop: updatedPayload.Desktop,
        Web: updatedPayload.Web,
        IoT: updatedPayload.IoT,
        Date_Difference: updatedPayload.Date_Difference,
        "Expected Team Size": updatedPayload.Expected_Team_Size,
        "Expected Budget": updatedPayload.Expected_Budget,
      });

      setData(res.data);
      localStorage.setItem("SearchPayload", JSON.stringify(updatedPayload));
    } catch (error) {
      console.log("Validation Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    setPending(3);
    const projects = localStorage.getItem("projects");
    const parsedPrj = JSON.parse(projects) || [];
    const selectedProject = parsedPrj.filter((prj) => prj.Name === values.name);

    console.log(selectedProject[0]);

    localStorage.setItem("SearchPayload", JSON.stringify(selectedProject[0]));

    const payload = selectedProject[0];
    if (payload) {
      try {
        const res = await axios.post("risk", {
          Domain: payload.Domain,
          "ML Components": payload.ML_Components,
          Backend: payload.Backend,
          Frontend: payload.Frontend,
          "Core Features": payload.Core_Features,
          "Tech Stack": payload.Tech_Stack,
          Mobile: payload.Mobile,
          Desktop: payload.Desktop,
          Web: payload.Web,
          IoT: payload.IoT,
          Date_Difference: payload.Date_Difference,
          "Expected Team Size": payload.Expected_Team_Size,
          "Expected Budget": payload.Expected_Budget,
        });
        setData(res.data);
        setPending(1);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error parsing payload:", error);
      } finally {
        setLoading(false); // Set loading to false once data fetching is done
      }
    } else {
      setLoading(false); // Set loading to false if no payload is found
    }
  };

  const handleViewPayload = () => {
    const payloadLocal = localStorage.getItem("SearchPayload");
    if (payloadLocal) {
      setCurrentPayload(JSON.parse(payloadLocal));
      setIsViewPayloadModalVisible(true);
    } else {
      console.log("No payload found in local storage.");
    }
  };

  const handleCloseViewPayloadModal = () => {
    setIsViewPayloadModalVisible(false);
  };

  const handlePending = (action) => {
    setIsPending(action);
  };
  const handleApprove = (action) => {
    if (action) {
      alert("true");
    } else {
      alert("false");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl">Risk Analysis</div>
        <div>
          <Button onClick={reCalculate} type="primary" className="mr-2">
            Re Calculate
          </Button>
          <Button onClick={handleViewPayload} type="default">
            View Current Payload
          </Button>
        </div>
      </div>
      <div className=" mt-10">
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <div className="flex flex-row">
            <Form.Item
              name="name"
              label="Project Name"
              rules={[
                {
                  required: true,
                  message: "Please Select a Project Name",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Project--" allowClear>
                {projectName?.map((prj) => (
                  <Option value={prj.Name}>{prj.Name}</Option>
                ))}
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

        <div>
          Project Status :{" "}
          {pending === 1 ? (
            <Tag color="success">Approved</Tag>
          ) : pending === 2 ? (
            <>
              <Tag color="warning">Pending</Tag>

              <div className="pt-4">
                <Button onClick={() => handlePending(true)} type="primary">
                  Approve / Decline
                </Button>
              </div>
            </>
          ) : pending === 3 ? (
            <Tag icon={<SyncOutlined spin />} color="processing">
              processing
            </Tag>
          ) : (
            <Tag color="error">Select a Project</Tag>
          )}
        </div>
      </div>
      <div className="mt-10">
        {loading ? (
          <Spin />
        ) : data ? (
          <div>
            <h2 className="text-lg mb-5">
              Risk Level : <span className="text-xl">{data.mitigation}</span>
            </h2>

            <p
              dangerouslySetInnerHTML={{
                __html: data.risk
                  ? data.risk
                      .replace(
                        /###\s*(.*)/g,
                        "<strong style='font-size: 1.2em; margin-bottom: 16px; display: block;'>$1</strong>"
                      ) // Make headers bold and larger
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Replace **bold text** with <strong> tags
                      .replace(
                        /(\d+\.\s.*)/g,
                        "<div style='font-size: 1em; margin-bottom: 8px;'>$1</div>"
                      ) // Change font size for sentences with numbers and display them block-level
                  : "No Risk Data Available",
              }}
            ></p>
          </div>
        ) : (
          "No Data Found! Please Provide Data"
        )}
      </div>

      <Modal
        title="Edit Payload"
        open={isModalVisible}
        onOk={handleOk}
        okText={"Re Calculate Values"}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="Domain"
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
              <Option value="E-Commerce">E-Commerce</Option>
              <Option value="Health">Health</Option>
              <Option value="Education">Education</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="ML_Components"
            label="ML Components"
            rules={[
              {
                required: true,
                message: "Please input ML Component!",
              },
            ]}
          >
            <Select placeholder="--Select a ML Component--" allowClear>
              <Option value="Prediction Model">Prediction Model</Option>
              <Option value="Recommendation Engine">
                Recommendation Engine
              </Option>
              <Option value="Classification Model">Classification Model</Option>
              <Option value="Clustering Algorithm">Clustering Algorithm</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Backend"
            label="Backend Technology"
            rules={[
              {
                required: true,
                message: "Please Select a Backend Technology",
              },
            ]}
          >
            <Select placeholder="--Select a Technology--" allowClear>
              <Option value="Node.js">Node.js</Option>
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
          >
            <Select placeholder="--Select a Technology--" allowClear>
              <Option value="React">React.js</Option>
              <Option value="Angular">Angular.js</Option>
              <Option value="Vue.js">Vue.js</Option>
              <Option value="Svelte">Svelte</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Core_Features"
            label="Core Features"
            rules={[
              {
                required: true,
                message: "Please input Core Features!",
              },
            ]}
          >
            <Select placeholder="--Select a Core Feature--" allowClear>
              <Option value="User Management">User Management</Option>
              <Option value="Payment Gateway">Payment Gateway</Option>
              <Option value="Appointment Booking">Appointment Booking</Option>
              <Option value="Product Catalog">Product Catalog</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Tech_Stack"
            label="Tech Stack"
            rules={[
              {
                required: true,
                message: "Please input Tech Stack!",
              },
            ]}
          >
            <Select placeholder="--Select one--" allowClear>
              <Option value="MERN">MERN</Option>
              <Option value="LAMP">LAMP</Option>
              <Option value="Serverless">Serverless</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Mobile"
            label="Mobile"
            rules={[
              {
                required: true,
                message: "Please input Mobile!",
              },
            ]}
          >
            <Select placeholder="--Select one--" allowClear>
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Desktop"
            label="Desktop"
            rules={[
              {
                required: true,
                message: "Please input Desktop!",
              },
            ]}
          >
            <Select placeholder="--Select one--" allowClear>
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Web"
            label="Web"
            rules={[
              {
                required: true,
                message: "Please input Web!",
              },
            ]}
          >
            <Select placeholder="--Select one--" allowClear>
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="IoT"
            label="IoT"
            rules={[
              {
                required: true,
                message: "Please input IoT!",
              },
            ]}
          >
            <Select placeholder="--Select one--" allowClear>
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Date_Difference"
            label="Schedule Variance"
            rules={[
              {
                required: true,
                message: "Please input Schedule Variance!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="Expected_Team_Size"
            label="Expected Team Size"
            rules={[
              {
                required: true,
                message: "Please input Expected Team Size!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="Expected_Budget"
            label="Expected Budget ($)"
            rules={[
              {
                required: true,
                message: "Please input Expected Budget!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Current Payload"
        open={isViewPayloadModalVisible}
        onOk={handleCloseViewPayloadModal}
        onCancel={handleCloseViewPayloadModal}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={handleCloseViewPayloadModal}
          >
            Close
          </Button>,
        ]}
      >
        {currentPayload ? (
          <pre>{JSON.stringify(currentPayload, null, 2)}</pre>
        ) : (
          <div>No payload found in local storage.</div>
        )}
      </Modal>

      <Modal
        title="Edit Payload"
        open={isPending}
        footer={false}
        onCancel={() => handlePending(false)}
      >
        <div>Do You Want to Approve this Project</div>
        <div className="flex flex-row gap-2 mt-4 justify-end">
          <div>
            <Button onClick={() => handleApprove(true)} type="primary">
              Approve Project
            </Button>
          </div>
          <div>
            <Button
              onClick={() => handleApprove(false)}
              className="bg-red-600"
              type="primary"
            >
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RiskType;
