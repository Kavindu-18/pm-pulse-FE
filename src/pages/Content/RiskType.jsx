import React, { useEffect, useState } from "react";
import axios from "../../apis/axiosInstance";
import { Spin, Button, Modal, Form, Input, Select } from "antd";

const RiskType = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewPayloadModalVisible, setIsViewPayloadModalVisible] =
    useState(false);
  const [form] = Form.useForm();
  const [currentPayload, setCurrentPayload] = useState(null);

  const { Option } = Select;

  useEffect(() => {
    const sendDetails = async () => {
      const payloadLocal = localStorage.getItem("SearchPayload");

      if (payloadLocal) {
        try {
          const payload = JSON.parse(payloadLocal);
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

    sendDetails();
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
      const res = await axios.post("risk/recal", {
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
      const response = {
        mitigation: "",
        risk: res.data.response,
      };
      setData(response);
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
        <Form form={form} layout="vertical">
          <Form.Item name="Domain" label="Domain">
            <Select placeholder="Select Domain">
              <Option value="Finance">Finance</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item name="ML_Components" label="ML Components">
            <Input />
          </Form.Item>
          <Form.Item name="Backend" label="Backend Technology">
            <Select placeholder="Select Backend Technology">
              <Option value="Node.js">Node.js</Option>
              <Option value="Python">Python</Option>
              <Option value="Nest.js">Nest.js</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Frontend" label="Frontend Technology">
            <Select placeholder="Select Frontend Technology">
              <Option value="React">React.js</Option>
              <Option value="Next">Next.js</Option>
              <Option value="Vue">Vue.js</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Core_Features" label="Core Features">
            <Input />
          </Form.Item>
          <Form.Item name="Tech_Stack" label="Tech Stack">
            <Input />
          </Form.Item>
          <Form.Item name="Mobile" label="Mobile">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="Desktop" label="Desktop">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="Web" label="Web">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="IoT" label="IoT">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="Date_Difference" label="Date Difference">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="Expected_Team_Size" label="Expected Team Size">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="Expected_Budget" label="Expected Budget">
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
    </div>
  );
};

export default RiskType;
