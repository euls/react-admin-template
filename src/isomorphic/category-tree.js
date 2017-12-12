import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Tree } from 'antd';
import image from '../client/images/pic.jpg';
import '../client/less/about.less';


// const TreeNode = Tree.TreeNode;

export default class CategoryTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: []
        };
    }
    onLoadData() {
        console.log('load children1');
        // fetch("/about").then(res => {
        //     return res.json();
        // }).then(categories => {
        //     this.setState({
        //         treeData: categories
        //     });
        // });
    }
    renderTreeNodes(data) {
        return data.map((item) => {
            return (
                <TreeNode title={item.name} key={item.id} dataRef={item}>
                </TreeNode>
            );
        });
    }
    render() {
        return (<div>
            <i className="fa fa-battery-three-quarters" aria-hidden="true"></i>
            <img src={image} style={{ width: '10rem' }} />
            <Tree loadData={this.onLoadData}>
                {this.renderTreeNodes(this.props.roots)}
            </Tree>
        </div>);
    }
}