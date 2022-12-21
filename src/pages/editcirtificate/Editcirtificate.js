
import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom'
import { viewCertificateDetails } from '../../redux/action/viewcirtificate/viewcirtificate.action';
import moment from 'moment';
import { isValidObject, SendNotification } from '../../utilies/utilies';
import { FileUpload } from '../../redux/action/addcirtificate/fileUpload.action';
import { editCertificateDetails } from '../../redux/action/editcirtificate/editcirtificate.action';


const Editcirtificate = () => {
  const [form] = Form.useForm()
  const { Title } = Typography;
  const { TextArea } = Input;
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState(null)
  const [filename, setFileName] = useState('');
  const [reportData, setReportData] = useState([]);

  const certificateData = useSelector((state) => state.viewCertificateReducer);

  useEffect(() => {
    dispatch(viewCertificateDetails(id))
  }, [dispatch, id])
  
  useEffect(() => {
    const { data } = certificateData;
    const {message} = data;
    
    if(isValidObject(message) && Array.isArray(message?.other)){
      
      setReportData(message)
      const keys = Object.keys(message?.other?.[0]);
      const values = Object.values(message?.other?.[0]);
      
      form.setFieldsValue({
          report_number:message?.reportNumber,
          report_date: moment(message?.reportDate), 
          inputKeyOne: keys[0],
          inputKeyTwo: keys[1],
          inputKeyThree: keys[2],
          inputKeyFour: keys[3],
          inputKeyFive: keys[4],
          inputKeySix: keys[5],
          inputKeySeven: keys[6],
          inputKeyEight: keys[7],
          inputKeyNine: keys[8],
          inputKeyTen: keys[9],
          inputValueOne: values[0],
          inputValueTwo: values[1],
          inputValueThree: values[2],
          inputValueFour: values[3],
          inputValueFive: values[4],
          inputValueSix: values[5], 
          inputValueSeven: values[6], 
          inputValueEight: values[7], 
          inputValueNine: values[8], 
          inputValueTen: values[9], 
          comment:message?.comments
        })
    }
  },[certificateData, form])

  const onFinish = (data) => {
    // return
    
    const {report_number, report_date, inputKeyOne, inputKeyTwo, inputKeyThree, inputKeyFour, inputKeyFive, inputKeySix, inputKeySeven, inputKeyEight, inputKeyNine, inputKeyTen, inputValueOne, inputValueTwo, inputValueThree, inputValueFour, inputValueFive, inputValueSix, inputValueSeven, inputValueEight, inputValueNine, inputValueTen, comment} = data;

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
        Dec: "12"
      },
      date = str.split(" ");

    return [date[3], mnths[date[1]], date[2]].join("/");
  }

  const report_dates = convertDate(String(report_date._d))

  const addData = {
      reportNumber:report_number,
      reportDate:report_dates,
      other: [{
          [inputKeyOne]:inputValueOne,
          [inputKeyTwo]:inputValueTwo,
          [inputKeyThree]:inputValueThree,
          [inputKeyFour]:inputValueFour,
          [inputKeyFive]:inputValueFive,
          [inputKeySix]:inputValueSix,
          [inputKeySeven]:inputValueSeven,
          [inputKeyEight]:inputValueEight,
          [inputKeyNine]:inputValueNine,
          [inputKeyTen]:inputValueTen,
        }],
        comments:comment,
        image: filename
    }

    console.log("addData", addData)

    dispatch(editCertificateDetails(id, addData)).then((res)=>{
      if (res) {
        SendNotification({type: 's', message: 'Certificate updated successfully'});
        navigate('/dashboard')
      }
    });

  }


  const handleImageChange = ({target: { files }}) => {
      setFile(files[0])
      
      let formData = new FormData()
      formData.append('file', files[0])

      dispatch(FileUpload(formData)).then((res) => {
        if(res?.payload?.data){
          setFileName(res?.payload?.data?.fileName)
        }
      })
  }
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
                layout='vertical'
                >
                  <Row gutter={[16, 4]}>
                <Col span={24} sm={12}>
                    <Form.Item
                        className='form_group'
                        label="Report Number"
                        name="report_number"
                        rules={[
                        {
                            required: true,
                            message: 'Please enter your report number',
                        },
                        ]}
                    >
                        <Input className='form_control' placeholder="NGL2540" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item
                        className='form_group'
                        label="Report Date"
                        name="report_date"
                        rules={[
                        {
                            required: true,
                            message: 'Please enter your report date',
                        },
                        ]}
                    >
                        <DatePicker className='form_control' format='DD-MM-YYYY'  style={{width:"100%"}} />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeyOne">
                        <Input className='form_control' placeholder="1" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueOne">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeyTwo">
                        <Input className='form_control' placeholder="2" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueTwo">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeyThree">
                        <Input className='form_control' placeholder="3" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueThree">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeyFour">
                        <Input className='form_control' placeholder="4" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueFour">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeyFive">
                        <Input className='form_control' placeholder="5" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueFive">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeySix">
                        <Input className='form_control' placeholder="6" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueSix">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeySeven">
                        <Input className='form_control' placeholder="7" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueSeven">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeyEight">
                        <Input className='form_control' placeholder="8" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueEight">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeyNine">
                        <Input className='form_control' placeholder="9" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueNine">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputKeyTen">
                        <Input className='form_control' placeholder="10" />
                    </Form.Item>
                </Col>
                  <Col span={24} sm={12}>
                    <Form.Item className='form_group' name="inputValueTen">
                        <Input className='form_control' placeholder="value" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item className='form_group' name="comment">
                        <TextArea className='form_text_area' rows={4} placeholder="comment" maxLength={180} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item className='form_group' name="imgUpload" label="Upload Image">
                    <div className="upload_wrapper">
                      <label className="upload_box" htmlFor="editImg">Upload File</label>
                      <input onChange={handleImageChange} type="file" id='editImg' />
                    </div>
                    {/* {
                      reportData.attachment !== null ? 
                      <img className="mt_3 br_5" src={`${process.env.REACT_APP_API_BASEURL}/${reportData?.attachment?.dir}/${reportData?.attachment?.fileName}`} key={id} style={{height: "120px"}} alt="product-img" />:<></>
                    } */}
                    {file?<img className='mt_3 br_5' src={file? URL.createObjectURL(file) : null} alt={file? file.name : null} style={{ height: "120px" }}/>:<img className="mt_3 br_5" src={`${process.env.REACT_APP_API_BASEURL}/${reportData?.attachment?.dir}/${reportData?.attachment?.fileName}`} key={id} style={{height: "120px"}} alt="product-img" />}
                    </Form.Item>
                </Col>
            </Row>
            <Row className='text_center mt_4'>
                <Col span={24}>
                    <Button type="primary" htmlType="submit" className="btn-primary btn-login">
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

export default Editcirtificate;
