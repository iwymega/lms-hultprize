import { Card } from "@/components/ui/card";
import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ImageMapPage() {
    const [isOpen, setIsOpen] = useState(false);

    const handleAreaClick = () => {
        setIsOpen(true);
    };

    return (
        <AdminLayout>
            <div>
                <Card>
                    <img
                        src="/WhatsApp%20Image%202025-11-24%20at%2016.55.27.jpeg"
                        alt="Image Map"
                        useMap="#WhatsAppImage2025-11-24at14.34.49.jpeg"
                        style={{ width: "100%", height: "auto" }}
                    />
                    <map name="WhatsAppImage2025-11-24at14.34.49.jpeg" id="WhatsAppImage2025-11-24at14.34.49.jpeg">
                        <area
                            shape="poly"
                            coords="360,214,388,321,471,310,404,196,360,214"
                            onClick={handleAreaClick}
                            alt=""
                        />
                    </map>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Area Clicked</DialogTitle>
                            </DialogHeader>
                            <p>Area clicked! This is a dialog.</p>
                        </DialogContent>
                    </Dialog>
                </Card>
            </div>
        </AdminLayout>
    );
}