import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../../redux/action/addcirtificate/fileUpload.action";
import { addCertificateDetails } from "../../redux/action/addcirtificate/addcirtificate.action";
import { SendNotification } from "../../utilies/utilies";

const { Title } = Typography;
const { TextArea } = Input;

const AddGemCertificate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState("");

  const handleImageChange = ({ target: { files } }) => {
    setFile(files[0]);

    let formData = new FormData();
    formData.append("file", files[0]);

    dispatch(FileUpload(formData)).then(
      (res) => {
        if (res?.payload?.data) {
          setFileName(res?.payload?.data?.fileName);
        }
      },
      [formData]
    );
  };

  const onFinish = (data) => {
    const {
      report_number,
      report_date,
      species,
      variety,
      shape_cut,
      color_transparency,
      dimension,
      carat_weight,
      ri,
      sg,
      hardness,
      origin,
      comment,
    } = data;

    function convertDate(str) {
      var mnths = {
          Jan: "01",
          Feb: "02",
          Mar: "03",
          Apr: "04",
          May: "05",
          Jun: "06",
          Jul: "07",
          Aug: "08",
          Sep: "09",
          Oct: "10",
          Nov: "11",
          Dec: "12",
        },
        date = str.split(" ");

      return [date[3], mnths[date[1]], date[2]].join("/");
    }

    const report_dates = convertDate(String(report_date._d));

    const addData = {
      reportNumber: report_number,
      reportDate: report_dates,
      other: [
        {
          SPECIES: species,
          VARIETY: variety,
          "SHAPE/CUT": shape_cut,
          "COLOR/TRANSPARENCY": color_transparency,
          DIMENSION: dimension,
          "CARAT-WEIGHT": carat_weight,
          RI: ri,
          SG: sg,
          HARDNESS: hardness,
          ORIGIN: origin,
        },
      ],
      comments: comment,
      image: filename,
      type: 1,
    };
    dispatch(addCertificateDetails(addData)).then((res) => {
      if (res) {
        SendNotification({
          type: "s",
          message: "Certificate added successfully",
        });
        navigate("/dashboard");
      }
    });
  };

  return (
    <Fragment>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3}>Add Certificate</Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            {/* <Title level={5} className="mb_2">CREATE NEW CERTIFICATE</Title> */}
            <Form
              onFinish={onFinish}
              name="add_cirtificate"
              initialValues={{
                remember: true,
              }}
              layout="vertical"
            >
              <Row gutter={[16, 4]}>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="Report Number"
                    name="report_number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your report number",
                      },
                    ]}
                  >
                    <Input className="form_control" placeholder="NGL2540" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="Report Date"
                    name="report_date"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your report date",
                      },
                    ]}
                  >
                    <DatePicker
                      className="form_control"
                      format="DD-MM-YYYY"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                {/* {Array(10).fill().map((_, i) => {
                  return (
                    <Fragment key={i}>
                      <Col span={24} sm={12}>
                        <Form.Item className="form_group" name={`inputKey${i + 1}`}>
                          <Input className="form_control" placeholder={i + 1} />
                        </Form.Item>
                      </Col>

                      <Col span={24} sm={12}>
                        <Form.Item className="form_group" name={`inputValue${i + 1}`}>
                          <Input className="form_control" placeholder="value" />
                        </Form.Item>
                      </Col>
                    </Fragment>
                  )
                })} */}
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="SPECIES"
                    name="species"
                  >
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="VARIETY"
                    name="variety"
                  >
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="SHAPE/CUT"
                    name="shape_cut"
                  >
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="COLOR/TRANSPARENCY"
                    name="color_transparency"
                  >
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="DIMENSION"
                    name="dimension"
                  >
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="CARAT WEIGHT"
                    name="carat_weight"
                  >
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item className="form_group" label="RI" name="ri">
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item className="form_group" label="SG" name="sg">
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="HARDNESS"
                    name="hardness"
                  >
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item
                    className="form_group"
                    label="ORIGIN"
                    name="origin"
                  >
                    <Input className="form_control" placeholder="" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item className="form_group" name="comment">
                    <TextArea
                      className="form_text_area"
                      rows={4}
                      placeholder="comment"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="form_group"
                    name="imgUpload"
                    // label="Upload Image"
                  >
                    <div className="upload_wrapper">
                      <label className="upload_box" htmlFor="addImg">
                        Upload File
                      </label>
                      <input
                        onChange={handleImageChange}
                        type="file"
                        id="addImg"
                        accept="image/png, image/jpg, image/jpeg"
                      />
                    </div>
                    {file ? (
                      <img
                        className="mt_3 br_5"
                        src={file ? URL.createObjectURL(file) : null}
                        alt={file ? file.name : null}
                        style={{ height: "120px" }}
                      />
                    ) : (
                      <></>
                    )}

                    {/* <Upload 
                      accept="image/*"
                      listType="picture-card"
                      customRequest={dummyRequest}
                      onChange={handleImageChange}
                      openFileDialogOnClick={true}
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload> */}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="text_center mt_4">
                <Col span={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-primary btn-login"
                  >
                    submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddGemCertificate;
