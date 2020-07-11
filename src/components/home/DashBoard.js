import React, { Fragment } from "react";
import "antd/dist/antd.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DashBoard = () => {

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-4 col-sm-12">
          <div className="card">
            <div className="row item-dashboard">
              <div className="col-9 col-md-9 col-sm-12 ">
                <p className="p-title">Card content</p>
                <p className="p-content">Card content</p>
                <p>Card content</p>
              </div>
              <div className="col-3 col-md-3 col-sm-12">
                <span>
                  <ExclamationCircleOutlined />
                </span>
                <p className="background"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-sm-12">
          <div className="card">
            <div className="row item-dashboard0">
              <div className="col-9 col-md-9 col-sm-12">
                <p className="p-title">Card content</p>
                <p className="p-content">Card content</p>
                <p>Card content</p>
              </div>
              <div className="col-3 col-md-3 col-sm-12">
                <span>
                  <ExclamationCircleOutlined />
                </span>
                <p className="background"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-sm-12">
          <div className="card">
            <div className="row item-dashboard1">
              <div className="col-9 col-md-9 col-sm-12">
                <p className="p-title">Card content</p>
                <p className="p-content">Card content</p>
                <p>Card content</p>
              </div>
              <div className="col-3 col-md-3 col-sm-12">
                <span>
                  <ExclamationCircleOutlined />
                </span>
                <p className="background"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-4">
        <div className="col-12 col-sm-12 col-md-6 next">
          <div className="card"></div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 next">
          <div className="card"></div>
        </div>
      </div>
    </Fragment>
  );
};
export default DashBoard;
