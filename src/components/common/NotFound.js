import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Result, Button } from "antd";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin loi, chung toi khong tim thay page ban can tim."
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
};
export default NotFound;
