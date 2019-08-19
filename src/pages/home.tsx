import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { TriviaStore } from '../stores/trivia-store';
import { CategoryHero } from '../components/category-hero';

import "../styles/home.scss";
import { PageLayout } from './page';
import { LoadingThrobber } from '../components/loading-throbber';

interface HomePageProps {
    triviaStore?: TriviaStore;
}

@inject('triviaStore')
@observer
export class HomePage extends React.Component<HomePageProps> {
    
    public componentDidMount() {
        const { triviaStore } = this.props;

        if (!triviaStore!.isLoadingCategories) {
            triviaStore!.fetchCategories();
        }
    }
    
    public render() {
        const { categories, isLoadingCategories } = this.props.triviaStore!;
       
        const hasCategories = categories && categories.length > 0;

        return (
            <PageLayout classNames="home">
                <>
                {isLoadingCategories && <LoadingThrobber title="Loading Trivia Categories" />}
                {!isLoadingCategories && hasCategories && <div className="category-list">
                    {categories.map(cat => <CategoryHero {...cat} key={cat.id} />)}
                </div>}
                </>
            </PageLayout>
        );
    }
}