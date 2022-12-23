import { Helmet } from 'react-helmet';
import packageJson from '../../../package.json';

type PageTitleProps = {
    pageName: string;
};

const PageTitle = ({ pageName }: PageTitleProps): JSX.Element =>
    <>
        <Helmet>
            <title>Recipes v{packageJson.version} | {pageName}</title>
        </Helmet>
    </>;

export default PageTitle;