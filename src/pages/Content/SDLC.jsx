import React, { useEffect, useState } from "react";
import axios from "../../apis/axiosInstance";
import {
  Spin,
  Button,
  Modal,
  Form,
  Select,
  Tag,
  Card,
  Statistic,
  Row,
  Col,
  Divider,
  Timeline,
  Progress,
} from "antd";
import {
  SyncOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
  RocketOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Green color palette
const colors = {
  primary: "#6A953F",
  secondary: "#96BD68",
  light: "#B0D287",
  dark: "#4D6F2F",
  background: "#f0f5eb",
};

const SDLC = () => {
  const navigate = useNavigate();
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

  const [selectedProject, setSeletedProject] = useState({});

  const { Option } = Select;

  useEffect(() => {
    const getProjects = async () => {
      const res = await axios.get("/get-projects");
      localStorage.setItem("projects", JSON.stringify(res.data));
      const selectionProjects = res.data?.filter((prj) => {
        return prj.status === 1 || prj.status === 2;
      });
      setProjectName(selectionProjects);
      setPending(4);
    };
    getProjects();
  }, []);

  // const exportToPDF = () => {
  //   const input = document.getElementById("sdlc-content");
  //   if (input) {
  //     html2canvas(input).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");
  //       const imgWidth = 210;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //       pdf.save("sdlc-output.pdf");
  //     });
  //   } else {
  //     console.error("Input element for PDF generation not found.");
  //   }
  // };
  const exportToPDF = () => {
    const input = document.getElementById("sdlc-content");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth - 20, imgHeight - 20);
        pdf.save("sdlc-output.pdf");
      });
    } else {
      console.error("Input element for PDF generation not found.");
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    setPending(3);
    const projects = localStorage.getItem("projects");
    const parsedPrj = JSON.parse(projects) || [];
    const selectedProj = parsedPrj.filter((prj) => prj.Name === values.name);

    localStorage.setItem("SearchPayload", JSON.stringify(selectedProj[0]));

    const payload = selectedProj[0];
    setSeletedProject(payload);
    if (payload) {
      try {
        const res = await axios.post("/sdlc", {
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
          "Expected Team Size": payload.Expected_Team_Size,
          "Expected Budget": payload.Expected_Budget,
          status: payload.status,
          "Project Scope": payload.project_scope,
          "Requirement specifity": payload.requirement_specifity,
          "Team Experience": payload.team_experience,
        });
        setData(res.data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching SDLC data:", error);
        console.error("Error parsing payload:", error);
      } finally {
        setLoading(false); // Set loading to false once data fetching is done
      }
    } else {
      setLoading(false); // Set loading to false if no payload is found
    }
  };

  const handlePending = (value) => {
    setIsPending(value);
  };

  const handleApprove = async (approve) => {
    try {
      if (approve) {
        // Update project status to approved (1)
        await axios.put(`/update-project/${selectedProject.Name}`, {
          ...selectedProject,
          status: 1,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Project has been approved!",
        });
      } else {
        // Delete or decline the project
        await axios.delete(`/delete-project/${selectedProject.Name}`);
        Swal.fire({
          icon: "success",
          title: "Declined",
          text: "Project has been declined.",
        });
      }
      setIsPending(false);
      // Refresh the page or update state
      window.location.reload();
    } catch (error) {
      console.error("Error updating project:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update project status.",
      });
    }
  };

  const prepareChartData = (baseTime) => {
    if (!baseTime) return [];
    return Object.keys(baseTime).map((key) => ({
      name: key,
      time: baseTime[key],
    }));
  };

  const formatSDLCData = (sdlc) => {
    return sdlc
      .replace(
        /###\s*(.*)/g,
        "<br/><strong style='font-size: 1.2em; margin-bottom: 16px; display: block;'>$1</strong>"
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(
        /- (.*?)(?=\n|$)/g,
        "<div style='font-size: 1em; margin-bottom: 8px;'>- $1</div>"
      );
  };
  const calculateSum = (baseTime) => {
    if (!baseTime) return 0;
    return Object.values(baseTime).reduce((sum, value) => sum + value, 0);
  };

  const getPhaseColor = (index) => {
    const phaseColors = [
      colors.dark,
      colors.primary,
      colors.secondary,
      colors.light,
      "#82ca9d",
      "#8884d8",
    ];
    return phaseColors[index % phaseColors.length];
  };

  const handleViewPayload = () => {
    const payloadLocal = localStorage.getItem("SearchPayload");
    if (payloadLocal) {
      setCurrentPayload(JSON.parse(payloadLocal));
      setIsViewPayloadModalVisible(true);
    } else {
      console.warn("No payload found in local storage.");
    }
  };

  const handleCloseViewPayloadModal = () => {
    setIsViewPayloadModalVisible(false);
  };

  return (
    <div id="sdlc-content" style={{ background: "#fafafa", minHeight: "100vh", padding: "24px" }}>
      {/* Header Section */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <RocketOutlined style={{ fontSize: 32, color: colors.primary }} />
            <div>
              <h1 style={{ margin: 0, fontSize: 28, color: colors.dark }}>
                SDLC Prediction
              </h1>
              <p style={{ margin: 0, color: "#666" }}>
                Software Development Life Cycle Analysis
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleViewPayload}
              icon={<EyeOutlined />}
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              View Payload
            </Button>
            <Button
              onClick={exportToPDF}
              type="primary"
              icon={<DownloadOutlined />}
              disabled={!data}
              style={{ background: colors.primary, borderColor: colors.primary }}
            >
              Export PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Project Selection Card */}
      <Card
        title={
          <span style={{ color: colors.dark }}>
            <FileTextOutlined style={{ marginRight: 8 }} />
            Select Project
          </span>
        }
        style={{
          marginBottom: 24,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
          <Row gutter={24} align="middle">
            <Col xs={24} md={16}>
              <Form.Item
                name="name"
                label={<span style={{ fontWeight: 500 }}>Project Name</span>}
                rules={[{ required: true, message: "Please Select a Project Name" }]}
              >
                <Select
                  placeholder="--Select a Project--"
                  allowClear
                  size="large"
                  style={{ width: "100%" }}
                >
                  {projectName?.map((prj) => (
                    <Option key={prj.Name} value={prj.Name}>
                      {prj.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label=" ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                  style={{ background: colors.primary, borderColor: colors.primary }}
                >
                  Analyze SDLC
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* Project Status */}
        <Divider style={{ margin: "16px 0" }} />
        <div className="flex items-center gap-2">
          <span style={{ fontWeight: 500 }}>Project Status:</span>
          {selectedProject.status === 1 ? (
            <Tag icon={<CheckCircleOutlined />} color="success" style={{ fontSize: 14, padding: "4px 12px" }}>
              Approved
            </Tag>
          ) : selectedProject.status === 2 ? (
            <div className="flex items-center gap-3">
              <Tag icon={<ClockCircleOutlined />} color="warning" style={{ fontSize: 14, padding: "4px 12px" }}>
                Pending Approval
              </Tag>
              <Button
                onClick={() => handlePending(true)}
                type="primary"
                size="small"
                style={{ background: colors.primary }}
              >
                Approve / Decline
              </Button>
            </div>
          ) : selectedProject.status === 3 ? (
            <Tag icon={<SyncOutlined spin />} color="processing" style={{ fontSize: 14, padding: "4px 12px" }}>
              Processing
            </Tag>
          ) : (
            <Tag color="default" style={{ fontSize: 14, padding: "4px 12px" }}>
              No Project Selected
            </Tag>
          )}
        </div>
      </Card>

      {/* Results Section */}
      <div className="mt-6">
        {loading ? (
          <Card style={{ textAlign: "center", padding: 60, borderRadius: 12 }}>
            <Spin size="large" />
            <p style={{ marginTop: 16, color: "#666" }}>Analyzing SDLC phases...</p>
          </Card>
        ) : data ? (
          <div>
            {/* Statistics Cards */}
            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={12} lg={6}>
                <Card
                  style={{
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                    border: "none",
                  }}
                >
                  <Statistic
                    title={<span style={{ color: "rgba(255,255,255,0.8)" }}>Total Duration</span>}
                    value={calculateSum(data.base_time)}
                    suffix="Days"
                    valueStyle={{ color: "#fff", fontSize: 32 }}
                    prefix={<CalendarOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card
                  style={{
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
                    border: "none",
                  }}
                >
                  <Statistic
                    title={<span style={{ color: "rgba(255,255,255,0.8)" }}>Total Phases</span>}
                    value={data.base_time ? Object.keys(data.base_time).length : 0}
                    suffix="Phases"
                    valueStyle={{ color: "#fff", fontSize: 32 }}
                    prefix={<RocketOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card
                  style={{
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.secondary} 100%)`,
                    border: "none",
                  }}
                >
                  <Statistic
                    title={<span style={{ color: "rgba(255,255,255,0.8)" }}>Avg Phase Duration</span>}
                    value={data.base_time ? (calculateSum(data.base_time) / Object.keys(data.base_time).length).toFixed(1) : 0}
                    suffix="Days"
                    valueStyle={{ color: "#fff", fontSize: 32 }}
                    prefix={<ClockCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card
                  style={{
                    borderRadius: 12,
                    background: `linear-gradient(135deg, #52c41a 0%, #237804 100%)`,
                    border: "none",
                  }}
                >
                  <Statistic
                    title={<span style={{ color: "rgba(255,255,255,0.8)" }}>Estimated Weeks</span>}
                    value={(calculateSum(data.base_time) / 7).toFixed(1)}
                    suffix="Weeks"
                    valueStyle={{ color: "#fff", fontSize: 32 }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
              <Col xs={24} lg={14}>
                <Card
                  title={
                    <span style={{ color: colors.dark }}>
                      <CalendarOutlined style={{ marginRight: 8 }} />
                      Timeline Overview
                    </span>
                  }
                  style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart
                      data={prepareChartData(data.base_time)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: "#fff",
                          border: `1px solid ${colors.light}`,
                          borderRadius: 8,
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="time"
                        stroke={colors.primary}
                        fillOpacity={1}
                        fill="url(#colorTime)"
                        name="Duration (Days)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card
                  title={
                    <span style={{ color: colors.dark }}>
                      <RocketOutlined style={{ marginRight: 8 }} />
                      Phase Distribution
                    </span>
                  }
                  style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={prepareChartData(data.base_time)}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                      <Tooltip
                        contentStyle={{
                          background: "#fff",
                          border: `1px solid ${colors.light}`,
                          borderRadius: 8,
                        }}
                      />
                      <Bar dataKey="time" name="Duration (Days)" radius={[0, 4, 4, 0]}>
                        {prepareChartData(data.base_time).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getPhaseColor(index)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>

            {/* Phase Timeline */}
            <Card
              title={
                <span style={{ color: colors.dark }}>
                  <ClockCircleOutlined style={{ marginRight: 8 }} />
                  Phase Progress Timeline
                </span>
              }
              style={{ borderRadius: 12, marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            >
              <Row gutter={[16, 16]}>
                {data.base_time && Object.entries(data.base_time).map(([phase, days], index) => {
                  const totalDays = calculateSum(data.base_time);
                  const percentage = totalDays > 0 ? ((days / totalDays) * 100).toFixed(1) : 0;
                  return (
                    <Col xs={24} sm={12} md={8} lg={6} key={phase}>
                      <Card
                        size="small"
                        style={{
                          borderLeft: `4px solid ${getPhaseColor(index)}`,
                          borderRadius: 8,
                        }}
                      >
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>{phase}</div>
                        <Progress
                          percent={parseFloat(percentage)}
                          strokeColor={getPhaseColor(index)}
                          size="small"
                        />
                        <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                          {days} days ({percentage}%)
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Card>

            {/* SDLC Details */}
            <Card
              title={
                <span style={{ color: colors.dark }}>
                  <FileTextOutlined style={{ marginRight: 8 }} />
                  SDLC Methodology Details
                </span>
              }
              style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            >
              <div
                style={{
                  padding: "16px",
                  background: colors.background,
                  borderRadius: 8,
                  lineHeight: 1.8,
                }}
                dangerouslySetInnerHTML={{
                  __html: data.sdlc ? formatSDLCData(data.sdlc) : "No SDLC Data Available",
                }}
              />
            </Card>
          </div>
        ) : (
          <Card
            style={{
              textAlign: "center",
              padding: 60,
              borderRadius: 12,
              background: colors.background,
            }}
          >
            <RocketOutlined style={{ fontSize: 64, color: colors.light, marginBottom: 16 }} />
            <h3 style={{ color: colors.dark }}>No Data Available</h3>
            <p style={{ color: "#666" }}>Please select a project and click "Analyze SDLC" to get started</p>
          </Card>
        )}
      </div>

      {/* View Payload Modal */}
      <Modal
        title={
          <span>
            <EyeOutlined style={{ marginRight: 8 }} />
            Current Payload
          </span>
        }
        open={isViewPayloadModalVisible}
        onOk={handleCloseViewPayloadModal}
        onCancel={handleCloseViewPayloadModal}
        footer={[
          <Button key="close" type="primary" onClick={handleCloseViewPayloadModal} style={{ background: colors.primary }}>
            Close
          </Button>,
        ]}
      >
        {currentPayload ? (
          <pre style={{ background: "#f5f5f5", padding: 16, borderRadius: 8, overflow: "auto" }}>
            {JSON.stringify(currentPayload, null, 2)}
          </pre>
        ) : (
          <div>No payload found in local storage.</div>
        )}
      </Modal>

      {/* Approve/Decline Modal */}
      <Modal
        title="Project Approval"
        open={isPending}
        footer={false}
        onCancel={() => handlePending(false)}
      >
        <p style={{ marginBottom: 16 }}>Do you want to approve this project?</p>
        <div className="flex flex-row gap-2 justify-end">
          <Button onClick={() => handleApprove(true)} type="primary" style={{ background: colors.primary }}>
            Approve Project
          </Button>
          <Button onClick={() => handleApprove(false)} danger type="primary">
            Decline Project
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SDLC;