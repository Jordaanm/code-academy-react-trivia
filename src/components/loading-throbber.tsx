import * as React from 'react';
import ReactLoading, {LoadingType} from 'react-loading';

interface LoadingThrobberProps {
    title: string;
    type?: LoadingType;
}

export const LoadingThrobber:React.FC<LoadingThrobberProps> = ({title, type }) => {
    return (
        <div className="loading">
            <span>{title}</span>
            <ReactLoading type={type||'bars'} color="black" />
        </div>
    );
}