import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CardScannerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<{ id: string; name?: string; email?: string; notFound?: boolean } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedId, setScannedId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scannedId) {
      // Mock fetch user data based on ID
      let mockUser;
      if (scannedId === "03252003") {
        mockUser = { id: scannedId, name: "ivan", email: "primaturangga@gmail.com" };
      } else {
        mockUser = { id: scannedId, notFound: true };
      }
      setUserData(mockUser);
      setIsOpen(true);
      setIsScanning(false);
      setScannedId(''); // Clear after processing
    }
  }, [scannedId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      setScannedId(inputValue);
      setInputValue(''); // Clear input
      e.currentTarget.value = ''; // Clear DOM value
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => inputRef.current?.focus(), 100); // Focus input for scanner input
  };

  const stopScan = () => {
    setIsScanning(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    startScan();
  }

  return (
    <div>
      <Card>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Card Scanner</h2>
          <button
            onClick={startScan}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Scan
          </button>
          {isScanning && (
            <button
              onClick={stopScan}
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Stop Scan
            </button>
          )}
        </div>
      </Card>
      <input
        ref={inputRef}
        type="text"
        style={{ position: 'absolute', left: '-9999px' }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus={isScanning}
      />
      {isOpen && userData && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p><strong>ID:</strong> {userData.id}</p>
              {userData.notFound ? (
                <p>User tidak ditemukan</p>
              ) : (
                <>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                </>
              )}
            </div>
            <button
              onClick={handleClose}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}