import React from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { useDispatch } from 'react-redux';
import { FindReport } from '../../redux/action/checkReport/findReport.action';
import { useNavigate } from 'react-router-dom';
import {SendNotification} from '../../utilies/utilies';

const Reportcheck = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { Title } = Typography;

    const findReport = (data) => {
      dispatch(FindReport(data)).then((res) => {
        if(res.payload !== true){
          navigate(`/report/${data}` , { state: res.payload  })
        }else {
          SendNotification({type: 'e', message:"Report not found!!!"})
        }
      })
    }

  return (
    <>
      <div className='report_wrapper'>
        <div className='report_outer_box'>
          <div className='report_inner_box'>
            <h1>REPORT CHECK</h1>
            <div className='report_check_wrap'>
                <Form onFinish={({report_number}) => findReport(report_number)}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col span={24} md={5}>
                            <Title level={5} className="report_check_wrap_title">Look Up A Report</Title>
                        </Col>
                        <Col span={24} md={16}>
                            <Form.Item className='form_group mb_0' name="report_number">
                              <Input type='text' placeholder='Enter Report Number' className='form_control' />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={3}>
                            <Button type='button' htmlType='submit' className='btn_primary btn_look_up'>LOOK UP</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Reportcheck
