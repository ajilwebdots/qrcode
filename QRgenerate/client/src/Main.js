import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const ContactForm = () => {
    const [drwonload, setDrwonload] = useState('');

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        organisation: '',
        title: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/vscardgenerate', formData);
            setDrwonload(response.data.filePath)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const downloadQRCodeImage = () => {
        const canvas = document.getElementById('qrCodeCanvas');
        const dataUrl = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr_code.png';
        link.click();
    };

    return (
        <div className="flex justify-center text-center content-center mt-10">
            <div className='w-full'></div>
            
            <div className='w-full ml-10'>
                <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="mb-10">
                        <input type="text" name="fname" value={formData.fname} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='First Name'/>
                    </div>
                    <div className="mb-10">
                        <input type="text" name="lname" value={formData.lname} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Last Name' />
                    </div>
                    <div className="mb-10">
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Contact Number' />
                    </div>
                    <div className="mb-10">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Contact Email' />
                    </div>
                    <div className="mb-10">
                        <input type="text" name="organisation" value={formData.organisation} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full"  placeholder='Organisation'/>
                    </div>
                    <div className="mb-10">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Role'/>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Generate vCard</button>
                </form>

            </div>
            <div className='w-full z-50'>
                {drwonload && (
                    <div className=" items-center">
                        <QRCode id="qrCodeCanvas" value={drwonload} size={300} className="border-2 border-black p-4 m-4" />
                        <button onClick={downloadQRCodeImage} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Download QR Code</button>
                    </div>
                )}
            </div>
            <div className='w-full'></div>
        </div>
    );
};

export default ContactForm;
