import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../assets/user/signin.png";
import axios from "axios";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // try {
    //   const res = await axios.post("http://localhost:8090/user/login", {
    //     email: values.email,
    //     password: values.password,
    //   });
    //   const decoded = jwt_decode(res.data.token);
    //   const originalToken = res.data.token;
    //   const payload = {
    //     decodedJWT: decoded,
    //     originalToken: originalToken,
    //   };
    //   if (decoded.role === "Manager") {
    //     navigate("/admin");
    //   } else {
    //     navigate("/");
    //   }
    // } catch (err) {
    //   const res = err.response?.status === 401;
    //   if (res) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Invalid Email or Password",
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: err.message,
    //     });
    //   }
    // }
  };

  const inputStyle =
    "w-full p-3 rounded-md border border-purple focus:outline-none focus:border-blue-500";

  return (
    <div className="flex flex-col lg:flex-row items-center px-6 lg:px-32 lg:pt-40 pt-10 gap-10">
      <div className="w-full ">
        <img
          className="rounded-3xl h-auto w-full object-cover"
          src={login}
          alt="Login illustration"
        />
      </div>
      <div className="justify-start items-center w-full ">
        <div>
          <span className="text-[46px]  font-extrabold text-[#1F95FF]">
            Login
          </span>
          <h2 className="pt-8 font-semibold">Login to continue</h2>

          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <div className="mt-4">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="email"
                  className={inputStyle}
                />
              </Form.Item>
            </div>

            <div className="mt-2">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  className={inputStyle}
                />
              </Form.Item>
            </div>

            <div className="mt-2">
              <Form.Item>
                <button
                  type="submit"
                  className="bg-[#1F95FF] text-white font-bold px-6 py-3 rounded-md hover:bg-[#333333]"
                >
                  Login
                </button>
              </Form.Item>
            </div>

            <div>
              <Link to="/register" className="text-[#1F95FF] hover:underline">
                Not a member? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
