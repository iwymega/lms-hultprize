// docs/DocsPage.tsx
import { DocsLayout } from "./layouts/DocsLayout";
import { InstallDoc } from "./components/InstallDoc";
import { ButtonDoc } from "./components/ButtonDoc";
import { LayoutDoc } from "./components/LayoutDoc";
import { OverviewDoc } from "./components/OverviewDoc";
import { CheckboxDoc } from "./components/CheckboxDoc";

export default function DocsPage() {
    return (
        <DocsLayout>
            {(activeId) => {
                switch (activeId) {
                    case "overview":
                        return <OverviewDoc />;
                    case "checkbox":
                        return <CheckboxDoc />;
                    case "install":
                        return <InstallDoc />;
                    case "button":
                        return <ButtonDoc />;
                    case "layout":
                        return <LayoutDoc />;
                    default:
                        return <div>Page not found</div>;
                }
            }}
        </DocsLayout>
    );
}
