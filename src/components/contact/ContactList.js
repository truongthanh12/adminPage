import React, { Component } from "react";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Table, Button, Input } from "antd";
import { Popconfirm, message } from "antd";

const { TextArea } = Input;

const columns = [
  { title: "ID", dataIndex: "id" },
  {
    title: "Name",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    ellipsis: true,
  },
  {
    title: "Subject",
    dataIndex: "subject",
    ellipsis: true,
  },
  {
    title: "Message",
    dataIndex: "message",
    ellipsis: true,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    ellipsis: true,
  },
];

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: props.contactList,
      id: null,
      loading: false,
      detailContact: undefined,
      data: null,
      contact: null,
    };
  }
  onDoubleClick = () => {
    alert("Clicked double");
  };
  createData() {
    this.state.contactList &&
      this.setState({
        ...this.state,
        data: this.state.contactList.map((contact, index) => ({
          key: index,
          id: index + 1,
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          subject: contact.subject,
          message: contact.message,
          actions: [
            <InfoCircleOutlined
              key={1}
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => this.detailModal(contact.id)}
            />,
            <Popconfirm
              key={2}
              className="popconfirm"
              title="Are you sure delete this contact?"
              onConfirm={(e) => this.confirm(e, contact.id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="icon-in-manipulation" />
            </Popconfirm>,
          ],
        })),
      });
  }

  confirm = (e, id) => {
    message.success("Done! Deleted this contact.");
    this.deleteContact(e, id);
  };
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.contactList !== prevProps.contactList) {
      this.setState({
        ...this.state,
        contactList: [...this.props.contactList],
      });
    }
    if (this.state.contactList !== prevState.contactList) {
      this.createData();
    }
  }

  async deleteContact(e, id) {
    e.preventDefault();
    this.setState({ loading: true });
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
    };
    await axios.delete(`/api/contacts/${id}/`, requestConfig);
    this.setState((prevState) => ({
      ...this.state,
      loading: false,
      contactList: prevState.contactList.filter((element) => element.id !== id),
    }));
  }

  async detailModal(id) {
    console.log("detaimodal click: id", id);
    this.setState({ loading: true });
    let res;
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`,
      },
    };
    res = await axios.get(`/api/contacts/${id}/`, requestConfig);
    this.setState({ detailContact: res.data, loading: false });
  }

  render() {
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          onRow={(record, rowIndex) => {
            return {
              //onDoubleClick: (id) => this.detailModal(record.id),
              // double click row
            };
          }}
        />

        {/* modal */}
        <div
          title="Contact's information"
          className="modal fade"
          id="exampleModal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Contact's information
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
              <div className="modal-body">
                <div className="inline-value">
                  <p>
                    <strong>Name: </strong>
                    <Input
                      className="input-name"
                      type="text"
                      readOnly
                      value={
                        this.state.detailContact &&
                        this.state.detailContact.name
                      }
                    ></Input>
                  </p>
                  <p>
                    <strong>Phone: </strong>
                    <Input
                      type="text"
                      className="input-text"
                      readOnly
                      value={
                        this.state.detailContact &&
                        this.state.detailContact.phone
                      }
                    ></Input>
                  </p>
                </div>
                <p>
                  <strong>Email: </strong>
                  <Input
                    type="text"
                    className="input-text"
                    readOnly
                    value={
                      this.state.detailContact && this.state.detailContact.email
                    }
                  ></Input>
                </p>
                <p>
                  <strong>Subject: </strong>
                  <Input
                    type="text"
                    readOnly
                    className="input-text"
                    value={
                      this.state.detailContact &&
                      this.state.detailContact.subject
                    }
                  ></Input>
                </p>
                <p>
                  <strong>Message: </strong>
                  <TextArea
                    rows={4}
                    className="input-text"
                    readOnly
                    value={
                      this.state.detailContact &&
                      this.state.detailContact.message
                    }
                  ></TextArea>
                </p>
              </div>
              <div className="modal-footer">
                <Button data-dismiss="modal" aria-label="Close">
                  Close
                </Button>
                {/* <Popconfirm
                  key={3}
                  className="popconfirm"
                  title="Are you sure delete this contact?"
                  onConfirm={(e) =>
                    this.confirm(e, this.state.detailContact.id)
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Delete</Button>
                </Popconfirm> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactList;
