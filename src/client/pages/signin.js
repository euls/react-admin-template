import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import fetch from 'isomorphic-fetch';
import '../less/signin.less';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        const {username,password} = values;
        fetch('/login', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          body: `username=${username}&password=${password}`
        }).then(res => {
          return res.text();
        }).then(text => {
          console.log(text);
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form  onSubmit={this.handleSubmit} className="login-form" action='/login' method='POST' ref='form'>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入你的用户名！' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" name='username'/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" name='password'/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码？</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);