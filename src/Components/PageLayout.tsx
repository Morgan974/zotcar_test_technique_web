import React, { ReactNode } from 'react';

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps): React.ReactElement => {
    return (
        <div className="flex flex-column" style={{ minHeight: '100vh' }}>
            {children}
        </div>
    );
};

export default PageLayout;
