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
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { viewCertificateDetails } from "../../redux/action/viewcirtificate/viewcirtificate.action";
import moment from "moment";
import { isValidObject, SendNotification } from "../../utilies/utilies";
import { FileUpload } from "../../redux/action/addcirtificate/fileUpload.action";
import { editCertificateDetails } from "../../redux/action/editcirtificate/editcirtificate.action";

const EditGemCertificate = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { TextArea } = Input;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState("");
  const [reportData, setReportData] = useState([]);

  const certificateData = useSelector((state) => state.viewCertificateReducer);

  useEffect(() => {
    dispatch(viewCertificateDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    const { data } = certificateData;
    const { message } = data;

    if (isValidObject(message) && Array.isArray(message?.other)) {
      setReportData(message);
      const keys = Object.keys(message?.other?.[0]);
      const values = Object.values(message?.other?.[0]);
      console.log(values?.species, "values?.species");
      form.setFieldsValue({
        report_number: message?.reportNumber,
        report_date: moment(message?.reportDate),
        SPECIES: message?.other?.[0].SPECIES,
        VARIETY: message?.other?.[0].VARIETY,
        "SHAPE/CUT": message?.other?.[0]["SHAPE/CUT"],
        "COLOR/TRANSPARENCY": message?.other?.[0]["COLOR/TRANSPARENCY"],
        DIMENSION: message?.other?.[0].DIMENSION,
        "CARAT-WEIGHT": message?.other?.[0]["CARAT-WEIGHT"],
        RI: message?.other?.[0].RI,
        SG: message?.other?.[0].SG,
        HARDNESS: message?.other?.[0].HARDNESS,
        ORIGIN: message?.other?.[0].ORIGIN,
        comment: message?.comments,
      });
    }
  }, [certificateData, form]);

  const onFinish = (data) => {
    // return

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
    };

    console.log("addData", addData);

    dispatch(editCertificateDetails(id, addData)).then((res) => {
      if (res) {
        SendNotification({
          type: "s",
          message: "Certificate updated successfully",
        });
        navigate("/dashboard");
      }
    });
  };

  const handleImageChange = ({ target: { files } }) => {
    setFile(files[0]);

    let formData = new FormData();
    formData.append("file", files[0]);

    dispatch(FileUpload(formData)).then((res) => {
      if (res?.payload?.data) {
        setFileName(res?.payload?.data?.fileName);
      }
    });
  };
  return (
    <Fragment>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3}>Edit Certificate</Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Form
              form={form}
              onFinish={onFinish}
              name="add_cirtificate"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
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
                      maxLength={180}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="form_group"
                    name="imgUpload"
                    label="Upload Image"
                  >
                    <div className="upload_wrapper">
                      <label className="upload_box" htmlFor="editImg">
                        Upload File
                      </label>
                      <input
                        onChange={handleImageChange}
                        type="file"
                        id="editImg"
                      />
                    </div>
                    {/* {
                      reportData.attachment !== null ? 
                      <img className="mt_3 br_5" src={`${process.env.REACT_APP_API_BASEURL}/${reportData?.attachment?.dir}/${reportData?.attachment?.fileName}`} key={id} style={{height: "120px"}} alt="product-img" />:<></>
                    } */}
                    {file ? (
                      <img
                        className="mt_3 br_5"
                        src={file ? URL.createObjectURL(file) : null}
                        alt={file ? file.name : null}
                        style={{ height: "120px" }}
                      />
                    ) : (
                      <img
                        className="mt_3 br_5"
                        src={`${process.env.REACT_APP_API_BASEURL}/${reportData?.attachment?.dir}/${reportData?.attachment?.fileName}`}
                        key={id}
                        style={{ height: "120px" }}
                        alt="product-img"
                      />
                    )}
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

export default EditGemCertificate;
