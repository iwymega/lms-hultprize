// docs/DocsPage.tsx
import { DocsLayout } from "./layouts/DocsLayout";
import { InstallDoc } from "./components/InstallDoc";
import { ButtonDoc } from "./components/ButtonDoc";
import { LayoutDoc } from "./components/LayoutDoc";
import { OverviewDoc } from "./components/OverviewDoc";
import { CheckboxDoc } from "./components/CheckboxDoc";
import { CurrencyInputDoc } from "./components/CurrencyInputDoc";
import { DigitalSignatureInputDoc } from "./components/DigitalSignatureInputDoc";
import { TextInputDoc } from "./components/TextInputDoc";
import { ImageUploadWithDropzoneDoc } from "./components/ImageUploadWithDropzoneDoc";
import { SearchableSelectDoc } from "./components/SearchableSelectDoc";

export default function DocsPage() {
    return (
        <DocsLayout>
            {(activeId) => {
                switch (activeId) {
                    case "overview":
                        return <OverviewDoc />;
                    case "text-input":
                        return <TextInputDoc />;
                    case "checkbox":
                        return <CheckboxDoc />;
                    case "currency-input":
                        return <CurrencyInputDoc />;
                    case "image-upload-dropzone":
                        return <ImageUploadWithDropzoneDoc />;
                    case "image-upload-preview":
                        return;
                    case "radio-item-list":
                        return <div>Radio Item List Doc</div>; // Placeholder for RadioItemListDoc
                    case "searchable-select":
                        return <SearchableSelectDoc />; // Placeholder for SearchableSelectDoc
                    case "digital-signature":
                        return <DigitalSignatureInputDoc />;
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
