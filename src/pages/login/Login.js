import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SendNotification } from '../../utilies/utilies'
import { Button, Col, Form, Input, Row } from 'antd'
import { useDispatch } from 'react-redux'
import {loginDetails} from '../../redux/action/login/login.action'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (data) => {
    dispatch(loginDetails(data)).then((res)=>{
      const { payload } = res;

      localStorage.setItem("token", payload?.token);
      localStorage.setItem("uid", payload?.data?.id);
      SendNotification({type: 's', message: 'Login successful'});
      navigate('/dashboard');
    })
  };

  return (
    <>
      <div className='login_Wrapper'>
        <div className='login_outer_box'>
          <div className='login_inner_box'>
            <h1>Admin Panel</h1>
            <Row>
              <Col span={24}>
                <Form
                  onFinish={onFinish}
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                  layout='vertical'
                >
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email address',
                      },
                    ]}
                  >
                    <Input className='form_input' placeholder="Your email address" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your password',
                      },
                    ]}
                  >
                    <Input type="password" className='form_input' placeholder="Your password" />
                  </Form.Item>

                  <Form.Item className='text_center'>
                    <Button type="primary" htmlType="submit" className="btn-primary btn-login">
                      Login
                    </Button>
                  </Form.Item>
                  </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login
