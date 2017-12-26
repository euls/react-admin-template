import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

function buildBreadcrumbItem(pathname) {
    const items = ['Home'].concat(pathname.split('/').filter(item => '' !== item));
    return items;
}

export default class AppTracer extends Component {
    render() {
        const { location } = this.props;
        const items = buildBreadcrumbItem(location.pathname);
        return (
            <Breadcrumb>
                {
                    items.map(item => {
                        return (<Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
                    })
                }
            </Breadcrumb>
        );
    }
}