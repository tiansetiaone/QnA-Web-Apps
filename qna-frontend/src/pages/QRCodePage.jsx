import React, { useState, useEffect } from 'react';

const QRCodePage = () => {
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQrCode = async () => {
            try {
                const response = await fetch('/api/qr');
                const data = await response.json();

                if (data.success) {
                    setQrCode(data.qrCode);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Terjadi kesalahan saat mengambil QR code.');
            } finally {
                setLoading(false);
            }
        };

        fetchQrCode();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {qrCode ? (
                <div>
                    <h1>Scan QR Code</h1>
                    <img src={qrCode} alt="QR Code" style={{ width: '300px', height: '300px' }} />
                </div>
            ) : (
                <p>QR code tidak tersedia atau sudah dipindai.</p>
            )}
        </div>
    );
};

export default QRCodePage;
