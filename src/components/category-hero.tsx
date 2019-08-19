import * as React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';


export class CategoryHero extends React.Component<Category> {
    public render() {
        const { id, name } = this.props;
        
        return (<Link to={`/${id}`} className="category-hero glass">
            <h2>{name}</h2>
            <div className="inner"></div>
        </Link>);
    }
}