import React from "react";

const ForbiddenPage: React.FC = () => {
    return (
        <div>
            <h1>403 - Forbidden</h1>
            <p>You do not have permission to access this page.</p>
            <button
                onClick={() => window.location.href = "/"}>
                Go Home
            </button>
        </div>
    );
};

export default ForbiddenPage;