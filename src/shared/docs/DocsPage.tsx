// docs/DocsPage.tsx
import { DocsLayout } from "./layouts/DocsLayout";
import { OverviewDoc } from "./components/OverviewDoc";
import { CheckboxDoc } from "./components/CheckboxDoc";
import { CurrencyInputDoc } from "./components/CurrencyInputDoc";
import { DigitalSignatureInputDoc } from "./components/DigitalSignatureInputDoc";
import { TextInputDoc } from "./components/TextInputDoc";
import { ImageUploadWithDropzoneDoc } from "./components/ImageUploadWithDropzoneDoc";
import { SearchableSelectDoc } from "./components/SearchableSelectDoc";
import { ImageUploadWithPreviewDoc } from "./components/ImageUploadWithPreviewDoc";
import { RadioItemListDoc } from "./components/RadioItemListDoc";
import { BaseTableDoc } from "./components/BaseTableDoc";
import { PaginationWithShowDoc } from "./components/PaginationWithShowDoc";

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
                        return <ImageUploadWithPreviewDoc />;
                    case "radio-item-list":
                        return <RadioItemListDoc />; // Placeholder for RadioItemListDoc
                    case "searchable-select":
                        return <SearchableSelectDoc />; // Placeholder for SearchableSelectDoc
                    case "digital-signature":
                        return <DigitalSignatureInputDoc />;
                    case "table":
                        return <BaseTableDoc />; // Placeholder for BaseTableDoc
                    case "pagination":
                        return <PaginationWithShowDoc />; // Placeholder for PaginationWithShowDoc
                    default:
                        return <div>Page not found</div>;
                }
            }}
        </DocsLayout>
    );
}
