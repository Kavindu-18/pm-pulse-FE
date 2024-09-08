import React from "react";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import register from "../assets/user/register.jpg";
import axios from "../apis/axiosInstance";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to Register With PM Pulse",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });
      const payload = {
        name: values.name,
        contactNumber: values.contactNumber,
        email: values.email,
        password: values.password,
        role: values.role,
        uniqueField: values.uniqueField,
      };
      if (result.isConfirmed) {
        const res = await axios.post("/register", {
          payload,
        });
        Swal.fire(
          "Congratulations! You Have Successfully Registered with PM Pulse",
          "",
          "success"
        );
        navigate("/login");
      } else {
        Swal.fire("Registraion Cancelled", "", "error");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };
  const inputStyle =
    "w-full p-3 rounded-md  border border-purple focus:outline-none focus:border-blue-500 ";

  return (
    <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-10 lg:mt-10 lg:px-32 mb-10 gap-10">
      <div className="md:pl-10">
        <div className="">
          <span className="text-5xl font-extrabold text-[#1F95FF] ">
            Register
          </span>
          <h2 className=" text-lg mb-5 mt-5">Create Your Account</h2>
          <Form
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: "86",
            }}
            scrollToFirstError
          >
            <div className="pt-2">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
                hasFeedback
              >
                <Input className={inputStyle} placeholder="Full Name" />
              </Form.Item>
            </div>

            <div className="pt-2">
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
                hasFeedback
              >
                <Input className={inputStyle} placeholder="Email" />
              </Form.Item>
            </div>

            <div className="pt-2">
              <Form.Item
                name="contactNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (/^\d{10}$/.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Phone number must be 10 digits and contain only numbers."
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input className={inputStyle} placeholder="Phone Number" />
              </Form.Item>
            </div>

            <div className="pt-2">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters.",
                  },
                  {
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
                  },
                ]}
                hasFeedback
              >
                <Input.Password className={inputStyle} placeholder="Password" />
              </Form.Item>
            </div>

            <div className="pt-2">
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  className={inputStyle}
                  placeholder="Confirm Password"
                />
              </Form.Item>
            </div>

            <div className="pt-2">
              <div>
                <Form.Item>
                  <button
                    type="primary"
                    htmlType="submit"
                    className="bg-[#1F95FF] text-white font-bold px-6 py-3 rounded-md hover:bg-blue-800"
                  >
                    Register
                  </button>
                </Form.Item>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/login" className="text-[#1F95FF] hover:underline">
                Already a member? Login
              </Link>
            </div>
          </Form>
        </div>
      </div>

      <div>
        <img
          className="rounded-3xl lg:h-[635px] h-full w-full object-cover"
          src={register}
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
