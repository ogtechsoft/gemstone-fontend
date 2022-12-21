import { Button, Card, Col, Layout, Row, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindReport } from '../../redux/action/checkReport/findReport.action';
import bigLogo from '../../assets/images/ngl_logo_big.png'
import { Link, useParams } from 'react-router-dom';
import { isValidObject } from '../../utilies/utilies';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import fileDownload from 'js-file-download';

const { Content } = Layout;

const Reportdetail = () => {
  const [certificate, setCertificate] = useState([])
  const [otherData, setOtherData] = useState({})
  const {Title, Text} = Typography;
  const dispatch = useDispatch();
  const { id } = useParams();

  const ref = useRef()

  const certificateData = useSelector((state) => state.FindReportReducer);

  useEffect(() => {
    dispatch(FindReport(id))
  }, [dispatch, id])
  
  useEffect(() => {
    const { data } = certificateData;

    if(isValidObject(data) && Array.isArray(data?.other)){
      setOtherData(data)
      let rows = Object.entries(data?.other[0])
      if(Array.isArray(rows)){
          setCertificate(rows)
      }
    }

    
  },[certificateData])

  const downLoadToPDF = async () => { 
    const element = ref.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');

  }

  const handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }

  const printToPDF = useReactToPrint({
    content: () => ref.current,
  })
  
  return (
    <Layout className="site-layout">
      <Layout className="site-layout-background">
        <Content className="site-layout-background main_layout">
          <div className='container'>
            <div className='view_cirtificate_wrapper'>
              <Row gutter={[16, 16]} className="mb_3">
                <Col span={24}>
                  <div className='view_cirtificate_print'>
                    <div>
                      <Title level={3}>View Certificate</Title>
                    </div>
                    <div>
                      <Button type="primary" onClick={()=>handleDownload(otherData?.pdf,otherData?.reportNumber+".pdf")} className="btn-outline-primary btn-login me_1">Download</Button>
                      <Button  type="primary" onClick={printToPDF} className="btn-primary btn-login">Print</Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <div ref={ref}>
                <Card>
                  <Row gutter={[16, 16]}>
                      <Col span={24}>
                          {/* <Title level={5} className="mb_2">CREATE NEW CERTIFICATE</Title> */}
                          <div className='view_cirtificate_head'>
                            <div className='view_cirtificate_logo'>
                              <img src={bigLogo} alt="logo" />
                            </div>
                            <div className='view_cirtificate_text'>
                              <Title level={5} className='mt_0 mb_0 lh_1 text_primary'><b>NATIONAL GEM LAB GEMOLOGICAL REPORT</b></Title>
                              <Title level={5} className='mt_0 mb_0 lh_1'>An ISO 9001:2005 Certified Organization</Title>
                              <Text>REPORT NUMBER: {otherData?.reportNumber}</Text><br />
                              <Text>REPORT DATE : {otherData?.reportDate}</Text>
                            </div>
                          </div>
                      </Col>
                      <Col span={24}>
                        <h1 className='laboratory_report_title'>LABORATORY REPORT</h1>
                      </Col>
                      <Col span={24} md={14}>
                        <div className='laboratory_report_table'>
                            {/* <div className='laboratory_report_table_item'>
                              <div><Text>Report Number</Text></div>
                              <div className='right_content'><Text>{otherData?.reportNumber}</Text></div>
                          </div> 
                          <div className='laboratory_report_table_item'>
                            <div><Text>Report Date</Text></div>
                            <div className='right_content'><Text>{otherData?.reportDate}</Text></div>
                          </div> */}
                            {
                              certificate && certificate.map((item, i)=>(
                                <div key={i}>
                                  <div className='laboratory_report_table_item'>
                                    <div><Text>{item?.[0]}</Text></div>
                                    <div className='right_content'><Text>{item?.[1]}</Text></div>
                                  </div>
                                </div>
                              ))
                            }   
                            <div className='laboratory_report_table_item'>
                                  <div><Text>Comments</Text></div>
                                  <div className='right_content'><Text>{otherData?.comments}</Text></div>
                                </div>                                                                                                         
                          </div>
                      </Col>
                      <Col span={24} md={10}>
                        <Title level={5} className="text_center">PRODUCT IMAGE</Title>
                        <div className='product_img text_center'>
                          {
                              
                              otherData.attachment !== null ? 
                              <img src={`${process.env.REACT_APP_API_BASEURL}/${otherData?.attachment?.dir}/${otherData?.attachment?.fileName}`} key={id} alt="product-img" />:
                              <Text key={id}>No Image</Text>
                          }
                        </div>
                      </Col>
                      <Col span={24} className="mt_5 text_justify">
                         <Text className='text_justify'><b>NOTE</b> : The result of the Test Report reflects the findings and conclusions is as on the date of issue with common trust and confidence with precision, disclosing the identity and authenticity of the product specimen without legal bindings, as Gemstones of similar appearance can have specific different values which can be modified and enhanced at any time. NGL can re assess whether the product specimen in accordance with the report based on the analysis and interpreting the characters of setting permit with limits. The authenticity of colour and nature of additional precious stones in the setting have NOT been tested, and the specified weight indicated herein is with an approximate measure and may differ once scale is reset. The validation of the Test Report stands good only if appended with an authorized signatory, embossed stamp and Trade Mark label on the surface laminated. The Laboratory Report may also be verified on <Link to="https://nationalgemlab.in/" className='text_primary' target="_blank">nationalgemlab.in</Link>. The PDF coloured scanned and facsimile copies of the Report at any circumstances are NOT valid and legally bind to whom so ever may concern. Further details may be seen in the Terms and Conditions of the Lab enumerated in overleaf. This Test Report is the Copyright of the National Gem Lab Chennai, India.</Text>
                      </Col>
                      <Col span={24} className="mt_3">
                        {/* <Title level={5} className="mb_0 lh_1 text_right">A detailed description of reports : WWW.nationalgemlab.in</Title>
                        <Title level={5} className="mt_0 mb_0 lh_1 text_right">Mandatory report verification : WWW.nationalgemlab.in</Title> */}
                        <Title level={5} className="text_right"><b>Authorized Signatory</b><br /> National Gem Lab</Title>
                      </Col>
                  </Row>
                </Card>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Reportdetail;
