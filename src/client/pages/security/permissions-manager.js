import React, { Component } from 'react';
import { Table, Button, Input, Icon } from 'antd';

const dataSource = [{
    id: '1',
    name: '系统安全:权限管理',
    description: '拥有该权限的用户可以进入"权限管理"界面(能够看见"权限管理菜单")'
},
{
    id: '2',
    name: '系统安全:权限管理:查看权限',
    description: '拥有该权限的用户可以查看/查询权限列表'
},
{
    id: '3',
    name: '系统安全:权限管理:创建权限',
    description: '拥有该权限的用户可以创建新的权限'
},
{
    id: '4',
    name: '系统安全:权限管理:修改权限',
    description: '拥有该权限的用户可以修改权限(能够看见"修改权限"按钮)'
},
{
    id: '5',
    name: '系统安全:权限管理:修改权限:修改权限名称',
    description: '拥有该权限的用户可以修改权限的名称(表述)'
},
{
    id: '6',
    name: '系统安全:权限管理:修改权限:修改权限描述',
    description: '拥有该权限的用户可以修改权限的描述'
},
{
    id: '7',
    name: '系统安全:权限管理:删除权限',
    description: '拥有该权限的用户可以删除权限'
}
];

const columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: '4rem'
},
{
    title: '权限',
    dataIndex: 'name',
    key: 'name',
}
];

const rowSelection = {

}

const containerStyle = {
    minWidth: '30rem',
    height: '100%',
    width: '60rem',
    margin: '0 auto',
    padding: '2rem 0rem 1rem 0rem'
}

const titleStyle = {
    textAlign: 'center'
}

const actionStyle = {
    margin: '1rem 0rem 1rem 0rem'
}

const searchStyle = {
    minWidth: '10rem',
    width: '20rem',
    float: 'right'
}

const Separator = (props) => {
    let {size} = props;
    if (!size) {
        size = 1
    }

    return (<span style={{
        display: 'inline-block',
        minWidth: '0.2rem',
        width: size + 'rem'
    }}> </span>);
}

export default class PermissionsManager extends Component {
    render = () => {
        return (
            <div style={containerStyle}>
                <h1 style={titleStyle}>系统权限管理</h1>
                <div style={actionStyle}>
                    <Button type='primary'><Icon type='plus'/>创建权限</Button>
                    <Separator size={0.5}/>
                    <Button type='primary'><Icon type='edit'/>修改权限</Button>
                    <Separator/>
                    <Button type='danger'><Icon type='minus'/>删除权限</Button>
                    <Separator/>
                    <Input.Search enterButton={true} style={searchStyle} placeholder={'使用权限名称进行模糊查询'}></Input.Search>
                </div>
                <Table 
                dataSource={dataSource} 
                columns={columns} 
                rowSelection={rowSelection} 
                expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                bordered/>
            </div>
        );
    }
}