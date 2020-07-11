import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Editor } from "@tinymce/tinymce-react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import {
  Drawer,
  Form,
  Button,
  Card,
  Pagination,
  Input,
  Select,
  Upload,
  Modal,
  message,
} from "antd";
import { blogService } from "../../api/blogService";

const { Meta } = Card;
const { Option } = Select;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [infoBlogs, setInfoBlogs] = useState({});
  const [newBlog, setNewBlog] = useState(false);
  const [drawer, setDrawer] = useState({
    previewVisible: false,
    previewTitle: "",
    file: null,
    fileList: [],
    visibleDrawer: false,
    visibleModal: false,
    previewImage: "",
    destroyOnClose: false,
  });
  const [dataForm, setDataForm] = useState({
    title: "",
    quote: "",
    content: "",
    category: "",
  });
  const [cates, setCates] = useState([]);
  const handleCancel = () => setDrawer({ ...drawer, previewVisible: false });

  const handleChangeValue = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const handleCategory = (category) => {
    setDataForm({ ...dataForm, category });
    console.log(category);
  };
  const handleEditorChange = (content, editor) => {
    setDataForm({ ...dataForm, content });
    console.log(content);
  };
  const handleUpload = ({ fileList }) => {
    console.log("fileList", fileList);
    setDrawer({ ...drawer, fileList });
  };
  const handlePreview = (file) => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true,
    });
  };

  const handleSubmitUpload = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", drawer.fileList[0].originFileObj);
    axios
      .post(`/api/blogs/poster`, formData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dataForm.title === "") {
      return message.error("This is required!");
    }
    console.log(dataForm);
    blogService.addBlog(dataForm).then((data) => {
      if (data) {
        setDrawer({ visibleDrawer: false });
        message.success("Saved.");
        setNewBlog(!newBlog);
      } else {
        message.error(data);
      }
    });
  };

  const showDrawer = () => {
    setDrawer({ ...drawer, visibleDrawer: true });
  };

  const onClose = () => {
    setDrawer({ ...drawer, visibleDrawer: false });
  };
  const showModal = (id) => {
    setDrawer({ ...drawer, visibleModal: true });
    blogService.showInfoBlog(id).then((data) => {
      if (data) setInfoBlogs(data);
    });
  };
  const handleOk = (e) => {
    setDrawer({ ...drawer, visibleModal: false });
  };

  const DeleteBlog = (e, id) => {
    blogService.Delete(id).then((data) => {
      if (data) message.info("Deleted user.");
      message.success("Delete successful. !");
    });
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const { previewVisible, previewTitle, fileList } = drawer;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  useEffect(() => {
    blogService.blogList().then((data) => {
      setBlogs(data.data);
    });
    blogService.categoryList().then((data) => {
      setCates(data);
    });
  }, [newBlog]);

  let cardBlog = blogs.map((e, i) => {
    return (
      <div className="col-12 col-md-3 col-sm-6" key={i}>
        <Card
          onClick={() => showModal(e.id)}
          hoverable
          cover={<img alt="hinh anh" src={e.previewImage} />}
        >
          <Meta title={e.title} description={e.quote} />
        </Card>
      </div>
    );
  });
  let ChooseCategory = cates.map((e, i) => {
    return (
      <Option key={i} value={e.id}>
        {e.title}
      </Option>
    );
  });
  return (
    <div>
      <Button
        className="add-button mb-4"
        icon={<PlusOutlined />}
        // data-toggle="modal"
        // data-target="#exampleModal"
        onClick={showDrawer}
      >
        Add
      </Button>

      {blogs.length === 0 ? (
        "No blog yet! Add now"
      ) : (
        <div className="row py-4">{cardBlog}</div>
      )}

      <Pagination defaultCurrent={1} total={10} className="pagination" />
      <div>
        <Drawer
          title="Create a new blog"
          width={"60%"}
          onClose={onClose}
          visible={drawer.visibleDrawer}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            ></div>
          }
        >
          <Form layout="vertical" hideRequiredMark id="form">
            <div className="mb-4">
              <p>Title: </p>
              <Input
                name="title"
                value={blogs.title}
                onChange={(value) => handleChangeValue(value)}
              />
              <p>Quote: </p>
              <Input
                name="quote"
                value={blogs.quote}
                onChange={(value) => handleChangeValue(value)}
              />
              <p>Upload image: </p>
              <div className="clearfix">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUpload}
                  beforeUpload={() => false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  //onPreview={onPreview}
                  onPreview={handlePreview}
                >
                  {uploadButton}
                </Upload>

                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={onClose}
                >
                  <img alt="example" style={{ width: "100%" }} />
                </Modal>
              </div>
              <p>Category: </p>
              <Select
                name="category"
                onChange={(category) => handleCategory(category)}
                defaultValue="Choose category"
                style={{ width: "100%" }}
              >
                {ChooseCategory}
              </Select>
            </div>
            <Editor
              init={{
                selector: "textarea",
                height: 112,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                  "searchreplace wordcount visualblocks visualchars code fullscreen",
                  "insertdatetime media nonbreaking save table contextmenu directionality",
                  "emoticons template paste textcolor colorpicker textpattern imagetools codesample toc",
                ],
                toolbar1:
                  "undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media",
                toolbar2:
                  "print preview media | forecolor backcolor emoticons | codesample",
                templates: [
                  { title: "Test template 1", content: "Test 1" },
                  { title: "Test template 2", content: "Test 2" },
                ],
                content_css: [
                  "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
                  "//www.tinymce.com/css/codepen.min.css",
                ],
                images_upload_url: "/",
                images_upload_handler: function (blobinfo, success, failure) {},
                relative_urls: false,

                automatic_uploads: true,
              }}
              onEditorChange={handleEditorChange}
            />
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Form>
        </Drawer>

        <Modal
          title="Detail Blog Modal"
          visible={drawer.visibleModal}
          onOk={handleOk}
          onCancel={handleOk}
          onDelete={DeleteBlog}
          width={800}
        >
          <p>{infoBlogs.title}</p>
          <p>{infoBlogs.quote}</p>
          <p dangerouslySetInnerHTML={{ __html: infoBlogs.content }}></p>
        </Modal>
      </div>
    </div>
  );
};

export default Blog;
