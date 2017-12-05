import React from 'react';
import {render} from 'react-dom';
import fetch from 'isomorphic-fetch';
import CategoryTree from '../isomorphic/category-tree';
import './less/home.less';

fetch('/rest/category').then(res=>{
    return res.json();
}).then(data=>{
    render(<CategoryTree roots={data}/>, document.getElementById('tree'));
});
// render(<CategoryTree roots={[]}/>, document.getElementById('tree'));