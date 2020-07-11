import React, { useState } from "react";
import { Table, Button, Input, message, Popconfirm, Form } from "antd";
import "antd/dist/antd.css";

import {
  PlusOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { userService } from "../../api/userService";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    ellipsis: true,
    key: "email",
  },

  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    ellipsis: true,
  },
];

const User = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  userService.getUsers().then((data) => {
    setData(data);
  });
  const { username, password, email } = dataForm;
  const handleOnSubmit = () => {
    console.log(dataForm);
    userService.Register(dataForm).then((data) => {
      if (data.user) {
        message.success("Saved.");
      } else {
        message.error(data);
      }
    });
  };
  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const tableUsers = data.map((x, i) => ({
    key: i,
    id: i + 1,
    username: x.username,
    password: x.password,
    email: x.email,
    actions: [
      <InfoCircleOutlined
        data-toggle="modal"
        data-target="#showInfoModal"
        key={1}
        onClick={() => showInfoModal(x.id)}
      />,
      <Popconfirm
        key={3}
        className="popconfirm"
        title="Are you sure delete this user?"
        onConfirm={() => handleDelete(x.id)}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined className="icon-in-manipulation" key={2} />
      </Popconfirm>,
    ],
  }));

  const handleDelete = (id) => {
    userService.Delete(id).then((data) => {
      if (data) message.info("Deleted user.");
      message.success("Delete successful. !");
    });
  };
  const showInfoModal = (id) => {
    userService.detailModal(id).then((data) => {
      if (data) setUser(data);
    });
  };

  return (
    <div>
      <Button
        className="add-button mb-4"
        icon={<PlusOutlined />}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add
      </Button>
      <Table columns={columns} dataSource={tableUsers} />
      <Form name="basic">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal User
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body pb-4">
                <span className="pb-3">Username :</span>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    name="username"
                    value={username}
                    onChange={(e) => handleOnChange(e)}
                  />
                </Form.Item>
                <span className="pb-3">Password :</span>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    name="password"
                    value={password}
                    onChange={(e) => handleOnChange(e)}
                  />
                </Form.Item>
                <span className="pb-3">Email :</span>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    value={email}
                    name="email"
                    onChange={(e) => handleOnChange(e)}
                  />
                </Form.Item>
              </div>
              <div className="modal-footer">
                <Button onClick={handleOnSubmit} htmlType="submit">
                  Save
                </Button>

                <Button data-dismiss="modal" aria-hidden="true">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <div
        className="modal fade"
        id="showInfoModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="showInfoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="showInfoModal">
                Modal detail
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body pb-4">
              <span className="pb-3">Username :</span>

              <Input
                className="mb-4"
                name="username"
                value={user.username}
                readOnly
              />

              <span className="pb-3">Email :</span>
              <Input
                className="mb-4"
                value={user.email}
                name="email"
                readOnly
              />
            </div>
            <div className="modal-footer">
              <Button aria-hidden="true" data-dismiss="modal">
                Save
              </Button>

              <Button data-dismiss="modal" aria-hidden="true">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
