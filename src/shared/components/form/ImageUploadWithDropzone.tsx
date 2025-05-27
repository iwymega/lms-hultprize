import React from "react";
import { useDropzone } from "react-dropzone";
import { ImageUploadWithPreview } from "./ImageUploadWithPreview";

const ImageUploadWithDropzone = () => {
    const [file, setFile] = React.useState<File | null>(null);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={{ border: "2px dashed #aaa", padding: 20, cursor: "pointer" }}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag & drop an image here, or click to select</p>
            )}

            <ImageUploadWithPreview
                value={file}
                onChange={setFile}
                renderPreview={(file, url, onRemove) => (
                    file ? (
                        <div style={{ position: "relative", width: 200, height: 200 }}>
                            <img
                                src={url}
                                alt="preview"
                                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: 8 }}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove();
                                }}
                                style={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    background: "rgba(255,255,255,0.8)",
                                    border: "none",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    padding: 4,
                                }}
                                aria-label="Remove image"
                            >
                                ✕
                            </button>
                        </div>
                    ) : null
                )}
                disableInput={true}   // disable internal input
                showTrigger={false}   // hide trigger button
            />
        </div>
    );
};

export default ImageUploadWithDropzone;
