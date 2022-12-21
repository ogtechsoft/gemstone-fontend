import React, { Fragment, useEffect, useState } from "react";
import {
  BarChartOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Space,
  Statistic,
  Table,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCertificateDetails } from "../../redux/action/getcirtificate/getcirtificate.action";
import { deleteCertificateDetails } from "../../redux/action/deletecirtificate/deletecirtificate.action";
import { globalSearch } from './../../utilies/utilies';


const Dashboard = () => {
  const [certificate, setCertificate] = useState([]);
  const [certificateCounter, setCertificateCounter] = useState();
  const dispatch = useDispatch();
  const { Title } = Typography;
  const certificateData = useSelector((state) => state.getCertificateReducer);


  useEffect(() => {
    dispatch(getCertificateDetails());
  }, [dispatch]);

  useEffect(() => {
    const { data } = certificateData;
    const { rows } = data;
    setCertificateCounter(data.count);
    if (Array.isArray(rows)) {
      const updatedData = rows.map((item, i) => {
        return { ...item, key: i };
      });
      setCertificate(updatedData);
    }
  }, [certificateData]);


  const findReport = (target) => {
    setCertificate(() => globalSearch(certificateData?.data?.rows, target.value ))
  }

  const columns = [
    {
      title: "Report Number",
      dataIndex: "reportNumber",
      key: "reportNumber",
    },
    {
      title: "Report Date",
      dataIndex: "reportDate",
      key: "reportDate",
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    {
      title: "Carat size",
      dataIndex: "caratWeight",
      key: "caratWeight",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="action_button">
          <Link
            className="action_btn view_btn"
            to={`/view-certificate/${record.id}`}
          >
            <EyeOutlined />
          </Link>
          <Link
            className="action_btn edit_btn"
            to={`/edit-certificate/${record.id}`}
          >
            <EditOutlined />
          </Link>
          <Popconfirm
            title="Are you sure to delete certificate?"
            onConfirm={() => {
              deleteCerificateConfirm(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button className="action_btn delete_btn">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //Delete Certificate
  const deleteCerificateConfirm = (id) => {
    dispatch(deleteCertificateDetails(id)).then(() => {
      dispatch(getCertificateDetails());
    });
    message.success("Delete Certificate");
  };
  return (
    <Fragment>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3}>Dashboard</Title>
        </Col>
        <Col span={24} md={6}>
          <Card>
            <Statistic
              title="Total Certificates"
              value={certificateCounter}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={24} md={24}>
          <Card>
            <Row >
                <Col span={24}>
                  <div className="certificate_list_head">
                    <Title level={5} className="mb_2">Certificate List</Title>
                    <Form.Item className="form_group">
                        <Input placeholder="Find by report number" className="form_control" onChange={({target}) => findReport(target)} />
                     </Form.Item>
                     </div>
                </Col>
            </Row>
            <Table dataSource={certificate} columns={columns} bordered scroll={{x:'992'}} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
