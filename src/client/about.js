import React from 'react';
import {render, hydrate} from 'react-dom';
import CategoryTree from '../isomorphic/category-tree';
import './less/about.less';

hydrate(<CategoryTree roots={[]}/>, document.getElementById('app'));